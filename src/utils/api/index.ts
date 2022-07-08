import type { ApiError } from '@types';
import type { WeatherOneCallData } from '@types';

export const fetchWeather = async (lat: number, lon: number) => {
	let url: string = lat && lon ? `/api/forecast?lat=${lat}&lon=${lon}` : '/api/forecast';
	const response: Response = await fetch(url);
	const data: WeatherOneCallData & ApiError = await response.json();

	if (response.ok) {
		return {
			status: response.status,
			data: data
		};
	}

	return {
		status: response.status,
		error: new Error(data.error)
	};
};
