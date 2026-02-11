import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import styles from './Resume.module.css'

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

function Resume() {
  const formRef = useRef(null)
  const [status, setStatus] = useState('idle') // idle, sending, success, error

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      )
      setStatus('success')
      formRef.current.reset()
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

        <button
          type="submit"
          className={styles.submitButton}
          disabled={status === 'sending'}
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
