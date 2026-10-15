import type { Endpoint } from 'payload'

const allowedKeys = new Set([
  'type',
  'name',
  'email',
  'phone',
  'organisation',
  'serviceInterest',
  'productInterest',
  'budgetRange',
  'preferredContactMethod',
  'message',
  'marketingConsent',
  'consentNoticeVersion',
  'sourceForm',
  'sourcePath',
  'website',
])

const text = (value: unknown, maxLength: number): string | undefined => {
  if (typeof value !== 'string') return undefined
  const trimmed = value.trim()
  return trimmed.length > 0 && trimmed.length <= maxLength ? trimmed : undefined
}

const submitEnquiry: Endpoint = {
  path: '/enquiries',
  method: 'post',
  handler: async (req) => {
    const contentType = req.headers.get('content-type') ?? ''
    if (!contentType.toLowerCase().includes('application/json')) {
      return Response.json({ error: 'Invalid request.' }, { status: 415 })
    }

    let body: unknown
    try {
      body = await req.json()
    } catch {
      return Response.json({ error: 'Invalid request.' }, { status: 400 })
    }

    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return Response.json({ error: 'Invalid request.' }, { status: 400 })
    }

    const input = body as Record<string, unknown>
    if (Object.keys(input).some((key) => !allowedKeys.has(key))) {
      return Response.json({ error: 'Invalid request fields.' }, { status: 400 })
    }

    // Honeypot: return the same generic confirmation without persisting obvious bot submissions.
    if (typeof input.website === 'string' && input.website.trim()) {
      return Response.json({ message: 'Thank you. Your enquiry has been received.' }, { status: 201 })
    }

    const name = text(input.name, 120)
    const email = text(input.email, 254)?.toLowerCase()
    const phone = text(input.phone, 40)
    const message = text(input.message, 5000)
    const type = input.type === 'Project' || input.type === 'ProductInterest' ? input.type : input.type === 'Contact' || input.type === undefined ? 'Contact' : undefined
    const preferredContactMethod =
      input.preferredContactMethod === 'phone' || input.preferredContactMethod === 'whatsapp'
        ? input.preferredContactMethod
        : input.preferredContactMethod === 'email' || input.preferredContactMethod === undefined
          ? 'email'
          : undefined
    const sourceForm = text(input.sourceForm, 80)
    const sourcePath = text(input.sourcePath, 500)
    const organisation = text(input.organisation, 160)
    const serviceInterest = text(input.serviceInterest, 120)
    const productInterest = text(input.productInterest, 120)
    const budgetRange = text(input.budgetRange, 100)
    const consentNoticeVersion = text(input.consentNoticeVersion, 40)
    const marketingConsent = input.marketingConsent === true

    if (
      !name ||
      !message ||
      !type ||
      !preferredContactMethod ||
      !sourceForm ||
      (!email && !phone) ||
      (email !== undefined && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) ||
      (input.marketingConsent !== undefined && typeof input.marketingConsent !== 'boolean') ||
      (marketingConsent && !consentNoticeVersion)
    ) {
      return Response.json({ error: 'Please check the required fields and try again.' }, { status: 400 })
    }

    const retentionMonths = Number(process.env.ENQUIRY_RETENTION_MONTHS ?? '18')
    if (!Number.isInteger(retentionMonths) || retentionMonths < 1 || retentionMonths > 60) {
      return Response.json({ error: 'Enquiry submission is temporarily unavailable.' }, { status: 503 })
    }
    const retentionReviewAt = new Date()
    retentionReviewAt.setUTCMonth(retentionReviewAt.getUTCMonth() + retentionMonths)

    try {
      const enquiry = await req.payload.create({
        collection: 'enquiries',
        overrideAccess: true,
        req,
        data: {
          type,
          name,
          email,
          phone,
          organisation,
          serviceInterest,
          productInterest,
          budgetRange,
          preferredContactMethod,
          message,
          marketingConsent,
          marketingConsentAt: marketingConsent ? new Date().toISOString() : undefined,
          consentNoticeVersion: marketingConsent ? consentNoticeVersion : undefined,
          sourceForm,
          sourcePath,
          status: 'New',
          retentionReviewAt: retentionReviewAt.toISOString(),
        },
      })

      try {
        await req.payload.create({
          collection: 'notification-attempts',
          overrideAccess: true,
          req,
          data: {
            enquiry: enquiry.id,
            channel: 'email',
            status: 'Pending',
            attemptCount: 0,
            nextAttemptAt: new Date().toISOString(),
          },
        })
      } catch {
        // The enquiry is already durable. Do not turn a notification queue failure into data loss.
        req.payload.logger.error('Enquiry was stored but its notification queue record could not be created.')
      }

      return Response.json(
        { message: 'Thank you. Your enquiry has been received.' },
        { status: 201 },
      )
    } catch {
      req.payload.logger.error('Enquiry persistence failed.')
      return Response.json({ error: 'We could not save your enquiry. Please try again later.' }, { status: 503 })
    }
  },
}

export default submitEnquiry
