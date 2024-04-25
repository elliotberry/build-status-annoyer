import { createLogger, format, transports } from 'winston'

import config from '../config.js'
import { makeDirectoryIfNeeded } from './file-shit.js'

const { combine, printf, timestamp } = format

const init = async () => {
    await makeDirectoryIfNeeded(config.logDir)
}
init()

const logger = createLogger({
    format: combine(
        timestamp({
            format: 'YYYY-MM-DD hh:mm:ss A',
        }),
        printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
    ),
    transports: [
        new transports.Console(),
        new transports.File({
            filename: `${config.logDir}/combined.log`,
        }),
    ],
})

export default logger
