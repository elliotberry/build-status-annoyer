import Fastify from 'fastify'
import play from 'tiktok-on-the-clock-but-the-party-dont-stop-no'

const fastify = Fastify({ logger: true })

fastify.get('/', async (request, reply) => {
    await play('hello worlddd')
    reply.send({ hello: 'world' })
})

fastify.post('/', async (request, reply) => {
    try {
        const { message } = request.body
        await play(message)
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
