import http from 'node:http'
import cluster from 'node:cluster'
import os from 'node:os'
import playCachedAudio from './playCachedAudio.js'

const maximumEmployees = 4

if (cluster.isMaster) {
    const numCPUs = os.cpus().length
    const maxWorkers = maximumEmployees > numCPUs ? numCPUs : maximumEmployees
    console.log(`Master ${process.pid} is running`)

    // Fork workers
    for (let i = 0; i < maxWorkers; i++) {
        cluster.fork()
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`)
    })
} else {
    const server = http.createServer(async (req, res) => {
        if (req.method === 'GET' && req.url === '/') {
            console.log('GET /')
            await playCachedAudio('hello world')
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ hello: 'world' }))
        } else if (req.method === 'POST' && req.url === '/') {
            console.log('POST /')
            try {
                let body = ''
                req.on('data', (chunk) => {
                    body += chunk
                })
                req.on('end', async () => {
                    const { message } = JSON.parse(body)
                    await playCachedAudio(message)
                    res.setHeader('Content-Type', 'application/json')
                    res.end(JSON.stringify({ status: 'Sound played' }))
                })
            } catch (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify({ error: err.message }))
            }
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' })
            res.end('Not Found')
        }
    })

    const port = process.env.PORT || 9099
    const host = '0.0.0.0'

    server.listen(port, host, () => {
        console.log(`Worker ${process.pid} listening on ${host}:${port}`)
    })
}
