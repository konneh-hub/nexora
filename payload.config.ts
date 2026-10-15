import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import type {
  Access,
  CollectionAfterChangeHook,
  CollectionBeforeChangeHook,
  CollectionConfig,
  GlobalConfig,
} from 'payload'
import { buildConfig } from 'payload'
import submitEnquiry from './src/cms/endpoints/submit-enquiry'

const databaseURL = process.env.DATABASE_URL
const payloadSecret = process.env.PAYLOAD_SECRET

if (process.env.NODE_ENV === 'production' && (!databaseURL || !payloadSecret)) {
  throw new Error('DATABASE_URL and PAYLOAD_SECRET must be configured in production.')
}

type Role = 'administrator' | 'editor' | 'enquiry-handler'

const hasRole = (...roles: Role[]): Access => ({ req }) =>
  Boolean(req.user && roles.includes((req.user as { role?: Role }).role ?? 'enquiry-handler'))

const isAdministrator = hasRole('administrator')
const canEditContent = hasRole('administrator', 'editor')
const canHandleEnquiries = hasRole('administrator', 'enquiry-handler')
const publicMediaAccess: Access = ({ req }) => {
  const role = (req.user as { role?: Role } | null)?.role
  if (role === 'administrator' || role === 'editor') return true
  return { visibility: { equals: 'public' } }
}
const publicPublished = ({ req }: Parameters<Access>[0]) => {
  const role = (req.user as { role?: Role } | null)?.role
  if (role === 'administrator' || role === 'editor') return true
  return { status: { equals: 'Published' } }
}

const requireSeoBeforePublish: CollectionBeforeChangeHook = async ({ data }) => {
  if (data.status === 'Published' && (!data.seoTitle || !data.seoDescription)) {
    throw new Error('Published content requires an SEO title and description.')
  }
  if (data.status === 'Published') data.publishedAt = new Date().toISOString()
  return data
}

const requirePermissionBeforePublish: CollectionBeforeChangeHook = async ({ data, originalDoc }) => {
  const merged = { ...originalDoc, ...data }
  if (merged.status === 'Published') {
    if (
      merged.permissionConfirmed !== true ||
      !merged.permissionApprover ||
      !merged.permissionApprovedAt ||
      !merged.permissionEvidenceReference
    ) {
      throw new Error('Publishing this record requires confirmed permission, approver, approval date and evidence reference.')
    }
    if (merged.permissionReviewAt && new Date(String(merged.permissionReviewAt)).getTime() < Date.now()) {
      throw new Error('Publication permission review has expired.')
    }
  }
  return data
}

const requirePublicMediaMetadata: CollectionBeforeChangeHook = async ({ data }) => {
  if (data.visibility === 'public' && data.decorative !== true && !data.altText) {
    throw new Error('Public informative media requires alternative text.')
  }
  if (data.visibility === 'public' && !data.licence) {
    throw new Error('Public media requires a recorded licence or ownership basis.')
  }
  return data
}

const auditAfterChange: CollectionAfterChangeHook = async ({ doc, operation, req, collection }) => {
  if (collection.slug === 'audit-events') return doc
  const actor = req.user?.id
  await req.payload.create({
    collection: 'audit-events',
    overrideAccess: true,
    req,
    data: {
      action: operation === 'create' ? 'record.created' : 'record.updated',
      targetType: collection.slug,
      targetId: String(doc.id),
      outcome: 'success',
      actor: actor ? String(actor) : undefined,
      metadata: { operation },
    },
  })
  return doc
}

const lifecycleFields = [
  {
    name: 'status',
    type: 'select',
    required: true,
    defaultValue: 'Draft',
    index: true,
    options: [
      { label: 'Draft', value: 'Draft' },
      { label: 'In review', value: 'In review' },
      { label: 'Published', value: 'Published' },
      { label: 'Archived', value: 'Archived' },
    ],
    access: { create: isAdministrator, update: isAdministrator },
  },
  { name: 'publishedAt', type: 'date', admin: { readOnly: true }, index: true },
  { name: 'scheduledPublishAt', type: 'date', index: true },
  { name: 'scheduledUnpublishAt', type: 'date', index: true },
  { name: 'seoTitle', type: 'text', maxLength: 70 },
  { name: 'seoDescription', type: 'textarea', maxLength: 180 },
  { name: 'canonicalUrl', type: 'text' },
  { name: 'noIndex', type: 'checkbox', defaultValue: false },
] as const

