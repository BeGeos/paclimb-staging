<script>
	export let active;
	export let location;
	export let lat;
	export let lon;

	import { createEventDispatcher, onMount } from 'svelte';

	// Utils
	import { formatUnixDate, getTimezoneDate } from '@utils';
	import { fetchWeather } from '@utils/api';

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

	let weather = false;
	let error;

	let iconUrl = import.meta.env.VITE_OPENWEATHER_ICON_URL;

	let currentDate;
	let timezoneOffset;
	let adjustedDate;
	let day;
	let weekDay;
	let hour;
	let currentTemp;
	let currentMainWeather;
	let currentMainIcon;
	let currentPressure;
	let currentHumidity;
	let currentUVI;
	let currentClouds;
	let currentWindSpeed;
	let currentRain;
	let weatherHourlyForecast = [];

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

	onMount(() => {
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
	class="fixed top-14 p-4 flex flex-col gap-4 left-[5%] min-h-fit bg-white max-w-[90%] rounded-lg shadow-lg -translate-x-[110%] overflow-x-hidden transition-transform md:left-3 md:mx-0 md:max-w-md z-40"
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
				/>
			</div>
		</div>
		<!-- Weather forecast -->
		<div class="flex gap-6 max-w-full overflow-auto overscroll-contain">
			{#each weatherHourlyForecast as hourForecast}
				<ForecastCard
					temp={hourForecast.temp}
					dt={getTimezoneDate(hourForecast.dt, timezoneOffset)}
					iconUrl={`${iconUrl}${hourForecast.weather[0].icon}.png`}
					altText={hourForecast.weather.description}
					rainProbability={hourForecast.pop}
				/>
			{/each}
		</div>
	{/if}
	<!-- Weather API reference -->
	<div>
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
