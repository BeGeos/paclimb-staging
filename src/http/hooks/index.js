// Logger
import { logger } from '@log';

// Handlers
import { checkWeatherCacheHandler } from '@hooks/cache.hooks';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	let message = `${event.request.method} ${event.url.pathname}`;
	logger.info(message);

	// Weather api
	if (event.url.pathname.startsWith('/api/forecast')) {
		let { handled, response } = await checkWeatherCacheHandler(event);

		if (handled) return new Response(response);
	}

	const response = await resolve(event);
	return response;
}
