// External libs
import 'dotenv/config';

// HTTP Status
import { http_200, http_500 } from '@http/status';

// Stores
import { weather } from '@stores/files/weatherMock.json';

// Weather App
import { WeatherAPIClient, WeatherAppConfig as weatherConfig } from '@http/services';

// Logger
import { logger } from '@log';

// Redis Cache
import { cache } from '@redis';

// Utils
import { getCacheKey } from '@utils';

// Types
import type { RequestHandler } from '@sveltejs/kit';

// Env
const env = import.meta.env.VITE_ENVIRONMENT as string;

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY as string;

export const get: RequestHandler = async ({ url }) => {
	let lat = url.searchParams.get('lat');
	let lon = url.searchParams.get('lon');

	// Generate the key for the cache
	let cacheKey = getCacheKey(
		weatherConfig.CACHE_PREFIX,
		JSON.stringify({
			lat,
			lon
		})
	);

	let client = new WeatherAPIClient(OPENWEATHER_API_KEY, {
		exclude: 'daily,minutely',
		lat: lat,
		lon: lon,
		units: 'metric'
	});

	if (env === 'prod') {
		try {
			let response = await client.get();
			let data = await response.json();

			if (response.ok) {
				cache.set(cacheKey, JSON.stringify(data), 'ex', weatherConfig.CACHE_TTL);

				logger.info('Weather api request - OK');
				return {
					status: http_200.status,
					body: data
				};
			}

			// Fallback return if response status != 2**
			logger.warn(`Weather api request - ${response.statusText}`);
			return {
				status: http_500.status,
				body: {
					error: {
						status: response.status,
						text: response.statusText
					}
				}
			};
		} catch (err: any) {
			logger.error(new Error(err.stack));
			return {
				status: http_500,
				body: {
					error: {
						status: http_500.status,
						text: http_500.text
					}
				}
			};
		}
	} else if (env === 'dev') {
		logger.debug('Mock weather data request');
		return {
			status: http_200.status,
			body: weather
		};
	}
};
