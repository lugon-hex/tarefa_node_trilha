import { env } from '@env/index.js'
import cron from 'node-cron'
import { makeSendDailyHighlightsUseCase } from '@/use-cases/cron/factories/make-send-daily-highlights.js'

export function registerDailyHighlightsJob() {
  const schedule = env.CRON_SCHEDULE

  if (!cron.validate(schedule)) {
    console.error(
      `[DailyHighlights] Expressão CRON inválida: "${schedule}". Job não registrado.`,
    )
    return
  }

  console.log(`[DailyHighlights] Job registrado com a expressão: "${schedule}"`)

  cron.schedule(schedule, async () => {
    console.log(
      `[DailyHighlights] Iniciando envio do resumo diário... (${new Date().toISOString()})`,
    )

    try {
      const sendDailyHighlightsUseCase = makeSendDailyHighlightsUseCase()
      await sendDailyHighlightsUseCase.execute()
    } catch (error) {
      console.error('[DailyHighlights] Erro ao executar job:', error)
    }
  })
}