const contentAccess = {
  create: canEditContent,
  read: publicPublished,
  update: canEditContent,
  delete: isAdministrator,
}

const Pages: CollectionConfig = {
  slug: 'pages',
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'slug', 'status', 'updatedAt'] },
  access: contentAccess,
  hooks: { beforeChange: [requireSeoBeforePublish], afterChange: [auditAfterChange] },
  versions: { drafts: { autosave: true }, maxPerDoc: 50 },
  fields: [
    { name: 'title', type: 'text', required: true, maxLength: 120 },
    { name: 'slug', type: 'text', required: true, unique: true, index: true, maxLength: 160 },
    { name: 'summary', type: 'textarea', maxLength: 320 },
    {
      name: 'sections',
      type: 'blocks',
      blocks: [
        { slug: 'richText', fields: [{ name: 'content', type: 'richText', required: true }] },
        { slug: 'featureList', fields: [{ name: 'heading', type: 'text' }, { name: 'items', type: 'array', fields: [{ name: 'text', type: 'text', required: true }] }] },
        { slug: 'callToAction', fields: [{ name: 'label', type: 'text', required: true }, { name: 'href', type: 'text', required: true }] },
      ],
    },
    { name: 'socialImage', type: 'upload', relationTo: 'media' },
    ...lifecycleFields,
  ],
}

const Services: CollectionConfig = {
  slug: 'services',
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'slug', 'status', 'sortOrder'] },
  access: contentAccess,
  hooks: { afterChange: [auditAfterChange] },
  versions: { drafts: { autosave: true }, maxPerDoc: 50 },
  fields: [
    { name: 'title', type: 'text', required: true, maxLength: 120 },
    { name: 'slug', type: 'text', required: true, unique: true, index: true, maxLength: 160 },
    { name: 'summary', type: 'textarea', required: true, maxLength: 320 },
    { name: 'intendedCustomers', type: 'textarea', required: true },
    { name: 'outcomes', type: 'array', fields: [{ name: 'text', type: 'text', required: true }] },
    { name: 'scope', type: 'richText' },
    { name: 'limitations', type: 'textarea' },
    { name: 'enquiryCallToAction', type: 'text', required: true },
    { name: 'sortOrder', type: 'number', required: true, defaultValue: 0, index: true },
    { name: 'socialImage', type: 'upload', relationTo: 'media' },
    ...lifecycleFields,
  ],
}

const Products: CollectionConfig = {
  slug: 'products',
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'availabilityStatus', 'status'] },
  access: contentAccess,
  hooks: { afterChange: [auditAfterChange] },
  versions: { drafts: { autosave: true }, maxPerDoc: 50 },
  fields: [
    { name: 'title', type: 'text', required: true, maxLength: 120 },
    { name: 'slug', type: 'text', required: true, unique: true, index: true, maxLength: 160 },
    { name: 'summary', type: 'textarea', required: true, maxLength: 320 },
    { name: 'intendedUsers', type: 'textarea', required: true },
    { name: 'plannedFeatures', type: 'array', fields: [{ name: 'text', type: 'text', required: true }] },
    {
      name: 'availabilityStatus',
      type: 'select',
      required: true,
      defaultValue: 'Planned',
      options: [
        { label: 'Planned', value: 'Planned' },
        { label: 'Pilot', value: 'Pilot' },
        { label: 'Available', value: 'Available' },
      ],
      access: { create: isAdministrator, update: isAdministrator },
    },
    { name: 'socialImage', type: 'upload', relationTo: 'media' },
    ...lifecycleFields,
  ],
}

const FAQs: CollectionConfig = {
  slug: 'faqs',
  admin: { useAsTitle: 'question', defaultColumns: ['question', 'category', 'status', 'sortOrder'] },
  access: contentAccess,
  hooks: { beforeChange: [requireSeoBeforePublish], afterChange: [auditAfterChange] },
  versions: { drafts: { autosave: true }, maxPerDoc: 30 },
  fields: [
    { name: 'question', type: 'text', required: true, maxLength: 240 },
    { name: 'answer', type: 'richText', required: true },
    { name: 'category', type: 'text', index: true },
    { name: 'sortOrder', type: 'number', defaultValue: 0, index: true },
    ...lifecycleFields,
  ],
}

