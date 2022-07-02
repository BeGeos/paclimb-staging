<script>
	import { onMount, createEventDispatcher } from 'svelte';

	// Font Awesome
	import Fa from 'svelte-fa/src/fa.svelte';
	import {
		faSun,
		faCar,
		faBook,
		faClipboardList,
		faRoute,
		faAngleUp,
		faCompass
	} from '@fortawesome/free-solid-svg-icons/index.es';

	// Components
	import CardLink from '@components/CardLink.svelte';
	import Dot from '@components/Dot.svelte';
	import Sunlight from '@components/Sunlight.svelte';

	// Utils
	import { convertAzimuthToLetter } from '@utils';
	import SunlightFilter from './SunlightFilter.svelte';

	export let data;

	let slider;
	let height;
	let active = false;
	let small = true;
	let medium = false;
	let large = false;
	let touchstartY = 0;
	let touchendY = 0;

	const dispatch = createEventDispatcher();

	const handleClose = () => {
		dispatch('closeCard');
	};

	// Utils functions
	const handleSwipe = () => {
		// Swipe up
		if (touchendY < touchstartY) {
			if (small) {
				small = false;
				medium = true;
				large = false;
			} else if (medium) {
				small = false;
				medium = false;
				large = true;
			} else return;
		}
		// Swipe down
		if (touchendY > touchstartY) {
			if (large) {
				large = false;
				medium = true;
				small = false;
			} else if (medium) {
				medium = false;
				small = true;
			} else return;
		}
	};

	active = true;

	$: props = data.properties;

	// Wall and guide details
	$: wall = props.falesia;
	$: sector = props.Settore != '-' ? props.Settore : wall;
	$: wallLink = props.link_wall;
	$: A51 = props.A51_wall != '-' ? props.A51_wall : null;
	$: pgVersante = props.VSud_wall != '-' ? props.VSud_wall : null;

	// Positions
	$: azimuth = convertAzimuthToLetter(props.azimut.toLowerCase());
	$: latitude = parseFloat(props.falesia_y).toFixed(3);
	$: longitude = parseFloat(props.falesia_x).toFixed(3);

	// Parking details
	$: parking = props.park1;
	$: parkingLink = props.park1_lk;
	$: park1_road = props.park1_road;
	$: park1_x = parseFloat(props.park1_x);
	$: park1_y = parseFloat(props.park1_y);
	$: parking2 = props.park2 != '-' ? props.park2 : null;
	$: parkingLink2 = props.park2_lk ? props.park2_lk : null;
	$: park2_road = props.park2_road;
	$: park2_x = parseFloat(props.park2_x);
	$: park2_y = parseFloat(props.park2_y);

	// Exposure details
	$: fall = props.fall;
	$: spring = props.spring;
	$: summer = props.summr;
	$: winter = props.winter;

	const resetCard = () => {
		active = !active;
		small = true;
		medium = false;
		large = false;
		height = '';
	};

	onMount(() => {
		slider.addEventListener(
			'touchstart',
			(e) => {
				touchstartY = e.changedTouches[0].screenY;
			},
			false
		);
		slider.addEventListener(
			'touchend',
			(e) => {
				touchendY = e.changedTouches[0].screenY;
				handleSwipe();
			},
			false
		);
	});
</script>

<div
	class="fixed max-h-full bottom-0 left-0 text-sm bg-white rounded-lg rounded-b-none shadow-xl flex flex-col gap-4 p-6 z-20 overscroll-contain lg:overflow-y-auto lg:rounded-b-lg lg:left-[60%] lg:bottom-[10%] lg:text-base card-container"
	class:active
	class:small
	class:medium
	class:large
	style:height
	id="card"
	bind:this={slider}
