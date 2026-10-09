import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { BookOpen, Send, Sparkles, RotateCcw, MessageCircle, FileText } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useMonisa } from '../../context/MonisaContext'
import { api, jsonRequest } from '../../lib/api'
import type { ChatMessage } from '../../lib/preferences'
import BreakTimer from '../BreakTimer'

export default function AIChat() {
  const { profile } = useMonisa()
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [draft, setDraft] = useState('')
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [confirmClear, setConfirmClear] = useState(false)
  const [retry, setRetry] = useState(0)
  const end = useRef<HTMLDivElement>(null)
  const input = useRef<HTMLTextAreaElement>(null)
  const pending = useRef(false)

  useEffect(() => {
    const controller = new AbortController()
    api<{ messages: ChatMessage[] }>('/api/chat', { signal: controller.signal }).then(data => { setMessages(data.messages); setError('') }).catch(failure => {
      if (!controller.signal.aborted) setError(failure instanceof Error ? failure.message : 'Não foi possível carregar a conversa.')
    }).finally(() => { if (!controller.signal.aborted) setLoading(false) })
    return () => controller.abort()
  }, [retry])

  useEffect(() => {
    if (messages.length) end.current?.scrollIntoView({ behavior: profile?.preferences.reducedMotion ? 'instant' : 'smooth', block: 'nearest' })
  }, [messages, profile?.preferences.reducedMotion])

  async function send(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!draft.trim() || pending.current || loading) return
    pending.current = true
    setBusy(true)
    setError('')
    try {
      const result = await api<{ messages: ChatMessage[] }>('/api/chat', jsonRequest('POST', { message: draft.trim() }))
      setMessages(previous => [...previous, ...result.messages])
      setDraft('')
    } catch (failure) { setError(failure instanceof Error ? failure.message : 'Não foi possível enviar sua pergunta.') }
    finally { pending.current = false; setBusy(false); input.current?.focus() }
  }

  async function clear() {
    if (pending.current) return
    pending.current = true
    setBusy(true)
    setError('')
    try {
      await api('/api/chat', { method: 'DELETE' })
      setMessages([])
      setConfirmClear(false)
    } catch (failure) { setError(failure instanceof Error ? failure.message : 'Não foi possível apagar a conversa.') }
    finally { pending.current = false; setBusy(false) }
  }

  function suggest(text: string) { setDraft(text); input.current?.focus() }
  if (!profile) return null

  return <section className="chat-page" aria-labelledby="chat-title">
    <div className="chat-heading"><div><span className="eyebrow">UM ESPAÇO PARA DESCOBRIR</span><h1 id="chat-title">Olá, {profile.name.split(' ')[0]}.<br /><span>O que vamos aprender hoje?</span></h1><p className="optional-detail">Eu sou a Monisa. A gente pode ir devagar, repetir e encontrar outro jeito de explicar.</p></div><span className="tutor-symbol optional-detail" aria-hidden="true"><Sparkles size={34} /></span></div>
    <div className="chat-tools"><Link className="preference-chip" to="/settings"><span className="status-dot" />Explicações {profile.preferences.responseStyle === 'steps' ? 'passo a passo' : profile.preferences.responseStyle === 'short' ? 'curtas' : 'detalhadas'}</Link><BreakTimer key={profile.preferences.breakMinutes} minutes={profile.preferences.breakMinutes} /></div>
    {messages.length === 0 && !loading && <div className="chat-suggestions optional-detail">
      <button onClick={() => suggest(`Quero estudar ${profile.subject || 'um novo assunto'}. Você pode me ajudar a começar com uma explicação simples?`)}><BookOpen size={22} /><strong>Começar um estudo</strong><span>Um assunto, pequenos passos.</span></button>
      <button onClick={() => suggest('Quero criar um resumo para estudar. Pergunte qual assunto ou texto eu quero resumir.')}><FileText size={22} /><strong>Criar um resumo</strong><span>Organizar o que mais importa.</span></button>
      <button onClick={() => suggest('Tenho uma dúvida nos estudos. Você pode me ajudar com exemplos?')}><MessageCircle size={22} /><strong>Tirar uma dúvida</strong><span>Não existe pergunta pequena.</span></button>
    </div>}
    <section className="conversation" aria-label="Sua conversa com a Monisa" aria-busy={busy || loading}>
      {loading && <div className="message-skeleton" role="status">Carregando sua conversa…</div>}
      {!loading && messages.length === 0 && <div className="chat-empty"><span className="assistant-label"><Sparkles size={17} />MONISA</span><p>Me conte o que você quer aprender. Você pode escrever uma pergunta ou escolher uma sugestão acima.</p></div>}
      {messages.map(message => <article key={message.id} className={`chat-message ${message.role}`}><span className="assistant-label">{message.role === 'assistant' ? <><Sparkles size={15} />MONISA</> : 'VOCÊ'}</span><p>{message.content}</p></article>)}
      {busy && !confirmClear && <div className="thinking-message" role="status"><span className="status-dot" />A Monisa está preparando uma explicação para você…</div>}
      <div ref={end} />
    </section>
    {error && <div className="form-error" role="alert">{error}<button className="text-button" disabled={busy} onClick={() => { setLoading(true); setRetry(value => value + 1) }}>Recarregar conversa</button></div>}
    <form className="chat-compose" onSubmit={send}>
      <label htmlFor="study-question" className="visually-hidden">Sua pergunta para a Monisa</label>
      <textarea id="study-question" ref={input} value={draft} readOnly={busy} onChange={event => setDraft(event.target.value)} maxLength={2000} rows={3} placeholder="Escreva sua pergunta. Pode ser do seu jeito…" required />
      <div className="compose-bottom"><span>{draft.length}/2000</span><button className="primary-button" type="submit" disabled={busy || loading || !draft.trim()}>{busy ? 'Aguarde…' : 'Enviar pergunta'}<Send size={17} aria-hidden="true" /></button></div>
    </form>
    <div className="chat-footer"><p>A IA pode errar. Confira informações importantes. Suas mensagens são salvas na sua conta e enviadas ao serviço de IA para gerar respostas.</p>{messages.length > 0 && <button className="text-button" disabled={busy} onClick={() => setConfirmClear(true)}><RotateCcw size={14} />Apagar conversa</button>}</div>
    {confirmClear && <div className="confirm-panel"><p>Apagar todas as mensagens salvas desta conversa? Essa ação não pode ser desfeita.</p><div className="button-row"><button className="danger-button" disabled={busy} onClick={clear}>Sim, apagar conversa</button><button className="secondary-button" disabled={busy} onClick={() => setConfirmClear(false)}>Cancelar</button></div></div>}
  </section>
}
