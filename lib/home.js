import fs from 'node:fs/promises'

import path from 'node:path'
const home = async (req, res) => {

    let homePage = await fs.readFile(path.join(process.cwd(), 'dox/text-documentation.html'), 'utf-8')
    res.setHeader('Content-Type', 'text/html')
    res.end(homePage)
}

export default home
