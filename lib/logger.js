import { createLogger, format, transports } from 'winston'
import nanoid from './nanoid.js'
import config from '../config.js'
import { makeDirectoryIfNeeded } from './file-shit.js'

const { combine, printf, timestamp } = format

const init = async () => {
    await makeDirectoryIfNeeded(config.logDir)
}
init()

const logger = createLogger({
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.printf(
            ({ level, message, timestamp }) =>
                `${timestamp} - ${level.toUpperCase()}: ${message}`
        )
    ),
    transports: [
        new transports.Console(),
        new transports.File({
            filename: `${config.logDir}/combined.log`,
        }),
    ],
})
function renderObjectAsString(obj, indent = 2) {
    let result = ''
    const spaces = ' '.repeat(indent)

    function render(obj, level) {
        for (const [key, value] of Object.entries(obj)) {
            const padding = ' '.repeat(level * indent)
            if (typeof value === 'object' && value !== null) {
                result += `${padding}${key}:\n`
                render(value, level + 1)
            } else {
                result += `${padding}${key}: ${value}\n`
            }
        }
    }

    render(obj, 0)
    return result
}
class Logger {
    constructor() {
        this.id = `#${nanoid()}`
    }
    log(message) {
        this.info(message)
    }
    defaultLog(level, message) {
        if (typeof message === 'object') {
            console.log('message:', message)
            message = renderObjectAsString(message)
        }
        let logMessage = this.makeMessage(message)
        logger.log(level, logMessage)
    }

    debug(message, crawlId = null) {
        this.defaultLog('debug', message)
    }

    error(message) {
        console.log(message.stack)
        this.defaultLog('error', message)
    }

    info(message) {
        this.defaultLog('info', message)
    }

    warn(message) {
        this.defaultLog('warn', message)
    }

    makeMessage(message) {
        return `${this.id}: ${message}`
    }
}
export default Logger
