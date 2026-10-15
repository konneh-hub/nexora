import assert from 'node:assert/strict'
import test from 'node:test'
import config from '../../payload.config'

test('Payload defines the database collections and required field baseline', async () => {
  const resolvedConfig = await config
  const collections = new Map(resolvedConfig.collections.map((collection) => [collection.slug, collection]))
  const fieldsFor = (slug: string) => {
    const collection = collections.get(slug)
    assert.ok(collection, `Expected collection "${slug}" to exist`)
    return new Set(collection.fields.map((field) => field.name))
  }

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

  for (const slug of ['pages', 'services', 'products', 'faqs', 'portfolio', 'testimonials']) {
    const fields = fieldsFor(slug)
    for (const field of ['slug', 'status', 'publishedAt', 'scheduledPublishAt', 'scheduledUnpublishAt', 'seoTitle', 'seoDescription']) {
      assert.ok(fields.has(field), `${slug} is missing ${field}`)
    }
  }

  const product = collections.get('products')
  assert.ok(product)
  const availability = product.fields.find((field) => field.name === 'availabilityStatus')
  assert.ok(availability)
  assert.equal(availability.type, 'select')
  assert.deepEqual(availability.options?.map((option) => typeof option === 'string' ? option : option.value), ['Planned', 'Pilot', 'Available'])

  const enquiryFields = fieldsFor('enquiries')
  for (const field of [
    'type', 'name', 'email', 'phone', 'message', 'marketingConsent',
    'marketingConsentAt', 'consentNoticeVersion', 'sourceForm', 'status',
    'assignee', 'internalNotes', 'retentionReviewAt',
  ]) {
    assert.ok(enquiryFields.has(field), `enquiries is missing ${field}`)
  }

  for (const slug of ['audit-events', 'enquiry-events']) {
    const collection = collections.get(slug)
    assert.ok(collection)
    assert.equal(typeof collection.access?.update, 'function')
    assert.equal(typeof collection.access?.delete, 'function')
  }
})
