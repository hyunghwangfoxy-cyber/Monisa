import { getStore } from '@netlify/blobs'
import { eq } from 'drizzle-orm'
import { getDatabase } from '../../db/index.js'
import { profiles } from '../../db/schema.js'
import { authenticated, ensureProfile, HttpError, json, publicProfile } from '../lib/http.js'

export default async (request: Request) => authenticated(request, async user => {
  if (!['GET', 'POST', 'DELETE'].includes(request.method)) throw new HttpError(405, 'Método não permitido.')
  const profile = await ensureProfile(user)
  const store = getStore({ name: 'profile-photos', consistency: 'strong' })
  if (request.method === 'GET') {
    if (!profile.avatarKey) throw new HttpError(404, 'Foto não encontrada.')
    const photo = await store.get(profile.avatarKey, { type: 'arrayBuffer' })
    if (!photo) throw new HttpError(404, 'Foto não encontrada.')
    const contentType = profile.avatarKey.endsWith('.png') ? 'image/png' : profile.avatarKey.endsWith('.webp') ? 'image/webp' : 'image/jpeg'
    return new Response(photo, { headers: {
      'Content-Type': contentType, 'Cache-Control': 'private, no-store', 'X-Content-Type-Options': 'nosniff',
    } })
  }
  let key: string | null = null
  if (request.method === 'POST') {
    const contentType = request.headers.get('content-type') || ''
    if (!['image/png', 'image/jpeg', 'image/webp'].includes(contentType)) throw new HttpError(415, 'Escolha uma foto PNG, JPG ou WebP.')
    if (Number(request.headers.get('content-length')) > 2 * 1024 * 1024) throw new HttpError(413, 'A foto deve ter no máximo 2 MB.')
    const image = await request.arrayBuffer()
    if (!image.byteLength || image.byteLength > 2 * 1024 * 1024) throw new HttpError(413, 'A foto deve ter no máximo 2 MB.')
    const bytes = new Uint8Array(image)
    const valid = contentType === 'image/png'
      ? bytes.slice(0, 8).join(',') === '137,80,78,71,13,10,26,10'
      : contentType === 'image/jpeg'
        ? bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255
        : new TextDecoder().decode(bytes.slice(0, 4)) === 'RIFF' && new TextDecoder().decode(bytes.slice(8, 12)) === 'WEBP'
    if (!valid) throw new HttpError(400, 'O arquivo não corresponde ao formato de imagem escolhido.')
    const extension = contentType === 'image/png' ? 'png' : contentType === 'image/webp' ? 'webp' : 'jpg'
    key = `${user.id}/${crypto.randomUUID()}.${extension}`
    await store.set(key, image)
  }
  let updated
  try {
    ;[updated] = await getDatabase().update(profiles).set({ avatarKey: key, updatedAt: new Date() }).where(eq(profiles.userId, user.id)).returning()
  } catch (error) {
    if (key) await store.delete(key).catch(() => undefined)
    throw error
  }
  if (profile.avatarKey) await store.delete(profile.avatarKey).catch(() => undefined)
  return json(publicProfile(updated))
})

export const config = { path: '/api/avatar' }
