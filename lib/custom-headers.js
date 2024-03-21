const typicalHttpRequestHeaders = [
  'Accept',
  'Accept-Encoding',
  'Accept-Language',
  'Authorization',
  'Cache-Control',
  'Connection',
  'Content-Length',
  'Content-Type',
  'Cookie',
  'Host',
  'Origin',
  'Referer',
  'User-Agent',
  'X-Requested-With'
];

function getCustomHeaders(headers) {
  const customHeaders = {};

  for (const header in headers) {
    if (!typicalHttpRequestHeaders.includes(header)) {
      customHeaders[header] = headers[header];
    }
  }

  return customHeaders;
}
export { typicalHttpRequestHeaders, getCustomHeaders };
