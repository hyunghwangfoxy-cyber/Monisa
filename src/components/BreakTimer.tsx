import { useEffect, useState } from 'react'
import { Coffee, Pause, Play } from 'lucide-react'

export default function BreakTimer({ minutes }: { minutes: number }) {
  const [remaining, setRemaining] = useState(minutes * 60)
  const [running, setRunning] = useState(true)
  useEffect(() => {
    if (!running || !minutes) return
    let previous = Date.now()
    const interval = window.setInterval(() => {
      const now = Date.now()
      const elapsed = Math.floor((now - previous) / 1000)
      if (!elapsed) return
      previous += elapsed * 1000
      setRemaining(value => Math.max(0, value - elapsed))
    }, 1000)
    return () => window.clearInterval(interval)
  }, [running, minutes])
  if (!minutes) return null
  return <div className={`break-timer ${remaining === 0 ? 'time-for-break' : ''}`}>
    <Coffee size={18} aria-hidden="true" />
    {remaining > 0 ? <><span>Pausa em <strong>{Math.floor(remaining / 60)}:{String(remaining % 60).padStart(2, '0')}</strong></span><button className="icon-button" aria-label={running ? 'Pausar lembrete' : 'Retomar lembrete'} onClick={() => setRunning(!running)}>{running ? <Pause size={16} /> : <Play size={16} />}</button></> : <><span role="status">Hora de respirar. Faça uma pausa no seu tempo.</span><button className="text-button" onClick={() => { setRemaining(minutes * 60); setRunning(true) }}>Estou pronto para continuar</button></>}
  </div>
}
