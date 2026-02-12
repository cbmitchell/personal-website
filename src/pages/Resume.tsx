import { useRef, useState, FormEvent } from 'react'
import emailjs from '@emailjs/browser'
import { Turnstile } from '@marsidev/react-turnstile'
import styles from './Resume.module.css'

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

// Use Cloudflare's test key in development (always passes), real key in production
// See: https://developers.cloudflare.com/turnstile/troubleshooting/testing/
const TURNSTILE_TEST_KEY = '1x00000000000000000000AA'
const TURNSTILE_SITE_KEY = import.meta.env.DEV
  ? TURNSTILE_TEST_KEY
  : import.meta.env.VITE_TURNSTILE_SITE_KEY

type FormStatus = 'idle' | 'sending' | 'success' | 'error'

function Resume() {
  const formRef = useRef<HTMLFormElement>(null)
  const [status, setStatus] = useState<FormStatus>('idle')
  /**
   * TODO: Phase 2 - AWS Infrastructure Migration
   * Currently, we only perform client-side Turnstile validation (checking that a token exists).
   * The Turnstile widget itself provides bot protection through its challenge mechanism.
   *
   * For full security, the token should be validated server-side by sending it to
   * Cloudflare's siteverify API with our secret key. This will be implemented when
   * we migrate to AWS infrastructure (Lambda + API Gateway).
   *
   * See: https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
   */
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!turnstileToken) {
      return
    }

    setStatus('sending')

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current!,
        EMAILJS_PUBLIC_KEY
      )
      setStatus('success')
      formRef.current?.reset()
      setTurnstileToken(null)
    } catch (error) {
      console.error('EmailJS error:', error)
      setStatus('error')
    }
  }

  return (
    <section className={styles.resume}>
      <h1>Request My Resumé</h1>
      <p className={styles.description}>
        Interested in learning more about my experience? Fill out the form below
        and I'll send you a copy of my resumé.
      </p>

      <form ref={formRef} onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" required />
        </div>

        <div className={styles.field}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />
        </div>

        <div className={styles.field}>
          <label htmlFor="company">Company (optional)</label>
          <input type="text" id="company" name="company" />
        </div>

        <div className={styles.field}>
          <label htmlFor="message">Message (optional)</label>
          <textarea id="message" name="message" rows={4} />
        </div>

        <div className={styles.turnstile}>
          <Turnstile
            siteKey={TURNSTILE_SITE_KEY}
            onSuccess={setTurnstileToken}
            onExpire={() => setTurnstileToken(null)}
          />
        </div>

        <button
          type="submit"
          className={styles.submitButton}
          disabled={status === 'sending' || !turnstileToken}
        >
          {status === 'sending' ? 'Sending...' : 'Request Resumé'}
        </button>

        {status === 'success' && (
          <p className={styles.successMessage}>
            Thanks! I'll send my resumé to you shortly.
          </p>
        )}

        {status === 'error' && (
          <p className={styles.errorMessage}>
            Something went wrong. Please try again or email me directly.
          </p>
        )}
      </form>
    </section>
  )
}

export default Resume
