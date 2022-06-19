// HTTP Status
import { http_200, http_500 } from '@http/status';

// Stores
import { weather } from '@stores/files/weatherMock.json';

// HTTP Weather Client
import { WeatherAPIClient } from '@http/services';

// Logger
import { logger } from '@log';

// Env
const env = import.meta.env.VITE_ENVIRONMENT;

const OPENWEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

export async function get({ request, url }) {
	let reqMessage = `${request.method} ${url.pathname}`;
	logger.info(reqMessage);

	let lat = url.searchParams.get('lat');
	let lon = url.searchParams.get('lon');

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
		} catch (err) {
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
}
