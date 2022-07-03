// External libs
import 'dotenv/config';

// HTTP client for the weather app OpenWeatherMap

export class WeatherAPIClient {
	apiBaseUrl = process.env.OPENWEATHER_ONE_CALL_URL;

	constructor(apiKey, options = {}) {
		this.apiKey = apiKey;
		this.options = options;
		this.headers = this.buildRequestHeaders();
	}

	buildRequestSearchParams() {
		let searchItems = [`appid=${this.apiKey}`]; // Init apiKey in URL
		for (const [k, v] of Object.entries(this.options)) {
			searchItems.push(`${k}=${v}`);
		}

		return searchItems.join('&');
	}

	buildRequestUrl() {
		let url = new URL(this.apiBaseUrl);
		let params = this.buildRequestSearchParams();
		url.search = new URLSearchParams(params);
		return url;
	}

	buildRequestHeaders() {
		return new Headers({
			'Content-Type': 'application/json'
		});
	}

	async get() {
		// Client GET method

		let url = this.buildRequestUrl();
		let request = new Request(url, {
			method: 'GET',
			mode: 'cors',
			cache: 'default',
			headers: this.headers
		});

		try {
			return await fetch(request);
		} catch (err) {
			throw new Error(err.message);
		}
	}
}
