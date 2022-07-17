import { createLogger, format, transports } from 'winston';
import { formatLogger } from './format';

const { combine, timestamp } = format;

export const devLogger = () => {
	return createLogger({
		level: 'debug',
		format: combine(timestamp(), formatLogger),
		transports: [new transports.Console()]
	});
};
