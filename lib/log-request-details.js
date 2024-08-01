import { getCustomHeaders } from './custom-headers.js';
import { waitForBody } from './wait-for-body.js';

export async function logRequestDetails(request) {
    const logger = request.log;
    const { method, url, headers, socket: { remoteAddress: ip } } = request;
    const userAgent = headers['user-agent'];
    const customHeaders = getCustomHeaders(headers);
    const body = await waitForBody(request);

    request.context = { customHeaders, body };

    const logMessages = [
        '--- Request Details ---',
        `Request: ${method} ${url} IP: ${ip} User Agent: ${userAgent}`,
        `Custom Headers: ${JSON.stringify(customHeaders)}`,
        body ? `POST Body: ${body}` : null,
        '-----------------------'
    ].filter(Boolean).join('\n');

    logger.info(logMessages);
}
