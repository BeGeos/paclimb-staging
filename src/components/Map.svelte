<script lang="ts">
	// Svelte dependencies
	import { createEventDispatcher } from 'svelte';
	import { onDestroy, onMount } from 'svelte';
	// export let mapImage = '../../static/images/backgroundMap.png';

	let dispatch = createEventDispatcher();

	// Font Awesome
	import Fa from 'svelte-fa/src/fa.svelte';
	import { faArrowLeft, faFilter, faCloudSun } from '@fortawesome/free-solid-svg-icons/index.es';

	// Components
	import Card from '@components/Card.svelte';
	import Popup from '@components/Popup.svelte';
	import Dashboard from '@components/Dashboard.svelte';
	import Filters from '@components/Filters.svelte';
	import WeatherCard from '@components/WeatherCard.svelte';
	import Windy from '@components/WindyEmbeds.svelte';

	// Stores
	import { falesie, parkings, sectors } from '@stores';

	// JS utils and functions
	import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
	import { mapbox, MapboxGeocoder, addCursorToLayers, addFlytTo } from '@utils/mapbox';
	import { convertAzimuthFromTextToInt } from '@utils';

	// types
	import type { Map, NavigationControl, GeolocateControl, MapMouseEvent } from 'mapbox-gl';
	import type { WallsData, ParkingsData, SectorsData } from '@types';

	// Import bounding boxes - for now just Finale Ligure
	import { FINALE_LIGURE_BBOX, FINALE_LIGURE_MAX_BOUNDS } from '@utils/mapbox';

	// Global variables
	let BASE_STYLE_URL = import.meta.env.VITE_MAPBOX_BASE_STYLE_URL as string;
	let SATELLITE_ID = import.meta.env.VITE_MAPBOX_SATELLITE_ID as string;
	let OUTDOOR_ID = import.meta.env.VITE_MAPBOX_OUTDOOR_ID as string;

	// External variables
	export let lat: number;
	export let lon: number;
	export let zoom: number;
	export let pitch: number;
	export let bearing: number;
	export let visible: boolean;

	// Internal variables
	let container: HTMLElement;
	let map: Map;
	let navigationControl: NavigationControl;
	let geolocateControl: GeolocateControl;
	let geocoder: MapboxGeocoder;
	let dataWalls: WallsData;
	let geocoderContainer: HTMLElement;
	let roadName: string;
	let featureName: string;
	let featureLink: string;
	let windyParam: string;
	let windowWidth: number;

	let x = 0;
	let y = 0;
	let style = `${BASE_STYLE_URL}/${SATELLITE_ID}`;
	let outdoor = false;
	let satellite = true;
	let show = false;
	let cardVisible = false;
	let filterActive = false;
	let weatherActive = false;
	let openWindy = false;
	let defaultBearing = -19.18;

	type MatchingFeatures = Array<WallsData | ParkingsData | SectorsData>;

	const returnHome = () => {
		closeWallCard();
		closePopup();

		dispatch('returnHome');
	};

	const closePopup = () => {
		show = false;
	};

	const openPopup = () => {
		show = true;
	};

	const closeWallCard = () => {
		cardVisible = false;
	};

	const openWallCard = () => {
		cardVisible = true;
	};

	const addEventFalesie = (map: Map) => {
		map.on('click', 'falesieetichetta5', (e: MapMouseEvent) => {
			dataWalls = e.features[0];
			let wallX = parseFloat(dataWalls.properties.falesia_x);
			let wallY = parseFloat(dataWalls.properties.falesia_y);
			let azimuth = dataWalls.properties.azimut;

			closePopup();
			openWallCard();
			flyToWallBestView(map, wallX, wallY, azimuth);
		});
	};

	const addPopupOnClick = (map: Map, layer: string) => {
		map.on('click', layer, (e: MapMouseEvent) => {
			let feature = e.features[0];
			roadName = feature.properties.ClimbRoad;
			featureName = feature.properties.nome_cpark
				? feature.properties.nome_cpark
				: feature.layer.id;
			featureLink = feature.properties.GoogleLink
				? feature.properties.GoogleLink
				: feature.properties.Googl;
			x = e.point.x;
			y = e.point.y;
			closeWallCard();
			openPopup();
		});
	};

	const addClosePopup = (map: Map) => {
		container.addEventListener('pointerdown', () => {
			if (show) return (show = false);
		});
	};

	const flyToPark = (map: Map, x: number, y: number) => {
		map.flyTo({
			center: [x, y],
			bearing: 0,
			speed: 0.35,
			curve: 1
		});
	};

	const flyToWallBestView = (map: Map, x: number, y: number, azimuth: string) => {
		let localAzimuth = convertAzimuthFromTextToInt(azimuth.toLowerCase());
		let localBearing: number;

		if (!azimuth || localAzimuth == undefined) {
			localBearing = defaultBearing;
		} else {
			localBearing = localAzimuth + 180 > 360 ? localAzimuth - 180 : localAzimuth + 180;
		}
		map.flyTo({
			center: [x, y],
			bearing: localBearing,
			speed: 0.35,
			curve: 1,
			zoom: 16
		});

		if (window.innerWidth < 1024) {
			filterActive = false;
		}
	};

	const handleMapboxSearch = (e) => {
		const { properties, place_type } = e.result;

		if (place_type.includes('crag')) {
			dataWalls = { properties };
			cardVisible = true;
		}
		return;
	};

	const forwardGeocoder = (query: string) => {
		const matchingFeatures: MatchingFeatures = [];
		for (const feature of $falesie) {
			// Handle queries with different capitalization
			// than the source data by calling toLowerCase().
			if (feature.properties.falesia.toLowerCase().includes(query.toLowerCase())) {
				feature['place_name'] = `🧗‍♀️ ${feature.properties.falesia}`;
				feature['center'] = [feature.properties.falesia_x, feature.properties.falesia_y];
				feature['place_type'] = ['crag'];
				matchingFeatures.push(feature);
			}
		}

		for (const feature of $parkings) {
			if (
				feature.properties['nome_cpark'].toLowerCase().includes(query.toLowerCase()) ||
				query.toLowerCase().includes('park')
			) {
				feature['place_name'] = `🚘 ${feature.properties['nome_cpark']}`;
				feature['center'] = [feature.properties.x, feature.properties.y];
				feature['place_type'] = ['parking'];
				matchingFeatures.push(feature);
			}
		}

		for (const feature of $sectors) {
			if (
				feature.properties.Settore.toLowerCase().includes(query.toLowerCase()) ||
				query.toLowerCase().includes('sector')
			) {
				feature['place_name'] = `⛰ ${feature.properties.Settore}`;
				feature['center'] = [feature.properties.x, feature.properties.y];
				feature['feature'] = ['mountain'];
				matchingFeatures.push(feature);
			}
		}
		return matchingFeatures;
	};

	// Map logic
	const createMap = async () => {
		// Add map
		map = new mapbox.Map({
			container,
			style,
			center: [lon, lat],
			zoom,
			pitch,
			bearing
		});

		// Introducing controls
		navigationControl = new mapbox.NavigationControl();
		// fullScreenControl = new mapbox.FullscreenControl();
		geolocateControl = new mapbox.GeolocateControl({
			positionOptions: {
				enableHighAccuracy: true
			},
			// When active the map will receive updates to the device's location as it changes.
			trackUserLocation: true,
			// Draw an arrow next to the location dot to indicate which direction the device is heading.
			showUserHeading: true
		});

		geocoder = new MapboxGeocoder({
			accessToken: import.meta.env.VITE_MAPBOX_ACCESS_TOKEN as string,
			placeholder: 'Search the crags...',
			localGeocoder: forwardGeocoder,
			bbox: FINALE_LIGURE_BBOX,
			zoom: 15,
			mapboxgl: mapbox
		});

		geocoder.on('result', handleMapboxSearch);

		// Set max boundries for zoom in/out of map
		map.setMaxBounds(FINALE_LIGURE_MAX_BOUNDS);

		// closeCardWhenDrag(map);
		addClosePopup(map);

		// Adding event on click for popups
		addEventFalesie(map);

		// Change layer cursor when hover
		addCursorToLayers(map, 'falesieetichetta5');
		addCursorToLayers(map, 'castel_finalborgo');
		addCursorToLayers(map, 'park');
		addCursorToLayers(map, 'park_etichette');
		addCursorToLayers(map, 'settoribiglabel');

		// Add animation to fly to location when clicked on layer
		addFlytTo(map, 'settoribiglabel');

		// Add popups to layers
		addPopupOnClick(map, 'castel_finalborgo');
		addPopupOnClick(map, 'park');
		addPopupOnClick(map, 'park_etichette');
	};

	const addControls = () => {
		// Add geolocate control on map
		if (map) {
			// Add the control to the map.
			// map.addControl(fullScreenControl);
			map.addControl(navigationControl);
			map.addControl(geolocateControl);
			geocoderContainer.appendChild(geocoder.onAdd(map));
		}
	};

	const removeControls = () => {
		if (geolocateControl && navigationControl && geocoder) {
			// Remove controls
			map.removeControl(geolocateControl);
			// map.removeControl(fullScreenControl);
			map.removeControl(navigationControl);
			map.removeControl(geocoder);
		}
	};

	const changeStyle = (option: string) => {
		outdoor = !outdoor;
		satellite = !satellite;
		if (option === 'satellite') {
			return map.setStyle(`${BASE_STYLE_URL}/${SATELLITE_ID}`);
		}

		if (option === 'outdoor') {
			return map.setStyle(`${BASE_STYLE_URL}/${OUTDOOR_ID}`);
		}
	};

	const handleWeatherDetails = (e: CustomEvent) => {
		windyParam = e.detail.param;
		openWindy = true;
	};

	const handleCloseWindy = () => {
		openWindy = false;
	};

	onMount(() => {
		createMap();
	});

	onDestroy(() => {
		if (map) map.remove();
	});

	// Reactive variables
	$: {
		if (visible) {
			addControls();
		} else {
			removeControls();
		}
	}
