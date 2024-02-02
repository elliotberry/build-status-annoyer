import Fastify from 'fastify'
import playCachedAudio from './playCachedAudio.js'

const fastify = Fastify({ logger: true })

fastify.get('/', async (request, reply) => {
    await playCachedAudio('hello worlddd')
    reply.send({ hello: 'world' })
})

fastify.post('/', async (request, reply) => {
    try {
        const { message } = request.body
        await playCachedAudio(message)
        return { status: 'Sound played' }
    } catch (err) {
        reply.status(500).send(err)
    }
})

const start = async () => {
    try {
        await fastify.listen({ port: 9099, host: '0.0.0.0' })
        console.log(`server listening on ${fastify.server.address().port}`)
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}

start()
