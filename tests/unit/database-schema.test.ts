import assert from 'node:assert/strict'
import test from 'node:test'
import config from '../../payload.config'

const resolvedConfig = await config
const collections = new Map(resolvedConfig.collections.map((collection) => [collection.slug, collection]))
const fieldsFor = (slug: string) => {
  const collection = collections.get(slug)
  assert.ok(collection, `Expected collection "${slug}" to exist`)
  return new Set(collection.fields.map((field) => field.name))
}

test('Payload defines all required persistent collections', () => {
  for (const slug of [
    'users',
    'pages',
    'services',
    'products',
    'faqs',
    'media',
    'portfolio',
    'testimonials',
    'enquiries',
    'enquiry-events',
    'notification-attempts',
    'audit-events',
    'invitations',
    'redirects',
  ]) {
    assert.ok(collections.has(slug), `Missing collection: ${slug}`)
  }
  assert.equal(resolvedConfig.globals.some((global) => global.slug === 'site-settings'), true)
})

test('content collections include lifecycle, slug and SEO fields', () => {
  for (const slug of ['pages', 'services', 'products', 'faqs', 'portfolio', 'testimonials']) {
    const fields = fieldsFor(slug)
    for (const field of ['slug', 'status', 'publishedAt', 'scheduledPublishAt', 'scheduledUnpublishAt', 'seoTitle', 'seoDescription']) {
      assert.ok(fields.has(field), `${slug} is missing ${field}`)
    }
  }
})

test('product availability has a constrained status field', () => {
  const product = collections.get('products')
  assert.ok(product)
  const availability = product.fields.find((field) => field.name === 'availabilityStatus')
  assert.ok(availability)
  assert.equal(availability.type, 'select')
  assert.deepEqual(
    availability.options?.map((option) => option.value),
    ['Planned', 'Pilot', 'Available'],
  )
})

test('enquiry records include contact, consent, workflow and retention fields', () => {
  const fields = fieldsFor('enquiries')
  for (const field of [
    'type', 'name', 'email', 'phone', 'message', 'marketingConsent',
    'marketingConsentAt', 'consentNoticeVersion', 'sourceForm', 'status',
    'assignee', 'internalNotes', 'retentionReviewAt',
  ]) {
    assert.ok(fields.has(field), `enquiries is missing ${field}`)
  }
})

test('audit and enquiry history collections are append-only in normal collection access', () => {
  for (const slug of ['audit-events', 'enquiry-events']) {
    const collection = collections.get(slug)
    assert.ok(collection)
    assert.equal(typeof collection.access?.update, 'function')
    assert.equal(typeof collection.access?.delete, 'function')
  }
})
