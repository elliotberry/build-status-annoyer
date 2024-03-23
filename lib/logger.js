import { createLogger, format, transports } from 'winston'
import { makeDirIfNeeded } from './file-shit.js'
import config from '../config.js'

const { combine, timestamp, printf } = format

const init = async () => {
    await makeDirIfNeeded(config.logDir)
}
init()

const logger = createLogger({
    format: combine(
        timestamp({
            format: 'YYYY-MM-DD hh:mm:ss A',
        }),
        printf(
            (info) => `${info.timestamp} ${info.level}: ${info.message}`
        )
    ),
    transports: [
        new transports.Console(),
        new transports.File({
            filename: `${config.logDir}/combined.log`,
        }),
    ],
})

export default logger
