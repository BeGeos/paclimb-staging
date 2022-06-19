// External libraries

import { http_200, http_500 } from '@http/status';

// Stores
import { weather } from '@stores/files/weatherMock.json';

// HTTP Weather Client
import { WeatherAPIClient } from '@http/services';

// Env
const env = import.meta.env.VITE_ENVIRONMENT;

const OPENWEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

export async function get({ request }) {
	let requestUrl = new URL(request.url);
	let lat = requestUrl.searchParams.get('lat');
	let lon = requestUrl.searchParams.get('lon');

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
				return {
					status: http_200.status,
					body: data
				};
			}

			// Fallback return if response status != 2**
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
		return {
			status: http_200.status,
			body: weather
		};
	}
}