</script>

<svelte:window bind:outerWidth={windowWidth} />

<div
	class="fixed inset-0 max-h-screen max-w-[100vw] bg-white -z-20 overflow-hidden overscroll-contain"
	class:isForeground={visible}
>
	<Dashboard {visible}>
		<div class="absolute top-[10px] left-[10px] flex flex-col gap-4">
			<button
				class="p-2 rounded-md bg-white shadow-lg flex items-center justify-center"
				on:click={() => {
					if (windowWidth <= 1024) {
						// The card closes only on mobile when opening filters/weather
						cardVisible = false;
					}
					closePopup();
					weatherActive = false;
					filterActive = true;
				}}
			>
				<Fa icon={faFilter} />
			</button>
			<button
				class="p-2 rounded-md bg-white shadow-lg flex items-center justify-center"
				on:click={() => {
					if (windowWidth <= 1024) {
						// The card closes only on mobile when opening filters/weather
						cardVisible = false;
					}
					closePopup();
					filterActive = false;
					weatherActive = true;
				}}
			>
				<Fa icon={faCloudSun} />
			</button>
		</div>
		<div class="absolute bottom-10 left-5" class:light={satellite} class:dark={outdoor}>
			<button class="py-2 px-4" class:active={satellite} on:click={() => changeStyle('satellite')}
				>Satellite</button
			>
			<button class="py-2 px-4" class:active={outdoor} on:click={() => changeStyle('outdoor')}
				>Outdoor</button
			>
		</div>
		<div class="absolute bottom-10 right-5" class:light={satellite} class:dark={outdoor}>
			<button class="flex items-center gap-4 text-2xl md:text-base" on:click={returnHome}>
				<Fa icon={faArrowLeft} />
				<span class="hidden md:block">Return Home</span>
			</button>
		</div>
		<Filters
			active={filterActive}
			on:closeFilters={() => (filterActive = false)}
			on:flyFromResults={(e) => {
				dataWalls = e.detail.self;
				flyToWallBestView(map, e.detail.x, e.detail.y, e.detail.azimuth);
				cardVisible = true;
			}}
		/>
		<WeatherCard
			active={weatherActive}
			location="Finale Ligure"
			{lat}
			{lon}
			on:closeWeather={() => (weatherActive = false)}
			on:openWeatherDetail={handleWeatherDetails}
		/>
		{#if openWindy}
			<Windy {lat} {lon} detail={windyParam} on:closeWindy={handleCloseWindy} />
		{/if}
	</Dashboard>
	<div bind:this={container} class="absolute inset-0 -z-10">
		{#if map}
			<div
				id="geocoder"
				class="absolute left-[50%] top-5 -translate-x-2/4"
				bind:this={geocoderContainer}
			/>
			<slot />
		{/if}
	</div>
</div>

{#if cardVisible}
	<Card
		data={dataWalls}
		on:flyToPark={(e) => {
			let x = e.detail.x;
			let y = e.detail.y;
			flyToPark(map, x, y);
		}}
		on:closeCard={closeWallCard}
	/>
{/if}
<Popup {roadName} {featureName} {featureLink} {show} handleClose={closePopup} />

<style>
	.active {
		background-color: var(--clr-primary);
		border-radius: 0.5rem;
		border: none;
		color: white;
		box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
	}

	.isForeground {
		z-index: 20;
	}

	.light {
		color: white;
	}

	.dark {
		color: black;
	}
</style>
