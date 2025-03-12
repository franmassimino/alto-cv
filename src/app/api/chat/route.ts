import { streamText } from 'ai'
import { openai } from '@ai-sdk/openai'

export const runtime = 'edge'

export async function POST(req: Request) {
    try {
        // Extraemos los datos enviados por el cliente
        const { cvContent, userMessage, attachments } = await req.json()

        // Si hay archivos, concatenamos sus nombres para incluirlos en el prompt
        const attachmentsList = attachments && attachments.length > 0
            ? attachments.map((att: any) => att.name).join(', ')
            : ''

        // Construimos el prompt combinando el contenido del CV, el mensaje del usuario y los archivos adjuntos
        const prompt = `
Analiza el siguiente CV y las referencias del usuario, y sugiere mejoras para adaptarlo a diferentes ofertas de trabajo.

CV:
${cvContent || "No se ha proporcionado un CV"}

Referencias:
${userMessage || "No se han proporcionado referencias"}

Archivos adjuntos:
${attachmentsList || "No hay archivos adjuntos"}

Devuelve una versión mejorada del CV en formato HTML si es necesario. Si no es necesaria una modificación, responde de forma breve con consejos específicos.
    `

        // Asegurarnos de que las cabeceras sean correctas para streaming
        const result: any = await streamText({
            model: openai('gpt-4-turbo'),
            messages: [
                { role: 'system', content: 'Eres un asistente experto en optimización de CVs. Proporciona respuestas claras, específicas y útiles basadas en la información disponible. Si la información es insuficiente, solicita más detalles.' },
                { role: 'user', content: prompt }
            ],
            temperature: 0.7,
            maxTokens: 4000,
        })

        // Configurar las cabeceras adecuadas para streaming
        const headers = new Headers({
            'Content-Type': 'text/plain; charset=utf-8',
            'Transfer-Encoding': 'chunked',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
        })

        // Si result tiene un método específico para streaming, úsalo
        if (typeof result.toDataStreamResponse === 'function') {
            return result.toDataStreamResponse()
        }

        // Alternativa: configurar manualmente el stream
        const stream = new ReadableStream({
            async start(controller) {
                try {
                    for await (const chunk of result) {
                        controller.enqueue(new TextEncoder().encode(chunk))
                    }
                    controller.close()
                } catch (error) {
                    controller.error(error)
                }
            }
        })

        return new Response(stream, {
            headers,
            status: 200
        })
    } catch (error) {
        console.error('Error en la API de chat:', error)
        return new Response(JSON.stringify({ error: 'Error procesando la solicitud' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        })
    }
}