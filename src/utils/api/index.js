export const fetchWeather = async (lat, lon) => {
	let url = lat && lon ? `/api/forecast?lat=${lat}&lon=${lon}` : '/api/forecast';
	const response = await fetch(url);
	const data = await response.json();

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
