import { getUser, refreshSession } from '@netlify/identity'

export async function api<T>(path: string, options: RequestInit = {}): Promise<T> {
  await refreshSession()
  if (!await getUser()) throw new Error('Sua sessão terminou. Entre novamente na sua conta.')
  const response = await fetch(path, { ...options, credentials: 'same-origin' })
  const data = await response.json().catch(() => null)
  if (!response.ok) throw new Error(data?.error || 'Não foi possível concluir. Tente novamente.')
  return data as T
}

export function jsonRequest(method: string, data: unknown): RequestInit {
  return { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }
}
