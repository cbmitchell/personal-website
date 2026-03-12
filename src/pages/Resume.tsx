import { useRef, useState, FormEvent } from 'react'
import { Turnstile } from '@marsidev/react-turnstile'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'
import CircularProgress from '@mui/material/CircularProgress'
import Snackbar from '@mui/material/Snackbar'

const CONTACT_API_URL = import.meta.env.VITE_CONTACT_API_URL

// Use Cloudflare's test key in development (always passes), real key in production
// See: https://developers.cloudflare.com/turnstile/troubleshooting/testing/
const TURNSTILE_TEST_KEY = '1x00000000000000000000AA'
const TURNSTILE_SITE_KEY = import.meta.env.DEV
  ? TURNSTILE_TEST_KEY
  : import.meta.env.VITE_TURNSTILE_SITE_KEY

type FormStatus = 'idle' | 'sending' | 'success' | 'error'

export function Resume() {
  const formRef = useRef<HTMLFormElement>(null)
  const [status, setStatus] = useState<FormStatus>('idle')
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!turnstileToken) {
      return
    }

    setStatus('sending')

    try {
      const formData = new FormData(formRef.current!)
      const response = await fetch(`${CONTACT_API_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          company: formData.get('company') || undefined,
          message: formData.get('message') || undefined,
          turnstileToken,
        }),
      })

      if (!response.ok) throw new Error('Request failed')

      setStatus('success')
      setSnackbarOpen(true)
      formRef.current?.reset()
      setTurnstileToken(null)
    } catch {
      setStatus('error')
    }
  }

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h3" gutterBottom>
        Request My Resumé
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 4 }}>
        Interested in learning more about my experience? Fill out the form below
        and I'll send you a copy of my resumé.
      </Typography>

      <Box component="form" ref={formRef} onSubmit={handleSubmit}>
        <Stack spacing={2.5}>
          <TextField
            name="name"
            label="Name"
            required
          />

          <TextField
            name="email"
            label="Email"
            type="email"
            required
          />

          <TextField
            name="company"
            label="Company (optional)"
          />

          <TextField
            name="message"
            label="Message (optional)"
            multiline
            rows={4}
            slotProps={{ htmlInput: { maxLength: 5000 } }}
          />

          <Box sx={{ display: 'flex', justifyContent: 'center', minHeight: 65 }}>
            <Turnstile
              siteKey={TURNSTILE_SITE_KEY}
              onSuccess={setTurnstileToken}
              onExpire={() => setTurnstileToken(null)}
              options={{
                size: 'flexible',
                theme: 'dark'
              }}
            />
          </Box>

          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={status === 'sending' || !turnstileToken}
          >
            {status === 'sending' ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Request Resumé'
            )}
          </Button>

          {status === 'error' && (
            <Alert severity="error">
              Something went wrong. Please try again or email me directly.
            </Alert>
          )}
        </Stack>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert severity="success" onClose={() => setSnackbarOpen(false)}>
          Thanks! I'll send my resumé to you shortly.
        </Alert>
      </Snackbar>
    </Container>
  )
}

