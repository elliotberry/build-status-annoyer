export const waitForBody = (request) => {
    return new Promise((resolve) => {
        if (request.method === 'GET') {
            resolve('')
            return
        }
        if (request.context && request.context.body) {
            resolve(request.context.body)
        }
        let body = ''
        request.on('data', (chunk) => {
            body += chunk
        })
        request.on('end', () => {
            resolve(body)
        })
    })
}
