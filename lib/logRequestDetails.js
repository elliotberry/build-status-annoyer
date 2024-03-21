import logger from './logger.js';
import { getCustomHeaders } from './custom-headers.js';
import { waitForBody } from './waitForBody.js';

export async function logRequestDetails(req) {
    const { method, url, headers } = req;
    const ip = req.socket.remoteAddress;
    const userAgent = headers['user-agent'];
    const customHeaders = getCustomHeaders(headers);
    const body = await waitForBody(req);
    req.context = { customHeaders, body };
    logger.info('--- Request Details ---');
    logger.info(`Request: ${method} ${url} IP: ${ip} User Agent: ${userAgent}`);
    logger.info(`Custom Headers: ${JSON.stringify(customHeaders)}`);
   body && logger.info(`POST Body: ${body}`);
    logger.info('-----------------------');
}
