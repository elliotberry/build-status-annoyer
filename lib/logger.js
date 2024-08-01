import { createLogger, format, transports } from 'winston';
import nanoid from './nanoid.js';
import config from '../config.js';
import { makeDirectoryIfNeeded } from './file-shit.js';

const { combine, printf, timestamp } = format;

// Initialize logging directory asynchronously
(async () => {
    await makeDirectoryIfNeeded(config.logDir);
})();

const logger = createLogger({
    format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        printf(({ level, message, timestamp }) =>
            `${timestamp} - ${level.toUpperCase()}: ${message}`
        )
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: `${config.logDir}/combined.log` }),
    ],
});

function renderObjectAsString(obj, indent = 2) {
    const spaces = ' '.repeat(indent);

    function render(obj, level = 0) {
        return Object.entries(obj).map(([key, value]) => {
            const padding = ' '.repeat(level * indent);
            if (typeof value === 'object' && value !== null) {
                return `${padding}${key}:\n${render(value, level + 1)}`;
            }
            return `${padding}${key}: ${value}\n`;
        }).join('');
    }

    return render(obj);
}

class Logger {
    constructor() {
        this.id = `#${nanoid()}`;
    }

    log(message) {
        this.info(message);
    }

    defaultLog(level, message) {
        if (typeof message === 'object') {
            console.log('message:', message);
            message = renderObjectAsString(message);
        }
        logger.log(level, this.makeMessage(message));
    }

    debug(message) {
        this.defaultLog('debug', message);
    }

    error(message) {
        console.error(message.stack);
        this.defaultLog('error', message);
    }

    info(message) {
        this.defaultLog('info', message);
    }

    warn(message) {
        this.defaultLog('warn', message);
    }

    makeMessage(message) {
        return `${this.id}: ${message}`;
    }
}

export default Logger;
