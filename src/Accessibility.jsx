'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'

import '@/src/accessibility/a11y.css'
import {
  A11yContext,
  STORAGE_KEY,
  TEXT_STEPS,
  defaultState,
  useA11y,
} from '@/src/accessibility/useA11y.js'
import { Accessibility } from 'lucide-react'

/* -------------------- Provider -------------------- */
export function A11yProvider({ children }) {
  const [state, setState] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || defaultState
    } catch {
      return defaultState
    }
  })

  const [open, setOpen] = useState(false)
  const panelRef = useRef(null)

  // Apply classes to body/html
  useEffect(() => {
    const body = document.body
    const html = document.documentElement

    body.classList.remove('a11y--text-lg', 'a11y--text-xl', 'a11y--text-2xl')
    const stepClass = TEXT_STEPS[state.textStep]
    if (stepClass) body.classList.add(stepClass)

    toggle(body, 'a11y--high-contrast', state.highContrast)
    toggle(body, 'a11y--underline-links', state.underlineLinks)
    toggle(body, 'a11y--hide-images', state.hideImages)
    toggle(body, 'a11y--dyslexic', state.dyslexic)
    toggle(html, 'a11y--grayscale', state.grayscale)
    toggle(body, 'a11y--dark', state.darkMode) // 🌙 dark theme toggle

    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  // Hotkeys
  useEffect(() => {
    const onKey = (e) => {
      if (e.altKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        const firstBtn = panelRef.current?.querySelector('button')
        firstBtn?.focus()
      }
      if ((e.ctrlKey || e.metaKey) && (e.key === 'u' || e.key === 'U')) {
        e.preventDefault()
        setOpen((v) => !v)
      }
      if (e.altKey && e.shiftKey && (e.key === 'D' || e.key === 'd')) {
        e.preventDefault()
        toggleDarkMode()
      }
      if (e.altKey && e.shiftKey && (e.key === 'S' || e.key === 's')) {
        e.preventDefault()
        speakSelection()
      }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [state])

  // 🔊 Speech synthesis for selected text
  const speakSelection = () => {
    const text = window.getSelection().toString().trim()
    if (!text) {
      alert('Select text for speech synthesis 🎧')
      return
    }
    const synth = window.speechSynthesis
    synth.cancel()
    const utter = new SpeechSynthesisUtterance(text)
    utter.lang = 'en-US'
    utter.rate = 1
    synth.speak(utter)
  }

  // 🌙 Dark theme toggle
  const toggleDarkMode = () =>
    setState((s) => ({ ...s, darkMode: !s.darkMode }))

  const api = useMemo(
    () => ({
      state,
      increaseText: () =>
        setState((s) => ({ ...s, textStep: Math.min(3, s.textStep + 1) })),
      decreaseText: () =>
        setState((s) => ({ ...s, textStep: Math.max(0, s.textStep - 1) })),
      toggleHighContrast: () =>
        setState((s) => ({ ...s, highContrast: !s.highContrast })),
      toggleUnderlineLinks: () =>
        setState((s) => ({ ...s, underlineLinks: !s.underlineLinks })),
      toggleGrayscale: () =>
        setState((s) => ({ ...s, grayscale: !s.grayscale })),
      toggleHideImages: () =>
        setState((s) => ({ ...s, hideImages: !s.hideImages })),
      toggleDyslexic: () => setState((s) => ({ ...s, dyslexic: !s.dyslexic })),
      toggleDarkMode,
      speakSelection,
      reset: () => setState(defaultState),
    }),
    [state],
  )

  return (
    <A11yContext.Provider value={api}>
      {children}
      <A11yToolbar ref={panelRef} open={open} setOpen={setOpen} />
    </A11yContext.Provider>
  )
}

function toggle(el, cls, on) {
  el.classList[on ? 'add' : 'remove'](cls)
}

/* -------------------- Toolbar -------------------- */
export const A11yToolbar = React.forwardRef(function Toolbar(
  { open, setOpen },
  ref,
) {
  const {
    state,
    increaseText,
    decreaseText,
    toggleHighContrast,
    toggleUnderlineLinks,
    toggleGrayscale,
    toggleHideImages,
    toggleDyslexic,
    toggleDarkMode,
    speakSelection,
    reset,
  } = useA11y()

  return (
    <>
      <button
        className="a11y-launcher"
        aria-label="Accessibility menu (Ctrl+U)"
        onClick={() => setOpen(true)}
      >
        <span className="a11y-launcher-dot">
          <Accessibility className="a11y-icon" />
        </span>
      </button>

      <div
        className={`a11y-backdrop ${open ? 'show' : ''}`}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      />

      <aside
        ref={ref}
        className={`a11y-panel ${open ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Accessibility Menu"
      >
        <header className="a11y-panel__header">
          <div>
            <strong>Accessibility Menu</strong>
            <span className="a11y-panel__hint"> (CTRL+U)</span>
          </div>
          <button
            className="a11y-close"
            aria-label="Close"
            onClick={() => setOpen(false)}
          >
            ×
          </button>
        </header>

        <div className="a11y-tip">
          Select an option or use hotkeys
        </div>

        <div className="a11y-grid">
          <Tile
            onClick={toggleHighContrast}
            pressed={state.highContrast}
            icon="contrast"
            label="High Contrast"
          />
          <Tile
            onClick={toggleUnderlineLinks}
            pressed={state.underlineLinks}
            icon="links"
            label="Underline Links"
          />
          <Tile onClick={increaseText} icon="tplus" label="Increase Text Size" />
          <Tile onClick={decreaseText} icon="tminus" label="Decrease Text Size" />
          <Tile
            onClick={toggleGrayscale}
            pressed={state.grayscale}
            icon="gray"
            label="Grayscale"
          />
          <Tile
            onClick={toggleHideImages}
            pressed={state.hideImages}
            icon="hideimg"
            label="Hide Images"
          />
          <Tile
            onClick={toggleDyslexic}
            pressed={state.dyslexic}
            icon="df"
            label="Dyslexia Friendly"
          />
          <Tile
            onClick={toggleDarkMode}
            pressed={state.darkMode}
            icon="moon"
            label="Dark Theme"
          />
          <Tile onClick={speakSelection} icon="sound" label="Speak Text" />
        </div>

        <button className="a11y-reset" onClick={reset}>
          Reset All Settings
        </button>
      </aside>
    </>
  )
})

/* -------------------- Helper Components -------------------- */
function Tile({ onClick, pressed, icon, label }) {
  return (
    <button
      className={`a11y-tile ${pressed ? 'pressed' : ''}`}
      onClick={onClick}
      aria-pressed={!!pressed}
    >
      <Icon name={icon} />
      <span>{label}</span>
    </button>
  )
}

function Icon({ name }) {
  switch (name) {
    case 'contrast':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24">
          <path d="M12 3a9 9 0 100 18V3z" fill="currentColor" />
          <circle
            cx="12"
            cy="12"
            r="9"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      )
    case 'links':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M10.6 13.4a1 1 0 01-1.4 0l-2.6-2.6a3 3 0 014.2-4.2l1.1 1.1-1.4 1.4-1.1-1.1a1 1 0 10-1.4 1.4l2.6 2.6a1 1 0 010 1.4z"
          />
          <path
            fill="currentColor"
            d="M13.4 10.6a1 1 0 011.4 0l2.6 2.6a3 3 0 11-4.2 4.2l-1.1-1.1 1.4-1.4 1.1 1.1a1 1 0 101.4-1.4l-2.6-2.6a1 1 0 010-1.4z"
          />
        </svg>
      )
    case 'tplus':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24">
          <path
            d="M5 12h14M12 5v14"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      )
    case 'tminus':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24">
          <path
            d="M5 12h14"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      )
    case 'gray':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9" fill="currentColor" opacity=".4" />
        </svg>
      )
    case 'hideimg':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24">
          <path
            d="M3 5h18v14H3z"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
          <path d="M3 19L21 5" stroke="currentColor" strokeWidth="2" />
        </svg>
      )
    case 'df':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24">
          <text x="4" y="17" fontSize="14" fill="currentColor">
            Df
          </text>
        </svg>
      )
    case 'moon':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"
          />
        </svg>
      )
    case 'sound':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24">
          <path fill="currentColor" d="M3 10v4h4l5 5V5l-5 5H3z" />
          <path
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            d="M16 7c1.5 1.5 1.5 8.5 0 10"
          />
        </svg>
      )
    default:
      return null
  }
}
