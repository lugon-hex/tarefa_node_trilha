import { Redis } from 'ioredis'
import { env } from '@/env/index.js'

export const redis = new Redis({
  host: env.REDIS_HOST,
  port: env.REDIS_PORT,
  password: env.REDIS_PASSWORD,
  maxRetriesPerRequest: null,
})

redis.on('connect', () => {
  console.log('📦 Conectado ao Redis com sucesso!')
})

redis.on('error', (err) => {
  console.error('❌ Erro na conexão com o Redis:', err)
})