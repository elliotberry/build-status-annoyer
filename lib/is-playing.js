
import fs from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

var temporary

class FileState {
    constructor() {
        this.filePath = join(tmpdir(), `tempfile_is_playing`)
        this.deleteTempFile()

        console.log('Filepath:', this.filePath)
        

        process.on('exit', () => this.deleteTempFile())
    }

    async createTempFile() {
        await fs.writeFile(this.filePath, '')
        this.startDeletionTimer()
        this.state = true
    }

    async deleteTempFile() {
        
        clearTimeout(this.deletionTimer)
        if (this.fileExists(this.filePath)) {
            console.log('deleting temp file')
            try {
                await fs.unlink(this.filePath)
                console.log('File deleted successfully')
            } catch {
              //  console.error('Error deleting file:', error)
            }
        }
        this.state = false
    }

    async fileExists() {
        try {
            await fs.access(this.filePath)
            return true
        } catch {
            return false
        }
    }
    async reinstateFile() {
        clearTimeout(this.deletionTimer)
        await this.createTempFile()
        this.startDeletionTimer()
    }
    start() {
        this.createTempFile()
    }
    startDeletionTimer() {
        this.deletionTimer = setTimeout(() => this.deleteTempFile(), 10_000)
    }

    stop() {
        this.deleteTempFile()
    }
}



export default FileState
