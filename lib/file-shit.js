import fs from 'fs/promises'

export const exists = async (path) => {
    try {
        await fs.access(path)
        return true
    } catch (e) {
        return false
    }
}

export const makeDirIfNeeded = async (path) => {
    try {
        if (!(await exists(path))) {
            await fs.mkdir(path)
        }
    } catch (err) {
        //
    }
}
