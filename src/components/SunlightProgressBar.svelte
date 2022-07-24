<script lang="ts">
	import { onMount } from 'svelte';

	// Types
	type SliderInput = {
		value?: number;
	};

	export let enabled: boolean;

	let sliderTrack: HTMLElement;
	let percentLower: number;
	let percentUpper: number;

	let minGap = 0;
	let sliderMaxValue = 24;
	let upperValue: number;
	let lowerValue: number;
	let upperSlider: HTMLInputElement | SliderInput = {};
	let lowerSlider: HTMLInputElement | SliderInput = {};

	const getPercentage = (value: number, maxValue: number = 24) => {
		return (value / maxValue) * 100;
	};

	const setUpperValue = (value: number) => {
		upperSlider.value = value;
	};

	const setLowerValue = (value: number) => {
		lowerSlider.value = value;
	};

	const fillColor = () => {
		percentUpper = getPercentage(upperSlider.value as number);
		percentLower = getPercentage(lowerSlider.value as number);

		// Add style to slider track
		sliderTrack.style.background = `linear-gradient(to right, var(--clr-dark-blue) ${percentLower}% , var(--clr-sun-yellow) ${percentLower}% , var(--clr-sun-yellow) ${percentUpper}%, var(--clr-dark-blue) ${percentUpper}%)`;
	};

	const handleUpperSlider = () => {
		if (+(upperSlider.value as number) - +(lowerSlider.value as number) <= minGap) {
			setUpperValue(+(lowerSlider.value as number) + minGap);
		}

		upperValue = upperSlider.value as number;
		fillColor();
	};

	const handleLowerSlider = () => {
		if (+(upperSlider.value as number) - +(lowerSlider.value as number) <= minGap) {
			setLowerValue(+(upperSlider.value as number) - minGap);
		}

		lowerValue = lowerSlider.value as number;
		fillColor();
	};

	export const resetSlider = () => {
		setTimeout(() => {
			setLowerValue(7);
			setUpperValue(19);

			upperValue = upperSlider.value as number;
			lowerValue = lowerSlider.value as number;

			fillColor();
		}, 5);
	};

	onMount(() => {
		handleLowerSlider();
		handleUpperSlider();
	});
</script>

<div class="opacity-40 pointer-events-none" class:enabled>
	<label for="hours-of-light" class="font-normal text-sm text-center block mt-4 mb-8"
		>Choose your interval of sunlight</label
	>
	<div class="relative min-w-full h-8 mb-4">
		<div class="absolute h-4 top-0 min-w-full rounded-full mx-auto" bind:this={sliderTrack} />
		<span class="absolute -top-6" style:left={`${percentLower}%`}
			>{lowerValue != upperValue ? lowerValue : ''}</span
		>
		<input
			type="range"
			min="0"
			max={sliderMaxValue}
			step="1"
			value="7"
			name="lower-suntime"
			class="absolute min-w-full top-0 h-4 mx-auto appearance-none bg-transparent pointer-events-none"
			disabled={!enabled}
			bind:this={lowerSlider}
			on:input={handleLowerSlider}
		/>
		<span class="absolute -top-6" style:left={`${percentUpper - 1}%`}>{upperValue}</span>
		<input
			type="range"
			min="0"
			max={sliderMaxValue}
			step="1"
			value="19"
			name="upper-suntime"
			class="absolute min-w-full top-0 h-4 mx-auto appearance-none bg-transparent pointer-events-none"
			disabled={!enabled}
			bind:this={upperSlider}
			on:input={handleUpperSlider}
		/>
	</div>
</div>

<style>
	.enabled {
		opacity: 1;
		pointer-events: all;
	}

	input[type='range']::-webkit-slider-thumb {
		-webkit-appearance: none;
		height: 1.7em;
		width: 1.7em;
		background-color: var(--clr-light-blue);
		cursor: pointer;
		/* margin-top: -9px; */
		pointer-events: auto;
		border-radius: 50%;
	}
	input[type='range']::-moz-range-thumb {
		-webkit-appearance: none;
		height: 1.7em;
		width: 1.7em;
		cursor: pointer;
		border-radius: 50%;
		background-color: var(--clr-light-blue);
		pointer-events: auto;
		border: none;
	}
	input[type='range']::-ms-thumb {
		appearance: none;
		height: 1.7em;
		width: 1.7em;
		cursor: pointer;
		border-radius: 50%;
		background-color: var(--clr-light-blue);
		pointer-events: auto;
	}
	input[type='range']:active::-webkit-slider-thumb {
		background-color: #ffffff;
		border: 1px solid var(--clr-light-blue);
	}
</style>
