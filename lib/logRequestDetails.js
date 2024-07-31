
import { getCustomHeaders } from './custom-headers.js'
import { waitForBody } from './wait-for-body.js'

export async function logrequestuestDetails(request) {
    let logger = request.log;
    const { method, url, headers } = request
    const ip = request.socket.remoteAddress
    const userAgent = headers['user-agent']
    const customHeaders = getCustomHeaders(headers)
    const body = await waitForBody(request)
    request.context = { customHeaders, body }
    logger.info('--- requestuest Details ---')
    logger.info(`requestuest: ${method} ${url} IP: ${ip} User Agent: ${userAgent}`)
    logger.info(`Custom Headers: ${JSON.stringify(customHeaders)}`)
    body && logger.info(`POST Body: ${body}`)
    logger.info('-----------------------')
}
