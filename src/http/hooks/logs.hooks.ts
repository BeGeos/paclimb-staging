// Logger
import { logger } from '@log';

import type { Handle } from '@sveltejs/kit';

export const logRequestsHandler: Handle = async ({ event, resolve }) => {
	/**
	 * Logging incoming requests
	 */
	let message = `${event.request.method} ${event.url.pathname}`;
	logger.info(message);

	return await resolve(event);
};

export const logRequestDetailsHandler: Handle = async ({ event, resolve }) => {
	/**
	 * Logging incoming request details
	 * TODO users and sessions will be added later
	 */

	logger.info(JSON.stringify(event));

	return await resolve(event);
};
