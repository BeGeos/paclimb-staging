// Logger
import { logger } from '@log';

/** @type {import('@sveltejs/kit').Handle} */
export async function logRequestsHandler({ event, resolve }) {
	/**
	 * Logging incoming requests
	 */
	let message = `${event.request.method} ${event.url.pathname}`;
	logger.info(message);

	return await resolve(event);
}

/** @type {import('@sveltejs/kit').Handle} */
export async function logRequestDetailsHandler({ event, resolve }) {
	/**
	 * Logging incoming request details
	 * TODO users and sessions will be added later
	 */

	logger.info(JSON.stringify(event));

	return await resolve(event);
}
