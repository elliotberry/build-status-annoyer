import fs from 'node:fs/promises'
import path from 'node:path'
const home = async (request, response) => {
    const homePage = await fs.readFile(
        path.join(process.cwd(), 'dox/text-documentation.html'),
        'utf8'
    )
    response.setHeader('Content-Type', 'text/html')
    response.end(homePage)
}

export default home
