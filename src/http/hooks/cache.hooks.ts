// Weather config
import { WeatherAppConfig as weatherConfig } from '@http/services';

// Types
import type { Handle } from '@sveltejs/kit';

// Logger
import { logger } from '@log';

// Redis
import { cache } from '@redis';

// Utils
import { getCacheKey } from '@utils';

// Weather cache
export const checkWeatherCacheHandler: Handle = async ({ event, resolve }) => {
	/**
	 * Return the cached weather data if they are in cache
	 * Otherwise forwards the request to endpoint
	 */

	// Weather api
	if (event.url.pathname.startsWith('/api/forecast')) {
		let lat = event.url.searchParams.get('lat');
		let lon = event.url.searchParams.get('lon');

		let cacheHash = {
			lat,
			lon
		};

		let key = getCacheKey(weatherConfig.CACHE_PREFIX, JSON.stringify(cacheHash));
		let cachedData = await cache.get(key);

		if (cachedData) {
			logger.info('Weather Cache data - OK');
			return new Response(cachedData);
		}
	}

	return await resolve(event);
};
