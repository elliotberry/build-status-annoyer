import { createLogger, format, transports } from 'winston'
import { exists, makeDirIfNeeded } from './file-shit.js'
import config from './config.js'
import fs from 'fs/promises'


const { combine, timestamp, label, printf } = format


const init = async () => {
    await makeDirIfNeeded(config.logDir)
}
init()

const logger = createLogger({
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD hh:mm:ss A'
    }),
    format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
    transports: [
        new transports.Console(),
        new transports.File({
            filename: `${config.logDir}/combined.log`,
        }),
    ],
})

export default logger