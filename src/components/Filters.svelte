<script lang="ts">
	// External libraries
	import { isEqual } from 'lodash';

	// Font awesome
	import Fa from 'svelte-fa/src/fa.svelte';
	import { faArrowLeft, faSun, faMoon } from '@fortawesome/free-solid-svg-icons/index.es';

	import { createEventDispatcher, SvelteComponent } from 'svelte';
	import { fly } from 'svelte/transition';

	// Types
	import type { WallFilterResults } from '@types';

	// Import components
	import AreaFilter from '@components/AreaFilter.svelte';
	import SunlightFilter from '@components/SunlightFilter.svelte';
	import RadioSunlight from '@components/RadioSunlight.svelte';
	import FilterBox from '@components/FilterBox.svelte';
	import SunlightProgressBar from '@components/SunlightProgressBar.svelte';
	import ExposureFilter from '@components/ExposureFilter.svelte';
	import FilterResults from '@components/FilterResults.svelte';

	// Utils
	import { formatFilterFormData, digestFormData } from '@utils';

	// Stores
	import { falesie } from '@stores';

	const dispatch = createEventDispatcher();

	const handleClose = (e: MouseEvent | CustomEvent, toResults: boolean = false) => {
		dispatch('closeFilters');
		if (toResults) {
			return (appear = true);
		}
		return (appear = false);
	};

	export let active: boolean;

	let filterForm: HTMLFormElement;
	let sunlight: SvelteComponent;

	let exposureStar: string = './exposureStar.svg';
	let allSun: boolean = false;
	let allShadow: boolean = false;
	let appear: boolean = false;
	let filterHistory: object = {};
	let filteredData: { [key: string]: Array<{} | WallFilterResults> } = {};

	let submitCounter: number = 0;

	$: enabled = !allSun && !allShadow;

	const handleSubmit = (e: SubmitEvent) => {
		e.preventDefault();

		submitCounter++;

		let formData = new FormData(filterForm);
		let filters = formatFilterFormData(formData);

		// If the filters are identical to the one saved in store --> return
		let isSameFilter = isEqual(filters, filterHistory);
		if (!isSameFilter) {
			filterHistory = filters;
			filteredData = digestFormData($falesie, filters);
		}
		appear = true;
	};

	const handleFormReset = () => {
		allSun = false;
		allShadow = false;
		sunlight.resetSlider();
		submitCounter = 0;
	};
</script>

<div
	class="fixed inset-0 bg-white  shadow-lg -translate-x-full overflow-x-hidden transition-transform md:max-w-sm lg:max-h-full z-40"
	class:active
>
	{#if appear}
		<div
			class="overscroll-contain p-4 z-50 overflow-y-auto overflow-x-hidden absolute inset-0 bg-white shadow-lg"
			transition:fly={{ x: 500, duration: 200 }}
		>
			<FilterResults
				results={filteredData}
				on:flyFromResults
				on:closeFilterResults={() => (appear = false)}
				on:viewMap={(e) => {
					handleClose(e, true);
				}}
			/>
		</div>
	{/if}
	<div
		class="flex flex-col gap-2 overscroll-contain overflow-y-auto overflow-x-hidden p-4 absolute inset-0"
	>
		<div class="max-w-full flex justify-between items-center text-2xl lg:text-base">
			{#if submitCounter > 0}
				<p
					class="cursor-pointer decoration-dotted m-0 hover:underline text-sm lg:text-base"
					on:click={() => (appear = true)}
				>
					See results
				</p>
			{:else}
				<div class="flex-1" />
			{/if}
			<div on:click={handleClose} class="cursor-pointer">
				<Fa icon={faArrowLeft} />
			</div>
		</div>
		<form
			class="flex flex-col gap-4 flex-1 transition-opacity"
			on:submit={handleSubmit}
			bind:this={filterForm}
			on:reset={handleFormReset}
			class:hide={appear}
		>
			<FilterBox _id="area">
				<AreaFilter />
			</FilterBox>
			<FilterBox _id="sunlight-filter">
				<label for="sunlight" class="block">Sunlight on the wall</label>
				<div class="flex gap-2 text-sm" id="time-of-year">
					<SunlightFilter name="autumn" />
					<SunlightFilter name="winter" />
					<SunlightFilter name="spring" />
					<SunlightFilter name="summer" />
				</div>
				<div id="time-of-day" class="flex flex-col gap-2 text-sm">
					<div class="flex gap-2">
						<RadioSunlight
							icon={faSun}
							text="All day sun"
							checked={allSun}
							subtext="more than 8 hours of Sun"
							on:checkSunlight={() => {
								if (allSun) return (allSun = false);
								allSun = true;
								allShadow = false;
							}}
						/>
						<RadioSunlight
							icon={faMoon}
							text="All day shadow"
							checked={allShadow}
							subtext="no Sun all day"
							on:checkSunlight={() => {
								if (allShadow) return (allShadow = false);
								allSun = false;
								allShadow = true;
							}}
						/>
					</div>
					<SunlightProgressBar {enabled} bind:this={sunlight} />
				</div>
			</FilterBox>
			<FilterBox _id="exposure">
				<label for="exposure" class="block">Exposure</label>
				<div id="directions" class="relative block max-w-full w-60 mx-auto aspect-square">
					<img
						src={exposureStar}
						alt="star for exposure"
						class="absolute top-[50%] left-[50%] -translate-y-1/2 -translate-x-1/2"
					/>
					<ExposureFilter name="north" exposure="N" left="50%" translate="(-50%, 0%)" />
					<ExposureFilter name="north-east" exposure="NE" top="14%" right="32%" />
					<ExposureFilter name="east" exposure="E" top="50%" right="0%" translate="(-100%, -50%)" />
					<ExposureFilter
						name="south-east"
						exposure="SE"
						bottom="14%"
						right="32%"
						translate="(0%, -100%)"
					/>
					<ExposureFilter
						name="south"
						exposure="S"
						left="50%"
						bottom="0%"
						translate="(-50%, -100%)"
					/>
					<ExposureFilter
						name="south-west"
						exposure="SW"
						bottom="14%"
						left="32%"
						translate="(-100%, -100%)"
					/>
					<ExposureFilter name="west" exposure="W" top="50%" left="0%" translate="(0%, -50%)" />
					<ExposureFilter
						name="north-west"
						exposure="NW"
						top="14%"
						left="32%"
						translate="(-100%, 0%)"
					/>
				</div>
			</FilterBox>
			<div class="flex mt-auto gap-2">
				<button
					class="p-2 bg-sky-blue text-white rounded-md cursor-pointer flex-1 hover:-translate-y-1 transition-transform"
					>Apply Filters</button
				>
				<input
					class="p-2 rounded-md border border-black/40 cursor-pointer flex-1 hover:-translate-y-1 transition-transform"
					type="reset"
					value="Clear Filters"
				/>
			</div>
		</form>
	</div>
</div>

<style>
	.active {
		transform: translateX(0);
		transition: transform 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
	}

	.hide {
		z-index: -10;
		opacity: 0;
		transition: opacity 0.2s ease-in-out;
	}
</style>
