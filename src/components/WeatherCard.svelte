<script lang="ts">
	export let active: boolean;
	export let location: string;
	export let lat: number;
	export let lon: number;

	import { createEventDispatcher, onMount } from 'svelte';

	// Utils
	import { formatUnixDate, getTimezoneDate } from '@utils';
	import { fetchWeather } from '@utils/api';

	// Types
	import type { WeatherOneCallData, WeatherHourlyData } from '@types';

	// Font awesome
	import Fa from 'svelte-fa/src/fa.svelte';
	import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/index.es';

	// Components
	import CurrentWeatherConsole from '@components/CurrentWeatherConsole.svelte';
	import ForecastCard from '@components/ForecastCard.svelte';

	const dispatch = createEventDispatcher();

	const handleClose = () => {
		dispatch('closeWeather');
	};

	let weather: WeatherOneCallData | undefined;
	let error: string;

	let iconUrl = import.meta.env.VITE_OPENWEATHER_ICON_URL as string;

	let currentDate: number;
	let timezoneOffset: number;
	let adjustedDate: number;
	let day: string | number;
	let weekDay: string | number;
	let hour: string | number;
	let currentTemp: number;
	let currentMainWeather: string;
	let currentMainIcon: string;
	let currentPressure: number;
	let currentHumidity: number;
	let currentUVI: number;
	let currentClouds: number;
	let currentWindSpeed: number;
	let currentRain: number | string | undefined;
	let weatherHourlyForecast: WeatherHourlyData[];

	$: if (weather) {
		// Format JSON response for time/date
		currentDate = weather.current.dt;
		timezoneOffset = weather.timezone_offset;

		// Populate variables for current weather card
		adjustedDate = getTimezoneDate(currentDate, timezoneOffset);
		[day, weekDay, hour] = formatUnixDate(adjustedDate);
		currentTemp = Math.floor(weather.current.temp);
		currentMainWeather = weather.current.weather[0].main;
		currentMainIcon = weather.current.weather[0].icon;
		currentPressure = weather.current.pressure;
		currentHumidity = weather.current.humidity;
		currentUVI = weather.current.uvi;
		currentClouds = weather.current.clouds;
		currentWindSpeed = weather.current.wind_speed;
		currentRain = weather.current.rain ? weather.current.rain['1h'] : '-';

		// Forecast 48h
		weatherHourlyForecast = weather.hourly;
	}

	onMount(async () => {
		// TODO use the load function when the page is loaded - keep async
		fetchWeather(lat, lon)
			.then((data) => {
				if (data.status === 200) {
					weather = data.data;
				}
			})
			.catch((err) => (error = err));
	});
</script>

<div
	class="fixed inset-0 p-4 flex flex-col gap-4 min-h-full bg-white rounded-lg shadow-lg -translate-x-[110%] overflow-x-hidden transition-transform md:top-14 md:min-h-fit md:left-3 md:mx-0 md:max-w-md z-40"
	class:active
>
	<!-- Action header -->
	<div class="max-w-full flex gap-4 justify-between items-center text-2xl lg:text-base">
		<h2 class="text-lg m-0">Weather</h2>
		<div on:click={handleClose} class="cursor-pointer">
			<Fa icon={faArrowLeft} />
		</div>
	</div>
	{#if !weather}
		<!-- Fallback no result -->
		<div>
			<h3 class="m-6 text-sm font-normal">{error || 'No Weather Data'}</h3>
		</div>
	{:else}
		<!-- Current weather -->
		<div class="max-w-full">
			<div class="flex justify-between items-center text-2xl">
				<p class="m-0">{location}</p>
				<p class="m-0">{weekDay} {day}</p>
			</div>
			<div class="flex gap-2 mt-4">
				<div>
					<p class="text-4xl lg:text-5xl font-bold m-0">{currentTemp}°</p>
					<div class="flex items-center justify-center">
						<p class="text-xs font-light m-0">
							{currentMainWeather}
						</p>
						<img src={`${iconUrl}${currentMainIcon}.png`} alt="main weather icon" />
					</div>
				</div>
				<CurrentWeatherConsole
					{currentRain}
					{currentPressure}
					{currentHumidity}
					{currentUVI}
					{currentWindSpeed}
					{currentClouds}
					on:openWeatherDetail
				/>
			</div>
		</div>
		<!-- Weather forecast -->
		<div class="flex max-w-full overflow-auto overscroll-contain">
			{#each weatherHourlyForecast as hourForecast}
				<ForecastCard
					temp={hourForecast.temp}
					dt={getTimezoneDate(hourForecast.dt, timezoneOffset)}
					iconUrl={`${iconUrl}${hourForecast.weather[0].icon}.png`}
					altText={hourForecast.weather[0].description}
					rainProbability={hourForecast.pop}
				/>
			{/each}
		</div>
	{/if}
	<!-- Weather API reference -->
	<div class="mt-auto">
		<p class="my-0 text-xs text-center font-light">
			Weather data from <a
				href="https://openweathermap.org/"
				rel="noopener noreferrer"
				target="_blank"
				class="underline hover:decoration-dotted">OpenWeatherMap</a
			>
		</p>
	</div>
</div>

<style>
	.active {
		transform: translateX(0);
		transition: transform 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
	}
</style>