const Media: CollectionConfig = {
  slug: 'media',
  upload: { mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'], limits: { fileSize: 5_000_000 } },
  access: {
    create: canEditContent,
    read: publicMediaAccess,
    update: canEditContent,
    delete: isAdministrator,
  },
  hooks: { beforeChange: [requirePublicMediaMetadata], afterChange: [auditAfterChange] },
  fields: [
    { name: 'visibility', type: 'select', required: true, defaultValue: 'private', options: [{ label: 'Private', value: 'private' }, { label: 'Public', value: 'public' }], access: { update: isAdministrator } },
    { name: 'altText', type: 'text', maxLength: 250 },
    { name: 'decorative', type: 'checkbox', defaultValue: false },
    { name: 'caption', type: 'text', maxLength: 300 },
    { name: 'credit', type: 'text', maxLength: 200 },
    { name: 'licence', type: 'text', maxLength: 300, required: true },
    { name: 'usageNotes', type: 'textarea' },
  ],
}

const Portfolio: CollectionConfig = {
  slug: 'portfolio',
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'permissionConfirmed', 'status'] },
  access: contentAccess,
  hooks: { beforeChange: [requirePermissionBeforePublish, requireSeoBeforePublish], afterChange: [auditAfterChange] },
  versions: { drafts: { autosave: true }, maxPerDoc: 30 },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'summary', type: 'textarea', required: true },
    { name: 'clientDisplayName', type: 'text' },
    { name: 'media', type: 'upload', relationTo: 'media', hasMany: true },
    { name: 'outcomes', type: 'array', fields: [{ name: 'text', type: 'text', required: true }] },
    { name: 'permissionConfirmed', type: 'checkbox', defaultValue: false, required: true, access: { update: isAdministrator } },
    { name: 'permissionApprover', type: 'relationship', relationTo: 'users', access: { update: isAdministrator } },
    { name: 'permissionApprovedAt', type: 'date', access: { update: isAdministrator } },
    { name: 'permissionEvidenceReference', type: 'text', access: { update: isAdministrator } },
    { name: 'permissionReviewAt', type: 'date', access: { update: isAdministrator } },
    ...lifecycleFields,
  ],
}

const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: { useAsTitle: 'attribution', defaultColumns: ['attribution', 'permissionConfirmed', 'status'] },
  access: contentAccess,
  hooks: { beforeChange: [requirePermissionBeforePublish, requireSeoBeforePublish], afterChange: [auditAfterChange] },
  versions: { drafts: { autosave: true }, maxPerDoc: 30 },
  fields: [
    { name: 'kind', type: 'select', required: true, options: [{ label: 'Testimonial', value: 'testimonial' }, { label: 'Client logo', value: 'logo' }, { label: 'Partner logo', value: 'partner' }] },
    { name: 'quote', type: 'textarea', maxLength: 2000 },
    { name: 'attribution', type: 'text', required: true, maxLength: 160 },
    { name: 'logo', type: 'upload', relationTo: 'media' },
    { name: 'permissionConfirmed', type: 'checkbox', defaultValue: false, required: true, access: { update: isAdministrator } },
    { name: 'permissionApprover', type: 'relationship', relationTo: 'users', access: { update: isAdministrator } },
    { name: 'permissionApprovedAt', type: 'date', access: { update: isAdministrator } },
    { name: 'permissionEvidenceReference', type: 'text', access: { update: isAdministrator } },
    { name: 'permissionReviewAt', type: 'date', access: { update: isAdministrator } },
    ...lifecycleFields,
  ],
}

