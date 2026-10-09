import { eq } from 'drizzle-orm'
import { getDatabase } from '../../db/index.js'
import { profiles } from '../../db/schema.js'
import { authenticated, ensureProfile, HttpError, json, publicProfile, readJson, validatePreferences } from '../lib/http.js'

export default async (request: Request) => authenticated(request, async user => {
  if (!['GET', 'PUT'].includes(request.method)) throw new HttpError(405, 'Método não permitido.')
  const profile = await ensureProfile(user)
  if (request.method === 'GET') return json(publicProfile(profile))
  const body = await readJson(request)
  if (typeof body.name !== 'string' || !body.name.trim() || body.name.length > 80 ||
      typeof body.bio !== 'string' || body.bio.length > 300 ||
      typeof body.subject !== 'string' || body.subject.length > 80) throw new HttpError(400, 'Revise o nome, a apresentação e a matéria de interesse.')
  const preferences = validatePreferences(body.preferences)
  const [updated] = await getDatabase().update(profiles).set({
    name: body.name.trim(), bio: body.bio.trim(), subject: body.subject.trim(), preferences, updatedAt: new Date(),
  }).where(eq(profiles.userId, user.id)).returning()
  return json(publicProfile(updated))
})

export const config = { path: '/api/profile' }
