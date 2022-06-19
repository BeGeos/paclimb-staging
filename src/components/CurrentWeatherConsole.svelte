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
	<ConsoleWidget title="Rain" data={currentRain} extension="mm" />
	<ConsoleWidget title="Pressure" data={currentPressure} extension="hPa" />
	<ConsoleWidget title="Humidity" data={currentHumidity} extension="%" />
	<ConsoleWidget title="UVI" data={currentUVI} extension="" />
	<ConsoleWidget title="Wind Speed" data={currentWindSpeed} extension="m/s" />
	<ConsoleWidget title="Clouds" data={currentClouds} extension="%" />
</div>
