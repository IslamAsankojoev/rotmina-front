// a11yHelpers.js
const STORAGE_KEY = "a11y_prefs_v1";
const TEXT_STEPS = ["", "a11y--text-lg", "a11y--text-xl", "a11y--text-2xl"];

export const defaultState = {
  textStep: 0,
  highContrast: false,
  underlineLinks: false,
  grayscale: false,
  hideImages: false,
  dyslexic: false,
};

export const INJECT_CSS = `
:root { --font-size-base:16px; --line-height-base:1.6; --color-text:#111; --color-bg:#fff; --color-link:#0a66c2; --focus-ring:2px solid #3b82f6; }
body { font-size:var(--font-size-base); line-height:var(--line-height-base); color:var(--color-text); background:var(--color-bg); }
:focus-visible { outline:var(--focus-ring); outline-offset:3px; border-radius:4px; }
.a11y-skip-link { position:absolute; top:-1000px; left:0; padding:8px 12px; background:#000; color:#fff; z-index:1000; }
.a11y-skip-link:focus { top:12px; }
#a11y-toolbar { position:fixed; bottom:16px; right:16px; display:flex; gap:6px; flex-wrap:wrap; background:rgba(0,0,0,.75); padding:8px; border-radius:12px; z-index:9999; }
#a11y-toolbar button { font:inherit; padding:6px 10px; border:0; border-radius:8px; background:#fff; color:#111; cursor:pointer; }
#a11y-toolbar button[aria-pressed='true'] { outline:2px solid #0ea5e9; }
body.a11y--text-lg{--font-size-base:18px;} body.a11y--text-xl{--font-size-base:20px;} body.a11y--text-2xl{--font-size-base:22px;}
html.a11y--grayscale,body.a11y--grayscale{filter:grayscale(100%);}
body.a11y--high-contrast{--color-text:#000;--color-bg:#fff;--color-link:#0000ee;}
body.a11y--underline-links a{ text-decoration:underline; text-underline-offset:2px; }
body.a11y--hide-images img{ visibility:hidden!important; }
`;

export function ensureStyleInjected(id = "a11y-base-styles") {
  if (typeof document === "undefined") return;
  if (document.getElementById(id)) return;
  const style = document.createElement("style");
  style.id = id;
  style.textContent = INJECT_CSS;
  document.head.appendChild(style);
}

export function applyClasses(state) {
  if (typeof document === "undefined") return;
  const body = document.body;
  const html = document.documentElement;

  body.classList.remove("a11y--text-lg", "a11y--text-xl", "a11y--text-2xl");
  const stepClass = TEXT_STEPS[state.textStep];
  if (stepClass) body.classList.add(stepClass);

  toggle(body, "a11y--high-contrast", state.highContrast);
  toggle(body, "a11y--underline-links", state.underlineLinks);
  toggle(body, "a11y--hide-images", state.hideImages);
  toggle(body, "a11y--dyslexic", state.dyslexic);
  toggle(html, "a11y--grayscale", state.grayscale);
}

function toggle(el, cls, on) {
  el.classList[on ? "add" : "remove"](cls);
}

export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState;
    return { ...defaultState, ...JSON.parse(raw) };
  } catch {
    return defaultState;
  }
}

export function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {return}
}
