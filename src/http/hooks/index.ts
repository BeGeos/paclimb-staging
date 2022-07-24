import { sequence } from '@sveltejs/kit/hooks';

// Internal
import { logger } from '@log';

// Logger Middleware
import { logRequestDetailsHandler } from '@hooks/logs.hooks';
import { logRequestsHandler } from '@hooks/logs.hooks';

// Cache Middlewares
import { checkWeatherCacheHandler } from '@hooks/cache.hooks';
import type { HandleError } from '@sveltejs/kit';

// Middlewares - from first to last
export const handle = sequence(
	logRequestsHandler,
	logRequestDetailsHandler,
	checkWeatherCacheHandler
);

/** @type {import('@sveltejs/kit').HandleError} */
export const handleError: HandleError = ({ error, event }) => {
	logger.debug(JSON.stringify(event));
	logger.error(error);
};