const Enquiries: CollectionConfig = {
  slug: 'enquiries',
  admin: { useAsTitle: 'name', defaultColumns: ['name', 'type', 'status', 'createdAt', 'assignee'] },
  access: {
    create: () => false,
    read: canHandleEnquiries,
    update: canHandleEnquiries,
    delete: isAdministrator,
  },
  hooks: { afterChange: [auditAfterChange] },
  fields: [
    { name: 'type', type: 'select', required: true, options: [{ label: 'Project', value: 'Project' }, { label: 'Contact', value: 'Contact' }, { label: 'Product Interest', value: 'ProductInterest' }] },
    { name: 'name', type: 'text', required: true, maxLength: 120, access: { update: () => false } },
    { name: 'email', type: 'email', access: { update: () => false } },
    { name: 'phone', type: 'text', maxLength: 40, access: { update: () => false } },
    { name: 'organisation', type: 'text', maxLength: 160, access: { update: () => false } },
    { name: 'serviceInterest', type: 'text', maxLength: 120, access: { update: () => false } },
    { name: 'productInterest', type: 'text', maxLength: 120, access: { update: () => false } },
    { name: 'budgetRange', type: 'text', maxLength: 100, access: { update: () => false } },
    { name: 'preferredContactMethod', type: 'select', options: [{ label: 'Email', value: 'email' }, { label: 'Phone', value: 'phone' }, { label: 'WhatsApp', value: 'whatsapp' }], access: { update: () => false } },
    { name: 'message', type: 'textarea', required: true, maxLength: 5000, access: { update: () => false } },
    { name: 'marketingConsent', type: 'checkbox', defaultValue: false, access: { update: () => false } },
    { name: 'marketingConsentAt', type: 'date', access: { update: () => false } },
    { name: 'consentNoticeVersion', type: 'text', access: { update: () => false } },
    { name: 'sourceForm', type: 'text', required: true, index: true, access: { update: () => false } },
    { name: 'sourcePath', type: 'text', access: { update: () => false } },
    { name: 'status', type: 'select', required: true, defaultValue: 'New', index: true, options: [{ label: 'New', value: 'New' }, { label: 'In progress', value: 'In progress' }, { label: 'Responded', value: 'Responded' }, { label: 'Closed', value: 'Closed' }, { label: 'Spam', value: 'Spam' }] },
    { name: 'assignee', type: 'relationship', relationTo: 'users' },
    { name: 'internalNotes', type: 'textarea', access: { read: canHandleEnquiries, update: canHandleEnquiries } },
    { name: 'retentionReviewAt', type: 'date', required: true, index: true, access: { update: isAdministrator } },
    { name: 'idempotencyKeyHash', type: 'text', unique: true, access: { read: isAdministrator, update: isAdministrator } },
  ],
}

const NotificationAttempts: CollectionConfig = {
  slug: 'notification-attempts',
  admin: { useAsTitle: 'channel', defaultColumns: ['channel', 'status', 'attemptCount', 'updatedAt'] },
  access: { create: isAdministrator, read: canHandleEnquiries, update: isAdministrator, delete: isAdministrator },
  hooks: { afterChange: [auditAfterChange] },
  fields: [
    { name: 'enquiry', type: 'relationship', relationTo: 'enquiries', required: true, index: true },
    { name: 'channel', type: 'select', required: true, options: [{ label: 'Email', value: 'email' }] },
    { name: 'status', type: 'select', required: true, defaultValue: 'Pending', index: true, options: [{ label: 'Pending', value: 'Pending' }, { label: 'Sent', value: 'Sent' }, { label: 'Failed', value: 'Failed' }, { label: 'Retry scheduled', value: 'RetryScheduled' }] },
    { name: 'attemptCount', type: 'number', required: true, defaultValue: 0 },
    { name: 'providerMessageId', type: 'text' },
    { name: 'lastAttemptAt', type: 'date' },
    { name: 'nextAttemptAt', type: 'date', index: true },
    { name: 'failureCode', type: 'text', maxLength: 100 },
    { name: 'sentAt', type: 'date' },
  ],
}

const AuditEvents: CollectionConfig = {
  slug: 'audit-events',
  admin: { useAsTitle: 'action', defaultColumns: ['occurredAt', 'actor', 'action', 'targetType', 'outcome'] },
  access: { create: () => false, read: isAdministrator, update: () => false, delete: () => false },
  fields: [
    { name: 'occurredAt', type: 'date', required: true, defaultValue: () => new Date().toISOString(), index: true },
    { name: 'actor', type: 'relationship', relationTo: 'users' },
    { name: 'action', type: 'text', required: true, index: true },
    { name: 'targetType', type: 'text', required: true, index: true },
    { name: 'targetId', type: 'text', index: true },
    { name: 'outcome', type: 'select', required: true, options: [{ label: 'Success', value: 'success' }, { label: 'Denied', value: 'denied' }, { label: 'Failure', value: 'failure' }] },
    { name: 'requestCorrelationId', type: 'text' },
    { name: 'metadata', type: 'json' },
  ],
}

