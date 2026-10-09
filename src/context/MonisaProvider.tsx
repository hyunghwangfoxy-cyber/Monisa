import { useCallback, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { getUser, handleAuthCallback, onAuthChange } from '@netlify/identity'
import type { User } from '@netlify/identity'
import { MonisaContext } from './MonisaContext'
import { api } from '../lib/api'
import { applyPreferences, defaultPreferences } from '../lib/preferences'
import type { Profile } from '../lib/preferences'

let initialization: ReturnType<typeof initialize> | undefined

async function initialize() {
  const callback = await handleAuthCallback()
  return { user: await getUser(), recovery: callback?.type === 'recovery' }
}

export default function MonisaProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [profileLoading, setProfileLoading] = useState(true)
  const [error, setError] = useState('')
  const [recoveryRequired, setRecoveryRequired] = useState(false)

  useEffect(() => {
    let active = true
    initialization ??= initialize()
    initialization.then(result => {
      if (!active) return
      setUser(result.user)
      setRecoveryRequired(result.recovery)
    }).catch(() => {
      if (active) setError('Não foi possível confirmar o acesso. Abra novamente o link recebido por e-mail ou entre na sua conta.')
    }).finally(() => { if (active) setLoading(false) })
    const unsubscribe = onAuthChange((event, nextUser) => {
      if (!active || event === 'token_refresh' || event === 'user_updated') return
      setProfile(null)
      setProfileLoading(true)
      setError('')
      setUser(nextUser)
      if (event === 'recovery') setRecoveryRequired(true)
      if (event === 'logout') {
        setRecoveryRequired(false)
      }
    })
    return () => { active = false; unsubscribe() }
  }, [])

  const refreshProfile = useCallback(async () => {
    setProfileLoading(true)
    setError('')
    try { setProfile(await api<Profile>('/api/profile')) }
    catch (failure) { setError(failure instanceof Error ? failure.message : 'Não foi possível carregar seu perfil.') }
    finally { setProfileLoading(false) }
  }, [])

  useEffect(() => {
    if (!user?.id) return
    const controller = new AbortController()
    api<Profile>('/api/profile', { signal: controller.signal }).then(updated => {
      setProfile(updated)
      setError('')
    }).catch(failure => {
      if (!controller.signal.aborted) setError(failure instanceof Error ? failure.message : 'Não foi possível carregar seu perfil.')
    }).finally(() => { if (!controller.signal.aborted) setProfileLoading(false) })
    return () => controller.abort()
  }, [user?.id])

  useEffect(() => { applyPreferences(profile?.preferences || defaultPreferences) }, [profile])

  return <MonisaContext.Provider value={{ user, loading, profile, profileLoading, error, recoveryRequired, finishRecovery: () => setRecoveryRequired(false), refreshProfile, setProfile }}>{children}</MonisaContext.Provider>
}
