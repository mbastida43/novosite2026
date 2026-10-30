import { useState } from 'react'
import { Check, HandHeart } from 'lucide-react'

export const DONATE_KEY = 'donate@marlonbastida.com.br'
export const PAYPAL_URL = 'https://www.paypal.com/'

function PaypalIcon() {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true" fill="currentColor">
      <path d="M7.1 21.4H3.6a.6.6 0 0 1-.6-.7L5.7 3.5a.9.9 0 0 1 .9-.8h6.2c3.4 0 5.6 1.8 5 5-.6 3.6-3 5.4-6.4 5.4H9.3a.9.9 0 0 0-.9.8l-.8 5.6-.5 1.9Z" />
      <path d="M19.2 8.2c.9.7 1.3 1.9 1 3.4-.6 3.4-2.9 5-6 5h-1.1a.8.8 0 0 0-.8.7l-.6 3.7a.6.6 0 0 1-.6.5H8.6l.2-1.3.7-4.6a.6.6 0 0 1 .6-.5h1.6c3.9 0 6.8-2.1 7.5-6.1l.1-.8Z" opacity=".6" />
    </svg>
  )
}

type Labels = {
  pix: string
  paypal: string
  copy: string
  copied: string
  group: string
  pixNote: string
  paypalOpen: string
}

export function DonateButtons({ labels }: { labels: Labels }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(DONATE_KEY)
    } catch {
      const t = document.createElement('textarea')
      t.value = DONATE_KEY
      document.body.appendChild(t)
      t.select()
      document.execCommand('copy')
      t.remove()
    }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="donate-block">
      <div className="donate-row" role="group" aria-label={labels.group}>
        <button
          type="button"
          className="donate-btn"
          onClick={copy}
          aria-label={`${labels.pix}: ${DONATE_KEY} — ${labels.copy}`}
          title={labels.copy}
        >
          <HandHeart size={17} aria-hidden="true" />
          <span className="donate-btn-text">
            <span className="donate-label">{copied ? labels.copied : labels.pix}</span>
            <span className="donate-key">{copied ? labels.copied : DONATE_KEY}</span>
          </span>
          {copied && <Check size={15} aria-hidden="true" />}
          <span className="sr-only" aria-live="polite">{copied ? labels.copied : ''}</span>
        </button>

        <a
          className="donate-btn"
          href={PAYPAL_URL}
          target="_blank"
          rel="noreferrer noopener"
          aria-label={`${labels.paypal} — ${labels.paypalOpen}`}
          title={labels.paypalOpen}
        >
          <PaypalIcon />
          <HandHeart size={17} aria-hidden="true" />
          <span className="donate-btn-text">
            <span className="donate-label">{labels.paypal}</span>
            <span className="donate-key">{DONATE_KEY}</span>
          </span>
        </a>
      </div>
      <p className="donate-note">
        <span className="donate-note-mark" aria-hidden="true">*</span>
        {labels.pixNote}
      </p>
    </div>
  )
}
