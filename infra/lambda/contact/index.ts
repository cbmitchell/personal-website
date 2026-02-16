import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda'
import { SESv2Client, SendEmailCommand } from '@aws-sdk/client-sesv2'
import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from '@aws-sdk/client-secrets-manager'
import { z } from 'zod'

const ses = new SESv2Client({})
const secretsManager = new SecretsManagerClient({})

// Cache the secret across warm invocations
let cachedTurnstileSecret: string | null = null

async function getTurnstileSecret(): Promise<string> {
  if (cachedTurnstileSecret) return cachedTurnstileSecret
  const result = await secretsManager.send(
    new GetSecretValueCommand({
      SecretId: process.env.TURNSTILE_SECRET_NAME!,
    })
  )
  if (!result.SecretString) {
    throw new Error('Turnstile secret not found or not a string value')
  }
  cachedTurnstileSecret = result.SecretString
  return cachedTurnstileSecret
}

async function verifyTurnstile(token: string): Promise<boolean> {
  const secret = await getTurnstileSecret()
  const response = await fetch(
    'https://challenges.cloudflare.com/turnstile/v0/siteverify',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret, response: token }),
    }
  )
  const result = (await response.json()) as { success: boolean }
  return result.success === true
}

const contactRequestSchema = z.object({
  name: z.string().min(1),
  email: z.email(),
  company: z.string().optional(),
  message: z.string().optional(),
  turnstileToken: z.string().min(1),
})

export async function handler(
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> {
  let parsed: unknown
  try {
    parsed = JSON.parse(event.body ?? '')
  } catch {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid JSON' }),
    }
  }

  const result = contactRequestSchema.safeParse(parsed)
  if (!result.success) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid request body', details: result.error.flatten() }),
    }
  }

  const data = result.data

  const turnstileValid = await verifyTurnstile(data.turnstileToken)
  if (!turnstileValid) {
    return {
      statusCode: 403,
      body: JSON.stringify({ error: 'Bot verification failed' }),
    }
  }

  const bodyLines = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    data.company ? `Company: ${data.company}` : '',
    data.message ? `Message: ${data.message}` : '',
  ].filter(Boolean).join('\n')

  await ses.send(
    new SendEmailCommand({
      FromEmailAddress: process.env.SENDER_EMAIL!,
      Destination: { ToAddresses: [process.env.RECIPIENT_EMAIL!] },
      Content: {
        Simple: {
          Subject: { Data: `Resume Request from ${data.name}` },
          Body: {
            Text: { Data: bodyLines },
          },
        },
      },
    })
  )

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Request sent successfully' }),
  }
}
