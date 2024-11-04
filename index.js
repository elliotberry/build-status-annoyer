import 'dotenv/config'
import http from 'node:http'

import doPlay from './lib/do-play.js'
import home from './lib/home.js'
import Logger from './lib/logger.js'

var log = new Logger()

const server = http.createServer(async (request, response) => {
    try {

        log = new Logger()
        request.log = log;

     //   await logRequestDetails(request)
        if (request.method === 'GET' && request.url === '/') {
            request.log.info('GET /')
            await home(request, response)
        } else if (request.method === 'POST' && request.url === '/') {
            request.log.info('POST /')
            await doPlay(request, response)
        } else {
            response.writeHead(404, { 'Content-Type': 'text/plain' });
            response.end('Not Found');
        }
    } catch (error) {
        request.log.error(error)
        response.writeHead(500, { 'Content-Type': 'application/json' })
        response.end(JSON.stringify({ error: error.message + '\n' + error.stack }))
    }
});

const port = process.env.PORT || 9099;
const host = '0.0.0.0';

server.listen(port, host, () => {
    log.info(`Server listening on ${host}:${port}`)
})

process.on('uncaughtException', (error) => {

    log.error(error)
    process.exit(1)
})
process.on('uncaughtException', (error) => {
    log.error(error);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {

    log.error('Unhandled rejection at:', promise, 'reason:', reason);
    process.exit(1);
});
