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

import { Accessibility, Brain, Circle, Contrast, ImageOff, Link2, Minus, Plus, Volume1 } from 'lucide-react'

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

        <div className="a11y-tip">Select an option or use hotkeys</div>

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
          <Tile
            onClick={increaseText}
            icon="tplus"
            label="Increase Text Size (Ctrl +)"
          />
          <Tile
            onClick={decreaseText}
            icon="tminus"
            label="Decrease Text Size (Ctrl -)"
          />
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
        <Contrast />
      )
    case 'sound':
      return (
        <Volume1 />
      )
    case 'links':
      return (
        <Link2 />
      )
    case 'tplus':
      return (
        <Plus />
      )
    case 'tminus':
      return (
        <Minus />
      )
    case 'gray':
      return (
        <Circle />
      )
    case 'hideimg':
      return (
        <ImageOff />
      )
    case 'df':
      return (
        <Brain />
      )
    default:
      return null
  }
}