const Invitations: CollectionConfig = {
  slug: 'invitations',
  admin: { useAsTitle: 'email', defaultColumns: ['email', 'role', 'expiresAt', 'acceptedAt', 'revokedAt'] },
  access: { create: isAdministrator, read: isAdministrator, update: isAdministrator, delete: isAdministrator },
  hooks: { afterChange: [auditAfterChange] },
  fields: [
    { name: 'email', type: 'email', required: true, index: true },
    { name: 'role', type: 'select', required: true, options: [{ label: 'Administrator', value: 'administrator' }, { label: 'Content Editor', value: 'editor' }, { label: 'Enquiry Handler', value: 'enquiry-handler' }] },
    { name: 'invitedBy', type: 'relationship', relationTo: 'users', required: true },
    { name: 'tokenHash', type: 'text', required: true, unique: true, access: { read: () => false } },
    { name: 'expiresAt', type: 'date', required: true, index: true },
    { name: 'acceptedAt', type: 'date' },
    { name: 'revokedAt', type: 'date' },
  ],
}

const Redirects: CollectionConfig = {
  slug: 'redirects',
  admin: { useAsTitle: 'fromPath', defaultColumns: ['fromPath', 'toPath', 'httpStatus'] },
  access: { create: isAdministrator, read: isAdministrator, update: isAdministrator, delete: isAdministrator },
  hooks: { afterChange: [auditAfterChange] },
  fields: [
    { name: 'fromPath', type: 'text', required: true, unique: true, index: true },
    { name: 'toPath', type: 'text', required: true },
    { name: 'httpStatus', type: 'select', required: true, defaultValue: '301', options: [{ label: '301 Permanent', value: '301' }, { label: '302 Temporary', value: '302' }] },
  ],
}

const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    maxLoginAttempts: 5,
    lockTime: 600_000,
    tokenExpiration: 7_200,
    verify: false,
  },
  admin: { useAsTitle: 'email', defaultColumns: ['email', 'name', 'role', 'updatedAt'] },
  access: {
    create: isAdministrator,
    read: isAdministrator,
    update: isAdministrator,
    delete: isAdministrator,
  },
  fields: [
    { name: 'name', type: 'text', required: true, maxLength: 120 },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      options: [
        { label: 'Administrator', value: 'administrator' },
        { label: 'Content Editor', value: 'editor' },
        { label: 'Enquiry Handler', value: 'enquiry-handler' },
      ],
      access: { update: isAdministrator },
    },
    { name: 'active', type: 'checkbox', defaultValue: true, access: { update: isAdministrator } },
    { name: 'lastSignInAt', type: 'date', admin: { readOnly: true } },
  ],
}

const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: { read: () => true, update: isAdministrator },
  fields: [
    { name: 'businessName', type: 'text', required: true, defaultValue: 'Nexora Technologies' },
    { name: 'tagline', type: 'text', required: true, defaultValue: 'Building What Comes Next.' },
    { name: 'publicEmail', type: 'email' },
    { name: 'publicPhone', type: 'text' },
    { name: 'whatsappNumber', type: 'text' },
    { name: 'address', type: 'textarea' },
    { name: 'showAddress', type: 'checkbox', defaultValue: false },
    { name: 'socialLinks', type: 'array', fields: [{ name: 'label', type: 'text', required: true }, { name: 'url', type: 'text', required: true }, { name: 'enabled', type: 'checkbox', defaultValue: false }] },
    { name: 'bannerText', type: 'text' },
    { name: 'bannerEnabled', type: 'checkbox', defaultValue: false },
    { name: 'defaultSeoTitle', type: 'text', maxLength: 70 },
    { name: 'defaultSeoDescription', type: 'textarea', maxLength: 180 },
    { name: 'defaultSocialImage', type: 'upload', relationTo: 'media' },
    { name: 'analyticsEnabled', type: 'checkbox', defaultValue: false },
  ],
}

export default buildConfig({
  admin: {
    user: 'users',
    importMap: { baseDir: process.cwd() },
  },
  endpoints: [submitEnquiry],
  collections: [
    Users,
    Pages,
    Services,
    Products,
    FAQs,
    Media,
    Portfolio,
    Testimonials,
    Enquiries,
    NotificationAttempts,
    AuditEvents,
    Invitations,
    Redirects,
  ],
  globals: [SiteSettings],
  editor: lexicalEditor(),
  secret: payloadSecret ?? 'development-only-change-this-secret-before-deploying',
  db: postgresAdapter({
    pool: {
      connectionString: databaseURL ?? 'postgres://postgres:postgres@127.0.0.1:5432/nexora',
    },
    migrationDir: './migrations',
  }),
  typescript: { outputFile: './src/types/payload-generated.ts' },
})
