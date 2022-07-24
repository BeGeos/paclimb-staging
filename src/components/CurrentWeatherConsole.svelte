<script lang="ts">
	// Components
	import ConsoleWidget from '@components/ConsoleWidget.svelte';

	// Types
	type ConsoleData = string | number;

	export let currentRain: ConsoleData = '-';
	export let currentPressure: ConsoleData = '-';
	export let currentHumidity: ConsoleData = '-';
	export let currentUVI: ConsoleData = '-';
	export let currentWindSpeed: ConsoleData = '-';
	export let currentClouds: ConsoleData = '-';
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
	<ConsoleWidget
		title="UVI"
		data={currentUVI}
		extension=""
		param=""
		selectable={false}
		threshold={true}
	/>
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
