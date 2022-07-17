import { format } from 'winston';

const { printf } = format;

export const formatLogger = printf(({ level, message, timestamp }) => {
	return `${timestamp} [${level.toUpperCase()}] - ${message}`;
});
