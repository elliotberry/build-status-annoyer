import { exec as execCallback } from 'child_process'

function execution(command) {
    return new Promise(function (resolve, reject) {
        execCallback(command, (error, stdout, stderr) => {
            if (error) {
                reject(error)
                return
            }
            if (stderr) {
                reject(stderr)
                return
            }

            resolve(stdout.trim())
        })
    })
}

export default execution
