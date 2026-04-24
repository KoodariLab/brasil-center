/**
 * Widget Behold (Instagram): carrega o script e remove o branding "Made with Behold"
 * (CSS injetado no shadow + remoção de nós; exige shadow aberto — ver patchAttachShadowOpenForBehold).
 */

let attachShadowPatched = false

export function patchAttachShadowOpenForBehold() {
  if (attachShadowPatched || typeof Element === 'undefined') {
    return
  }
  attachShadowPatched = true
  const original = Element.prototype.attachShadow
  Element.prototype.attachShadow = function (init) {
    const opts =
      init && typeof init === 'object' ? { ...init, mode: 'open' } : { mode: 'open' }
    return original.call(this, opts)
  }
}

const BRANDING_OVERRIDE_CSS = `
behold-branding,
behold-branding a,
behold-branding svg,
.container:hover behold-branding,
.container:hover behold-branding a {
  display: none !important;
  opacity: 0 !important;
  visibility: hidden !important;
  pointer-events: none !important;
  width: 0 !important;
  height: 0 !important;
  max-width: 0 !important;
  max-height: 0 !important;
  overflow: hidden !important;
  position: absolute !important;
  clip: rect(0, 0, 0, 0) !important;
  transform: scale(0) !important;
}
`

function injectBrandingOverrideIntoShadow(shadowRoot) {
  if (!shadowRoot?.appendChild) {
    return
  }
  if (shadowRoot.querySelector('#bcc-hide-behold-branding-override')) {
    return
  }
  const style = document.createElement('style')
  style.id = 'bcc-hide-behold-branding-override'
  style.textContent = BRANDING_OVERRIDE_CSS
  shadowRoot.appendChild(style)
}

function removeBrandingNodesInRoot(root) {
  if (!root?.querySelectorAll) {
    return
  }
  root.querySelectorAll('behold-branding').forEach((el) => {
    el.remove()
  })
}

function forEachOpenShadowRoot(root, fn) {
  if (!root?.querySelectorAll) {
    return
  }
  root.querySelectorAll('*').forEach((el) => {
    if (el.shadowRoot) {
      fn(el.shadowRoot)
      forEachOpenShadowRoot(el.shadowRoot, fn)
    }
  })
}

function hideBeholdBrandingEverywhere() {
  removeBrandingNodesInRoot(document)
  forEachOpenShadowRoot(document, (shadowRoot) => {
    injectBrandingOverrideIntoShadow(shadowRoot)
    removeBrandingNodesInRoot(shadowRoot)
  })
}

let hideBrandingDebounce = null

function scheduleHideBranding() {
  if (!import.meta.client) {
    return
  }
  if (hideBrandingDebounce) {
    clearTimeout(hideBrandingDebounce)
  }
  hideBrandingDebounce = setTimeout(() => {
    hideBrandingDebounce = null
    hideBeholdBrandingEverywhere()
  }, 50)
}

/** Após remount do <behold-widget> (:key), etc. */
export function requestBeholdBrandingHideUpdate() {
  scheduleHideBranding()
}

/** Injeta widget.js (uma vez) após patch de attachShadow. */
export function loadBeholdWidgetScript() {
  if (typeof document === 'undefined') {
    return
  }
  if (document.getElementById('behold-widget-script')) {
    return
  }
  patchAttachShadowOpenForBehold()
  const s = document.createElement('script')
  s.id = 'behold-widget-script'
  s.type = 'module'
  s.src = 'https://w.behold.so/widget.js'
  document.head.append(s)
}

/**
 * Observa o DOM e aplica ocultação do branding (debounce + polling inicial).
 * @returns {() => void} dispose — chamar no onUnmounted
 */
export function setupBeholdBrandingHide() {
  let observer = null
  let poll = null

  scheduleHideBranding()

  observer = new MutationObserver(() => {
    scheduleHideBranding()
  })
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  })

  let ticks = 0
  poll = setInterval(() => {
    hideBeholdBrandingEverywhere()
    ticks += 1
    if (ticks >= 75) {
      clearInterval(poll)
      poll = null
    }
  }, 200)

  return function disposeBeholdBrandingHide() {
    if (observer) {
      observer.disconnect()
      observer = null
    }
    if (hideBrandingDebounce) {
      clearTimeout(hideBrandingDebounce)
      hideBrandingDebounce = null
    }
    if (poll) {
      clearInterval(poll)
      poll = null
    }
  }
}
