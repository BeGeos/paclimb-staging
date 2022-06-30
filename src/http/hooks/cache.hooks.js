// Weather config
import { WeatherAppConfig as weatherConfig } from '@http/services';

// Logger
import { logger } from '@log';

// Redis
import { cache } from '@redis';

// Utils
import { getCacheKey } from '@utils';

export const checkWeatherCacheHandler = async (event) => {
	/**
	 * Handlers have handled as boolean to say if the task was handled
	 * and response which is whatever is returned by the handling
	 */

	let handled = false;
	let response = {};

	let lat = event.url.searchParams.get('lat');
	let lon = event.url.searchParams.get('lon');

	let cacheHash = {
		lat,
		lon
	};

	let key = getCacheKey(weatherConfig.CACHE_PREFIX, JSON.stringify(cacheHash));
	let data = await cache.get(key);

	if (data) {
		handled = true;
		response = data;
		logger.info('Weather Cache data - OK');
	}

	return { handled, response };
};
