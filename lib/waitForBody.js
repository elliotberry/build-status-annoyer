export const waitForBody = (req) => {
    return new Promise((resolve, reject) => {
        if (req.method === 'GET') {
            resolve('');
            return;
        }
        if (req.context && req.context.body) {
           resolve(req.context.body);
        }
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        });
        req.on('end', () => {
            resolve(body);
        });
    });
};
