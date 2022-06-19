<script>
	// Components
	import ConsoleWidget from '@components/ConsoleWidget.svelte';

	export let currentRain;
	export let currentPressure;
	export let currentHumidity;
	export let currentUVI;
	export let currentWindSpeed;
	export let currentClouds;
</script>

<div class="grid gap-4 grid-cols-3 auto-rows-max font-normal text-xs lg:text-sm">
	<ConsoleWidget
		title="Rain"
		data={currentRain}
		extension="mm"
		param="rainAccu"
		on:openWeatherDetail
	/>
	<ConsoleWidget
		title="Pressure"
		data={currentPressure}
		extension="hPa"
		param="pressure"
		on:openWeatherDetail
	/>
	<ConsoleWidget
		title="Humidity"
		data={currentHumidity}
		extension="%"
		param="rh"
		on:openWeatherDetail
	/>
	<ConsoleWidget title="UVI" data={currentUVI} extension="" />
	<ConsoleWidget
		title="Wind Speed"
		data={currentWindSpeed}
		extension="m/s"
		param="wind"
		on:openWeatherDetail
	/>
	<ConsoleWidget
		title="Clouds"
		data={currentClouds}
		extension="%"
		param="clouds"
		on:openWeatherDetail
	/>
</div>
