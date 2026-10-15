import config from '../payload.config'
import { getPayload } from 'payload'

const email = process.env.INITIAL_ADMIN_EMAIL?.trim().toLowerCase()
const password = process.env.INITIAL_ADMIN_PASSWORD
const name = process.env.INITIAL_ADMIN_NAME?.trim()

if (!email || !password || !name) {
  throw new Error('Set INITIAL_ADMIN_EMAIL, INITIAL_ADMIN_PASSWORD and INITIAL_ADMIN_NAME for this one-time command.')
}
if (password.length < 14) {
  throw new Error('INITIAL_ADMIN_PASSWORD must be at least 14 characters long.')
}

const payload = await getPayload({ config })
const existing = await payload.find({ collection: 'users', limit: 1, overrideAccess: true })

if (existing.totalDocs > 0) {
  throw new Error('Administrator bootstrap refused: a user already exists. Use the authenticated admin invitation workflow.')
}

await payload.create({
  collection: 'users',
  overrideAccess: true,
  data: {
    email,
    password,
    name,
    role: 'administrator',
    active: true,
  },
})

payload.logger.info('Initial administrator created. Remove INITIAL_ADMIN_* values from the shell or deployment environment now.')
