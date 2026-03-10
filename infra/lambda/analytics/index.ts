import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda'
import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb'
import { randomUUID } from 'crypto'
import { z } from 'zod'

const db = new DynamoDBClient({})
const TABLE_NAME = process.env.TABLE_NAME!
const TTL_DAYS = 90
const ALLOWED_ORIGIN = 'https://chrisbeckermitchell.com'

const schema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('pageview'),
    path: z.string().max(500),
    referrer: z.string().max(500).optional(),
    sessionId: z.string().max(64),
    language: z.string().max(20).optional(),
    viewportWidth: z.number().int().min(0).max(10000).optional(),
    viewportHeight: z.number().int().min(0).max(10000).optional(),
  }),
  z.object({
    type: z.literal('duration'),
    path: z.string().max(500),
    durationMs: z.number().int().min(0).max(3_600_000),
    sessionId: z.string().max(64),
  }),
])

export async function handler(
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> {
  if ((event.headers['origin'] ?? '') !== ALLOWED_ORIGIN) {
    return { statusCode: 403, body: '{}' }
  }

  let parsed: ReturnType<typeof schema.safeParse>
  try {
    parsed = schema.safeParse(JSON.parse(event.body ?? '{}'))
  } catch {
    return { statusCode: 400, body: '{}' }
  }
  if (!parsed.success) return { statusCode: 400, body: '{}' }

  const now = new Date()
  const dateStr = now.toISOString().slice(0, 10)
  const ttl = Math.floor(Date.now() / 1000) + TTL_DAYS * 86400
  const data = parsed.data

  const item: Record<string, { S: string } | { N: string }> = {
    pk: { S: `DATE#${dateStr}` },
    sk: { S: `${data.type.toUpperCase()}#${now.toISOString()}#${randomUUID()}` },
    type: { S: data.type },
    path: { S: data.path },
    sessionId: { S: data.sessionId },
    ttl: { N: String(ttl) },
  }

  if (data.type === 'pageview') {
    if (data.referrer) item.referrer = { S: data.referrer }
    if (data.language) item.language = { S: data.language }
    if (data.viewportWidth != null) item.viewportWidth = { N: String(data.viewportWidth) }
    if (data.viewportHeight != null) item.viewportHeight = { N: String(data.viewportHeight) }
    const ua = event.headers['user-agent']
    if (ua) item.userAgent = { S: ua.slice(0, 500) }
  }

  if (data.type === 'duration') {
    item.durationMs = { N: String(data.durationMs) }
  }

  await db.send(new PutItemCommand({ TableName: TABLE_NAME, Item: item }))
  return { statusCode: 200, body: '{}' }
}
