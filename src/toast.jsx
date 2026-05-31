import React, { useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'

const DEFAULT_DURATION = 4000

function Icon({ type }) {
  const base = { width: 18, height: 18 }
  if (type === 'success') return (
    <svg style={base} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5" /></svg>
  )
  if (type === 'error') return (
    <svg style={base} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
  )
  return (
    <svg style={base} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /></svg>
  )
}

function ToastItem({ id, type = 'info', message, onClose }) {
  const colors = {
    success: { bg: '#e6f6ef', color: '#1f6e3a' },
    error: { bg: '#fdecea', color: '#7b1d1d' },
    info: { bg: '#eef2ff', color: '#1e3a8a' },
  }[type]

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        display: 'flex',
        gap: 12,
        alignItems: 'center',
        padding: '10px 14px',
        borderRadius: 12,
        minWidth: 260,
        maxWidth: 360,
        boxShadow: '0 6px 20px rgba(2,6,23,0.6)',
        background: colors.bg,
        color: colors.color,
        border: `1px solid ${type === 'success' ? 'rgba(31,110,58,0.12)' : type === 'error' ? 'rgba(123,29,29,0.12)' : 'rgba(30,58,138,0.12)'}`,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon type={type} />
      </div>
      <div style={{ flex: 1, fontSize: 13, lineHeight: '16px' }}>{message}</div>
      <button onClick={() => onClose(id)} aria-label="Close" style={{ background: 'transparent', border: 'none', color: colors.color, cursor: 'pointer' }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
      </button>
    </div>
  )
}

function ToastContainer() {
  const [toasts, setToasts] = useState([])

  useEffect(() => {
    // expose add/remove to module-level API
    window.__CHEESE_TOAST_ADD = (t) => {
      setToasts((s) => [...s, { id: Date.now() + Math.random(), ...t }])
    }
    window.__CHEESE_TOAST_REMOVE = (id) => {
      setToasts((s) => s.filter(x => x.id !== id))
    }
    return () => {
      delete window.__CHEESE_TOAST_ADD
      delete window.__CHEESE_TOAST_REMOVE
    }
  }, [])

  useEffect(() => {
    const timers = toasts.map(t => {
      const duration = t.duration || DEFAULT_DURATION
      const timer = setTimeout(() => window.__CHEESE_TOAST_REMOVE && window.__CHEESE_TOAST_REMOVE(t.id), duration)
      return timer
    })
    return () => timers.forEach(clearTimeout)
  }, [toasts])

  return (
    <div style={{ position: 'fixed', top: 18, right: 18, zIndex: 99999, display: 'flex', flexDirection: 'column', gap: 10 }}>
      {toasts.map(t => (
        <ToastItem key={t.id} {...t} onClose={(id) => window.__CHEESE_TOAST_REMOVE && window.__CHEESE_TOAST_REMOVE(id)} />
      ))}
    </div>
  )
}

// Mount container once
if (typeof document !== 'undefined') {
  const id = 'cheddar-toast-root'
  let rootEl = document.getElementById(id)
  if (!rootEl) {
    rootEl = document.createElement('div')
    rootEl.id = id
    document.body.appendChild(rootEl)
  }
  try {
    const root = createRoot(rootEl)
    root.render(React.createElement(ToastContainer))
  } catch (e) {
    // ignore if already mounted
  }
}

const toast = {
  success: (msg, opts = {}) => window.__CHEESE_TOAST_ADD && window.__CHEESE_TOAST_ADD({ type: 'success', message: String(msg), ...opts }),
  error: (msg, opts = {}) => window.__CHEESE_TOAST_ADD && window.__CHEESE_TOAST_ADD({ type: 'error', message: String(msg), ...opts }),
  info: (msg, opts = {}) => window.__CHEESE_TOAST_ADD && window.__CHEESE_TOAST_ADD({ type: 'info', message: String(msg), ...opts }),
}

export default toast
