import fs from 'node:fs/promises'

export const exists = async (path) => {
    try {
        await fs.access(path)
        return true
    } catch {
        return false
    }
}

export const makeDirectoryIfNeeded = async (path) => {
    try {
        if (!(await exists(path))) {
            await fs.mkdir(path)
        }
    } catch {
        //
    }
}
