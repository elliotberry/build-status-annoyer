import fs from 'fs/promises';
import { unlinkSync, existsSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';

var temp;

class TempFile {
  constructor() {
    this.filePath = join(tmpdir(), `tempfile_${Date.now()}`);
    this.createTempFile();
    this.startDeletionTimer();
    process.on('exit', () => this.deleteTempFile());
  }

  async createTempFile() {
    await fs.writeFile(this.filePath, '');
  }

  startDeletionTimer() {
    this.deletionTimer = setTimeout(() => this.deleteTempFile(), 10000);
  }

  deleteTempFile() {
    if (existsSync(this.filePath)) {
        console.log('deleting temp file');
      unlinkSync(this.filePath);
    }
  }

  async reinstateFile() {
    clearTimeout(this.deletionTimer);
    await this.createTempFile();
    this.startDeletionTimer();
  }

  fileExists() {
    return existsSync(this.filePath);
  }
}



const isPlaying = async() => {
   let ret = false;
   if (temp) {
       ret = temp.fileExists();
    }
    return ret;
}

const setIsPlaying = async () => {
    temp = new TempFile();
    await temp.createTempFile();
    return temp;
}

const unsetIsPlaying = async () => {
    if (temp) {
        temp.deleteTempFile();
        temp = null;
    }
}


export { isPlaying, setIsPlaying, unsetIsPlaying };