>
	<div
		class="min-w-full absolute top-0 left-0 flex items-center justify-center lg:hidden"
		id="slider"
	>
		<span id="card-caret-up">
			<Fa icon={faAngleUp} size="3x" color="rgba(0,0,0,0.3)" />
		</span>
	</div>
	<div class="flex justify-between items-center mt-4">
		<h3 class="uppercase font-Voltaire">{sector}</h3>
		<span
			class="text-4xl cursor-pointer lg:text-2xl"
			on:click={() => {
				resetCard();
				handleClose();
			}}>&times;</span
		>
	</div>
	<div class="flex justify-between">
		<h2 class="font-Voltaire">{wall}</h2>
	</div>
	<div class="flex gap-4 font-light items-center">
		<p class="m-0">Latitude: {latitude}˚</p>
		<p class="flex-1 m-0">Longitude: {longitude}˚</p>
		<div class="flex gap-2 items-center">
			<Fa icon={faCompass} />
			<p class="m-0 text-lg">{azimuth}</p>
		</div>
	</div>
	{#if parking}
		<div class="p-4 border rounded-lg border-black/40 flex flex-col gap-4" id="parking">
			<div class="flex gap-2 items-center">
				<Fa icon={faCar} />
				<h5>Parking</h5>
			</div>
			<div class="flex gap-4 items-center">
				<Dot road={park1_road} x={park1_x} y={park1_y} on:flyToPark />
				<p class="flex-1 font-light">{parking}</p>
				<CardLink link={parkingLink} text="to get there" icon={faRoute} />
			</div>
			{#if parking2}
				<div class="flex gap-4 items-center">
					<Dot road={park2_road} x={park2_x} y={park2_y} on:flyToPark />
					<p class="flex-1 font-light">{parking2}</p>
					<CardLink link={parkingLink2} text="to get there" icon={faRoute} />
				</div>
			{/if}
		</div>
	{/if}

	<div class="p-4 border rounded-lg border-black/40" id="guides">
		<div class="flex gap-2 items-center">
			<Fa icon={faBook} />
			<h5>Climbing Guides</h5>
		</div>
		<div class="flex font-light gap-4">
			{#if A51}
				<p class="flex-1">Finale 51©</p>
				<p>pag. {A51}</p>
			{/if}
		</div>
		<div class="flex font-light gap-4">
			{#if pgVersante}
				<p class="flex-1">Versante Sud©</p>
				<p>pag. {pgVersante}</p>
			{/if}
		</div>
	</div>

	<div class="p-4 border rounded-lg border-black/40 flex gap-4 items-center" id="routes">
		<div class="flex gap-2 items-center flex-1">
			<Fa icon={faClipboardList} />
			<h5>Routes and Grades</h5>
		</div>
		<CardLink link={wallLink} text="Google it!" />
	</div>

	<div
		class="p-4 border rounded-lg border-black/40 flex flex-col gap-4"
		id="sunlight"
		on:click={() => {
			small = false;
			medium = !medium;
			large = !large;
		}}
	>
		<div class="flex gap-2 items-center">
			<Fa icon={faSun} />
			<h5>Sunlight on the wall</h5>
		</div>
		<div class="flex flex-col gap-4" id="suntime-interval">
			<Sunlight fake={true} />
			<Sunlight period={fall} title="Autumn" />
			<Sunlight period={winter} title="Winter" />
			<Sunlight period={spring} title="Spring" />
			<Sunlight period={summer} title="Summer" />
		</div>
	</div>
</div>

<style>
	/* Global Styles */
	h2,
	h3,
	p {
		margin: 0;
		padding: 0;
	}
	.active {
		transform: scale(1);
		transition: all 0.2s ease;
		animation: slideIn 0.25s ease forwards;
	}

	.card-container {
		width: 100%;
		min-height: 25%;
	}

	/* Responsive Card Styles */
	.large > #slider::after {
		content: '';
		position: absolute;
		display: block;
		height: 0.375rem;
		width: 3rem;
		border-radius: 100vw;
		background-color: rgba(0, 0, 0, 0.3);
		margin: 0.3rem auto;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
	}

	.large #card-caret-up {
		display: none;
	}

	#slider::after {
		right: 49%;
		transform: rotate(-30deg);
	}

	.small {
		height: 25%;
	}

	.small #guides,
	.small #routes,
	.small #sunlight {
		opacity: 0;
		transition: opacity 0.25s ease-in-out;
	}

	#suntime-interval {
		display: none;
	}

	.medium #guides,
	.medium #parking,
	.medium #routes,
	.medium #sunlight {
		opacity: 1;
		transition: opacity 0.25s ease-in-out;
	}

	.large {
		overflow-y: auto;
		height: 100%;
	}

	.large #suntime-interval {
		display: flex;
	}

	@media (min-width: 1024px) {
		.card-container {
			width: min(90%, 25rem);
		}

		#card::after {
			display: none;
		}

		.small,
		.medium,
		.large {
			min-height: 20rem;
			height: auto;
			max-height: 38rem;
		}

		.small #guides,
		.medium #guides,
		.small #parking,
		.small #sunlight,
		.medium #parking,
		.small #routes,
		.medium #routes {
			display: block;
			opacity: 1;
			transform: scale(1);
		}

		.small #parking,
		.small #sunlight,
		.small #suntime-interval,
		.medium #parking,
		.medium #suntime-interval {
			display: flex;
		}
	}

	@keyframes slideIn {
		from {
			transform: translateY(100%);
		}
		to {
			transform: translateY(0%);
		}
	}
</style>
