import { createLogger, format, transports } from 'winston';
import { formatLogger } from './format';

const { combine, timestamp, json } = format;

export const prodLogger = () => {
	return createLogger({
		level: 'info',
		format: combine(timestamp(), formatLogger),
		transports: [
			new transports.Console()
			// TODO set stream transport - DataDog or else
			// new transports.File({ level: 'error', filename: 'logs/error.log', format: json() }),
			// new transports.File({ level: 'info', filename: 'logs/combined.log', format: json() })
		]
	});
};
