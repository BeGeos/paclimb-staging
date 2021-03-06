// Import libraries
import type { FilterForm } from '@types';
import MD5 from 'crypto-js/md5.js';

// Types
import type { Feature } from 'geojson';
import type { WallFilterResults, SectorsData } from '@types';

interface AzimuthMapper {
	north: string | number;
	'north-east': string | number;
	east: string | number;
	'south-east': string | number;
	south: string | number;
	'south-west': string | number;
	west: string | number;
	'north-west': string | number;
	[key: string]: string | number;
}

// Global variables
const AZIMUTH: AzimuthMapper = {
	north: 'North',
	'north-east': 'Northeast',
	east: 'East',
	'south-east': 'Southeast',
	south: 'South',
	'south-west': 'Southwest',
	west: 'West',
	'north-west': 'Northwest'
};

const MIN_HOUR_OF_SUNLIGHT: number = 8;
const MAX_HOUR_OF_SUNLIGHT: number = 16;

export const parseTimeInterval = (interval: string): number[] => {
	if (interval === '-') return [];
	return interval.split('-').map((v) => parseInt(v));
};

export const convertAzimuthToLetter = (azimuth: string) => {
	let mapper: { [key: string]: string } = {
		north: 'N',
		northeast: 'NE',
		east: 'E',
		southeast: 'SE',
		south: 'S',
		southwest: 'SW',
		west: 'W',
		northwest: 'NW'
	};

	return mapper[azimuth];
};

export const convertAzimuthFromTextToInt = (azimuth: string) => {
	let mapper: { [key: string]: number } = {
		north: 0,
		northeast: 45,
		east: 90,
		southeast: 135,
		south: 180,
		southwest: 225,
		west: 270,
		northwest: 315
	};

	return mapper[azimuth];
};

export const getPartOfDay = (start: number, end: number, hoursOfDay = 24) => {
	let delta = end - start;
	if (isNaN(delta)) return 0;
	let ratio = (delta / hoursOfDay) * 100;
	if (ratio === 0) return 1;
	return Math.floor(ratio);
};

export const getStartPosition = (start: number, hoursOfDay = 24) => {
	return (start / hoursOfDay) * 100;
};

export const getEndPosition = (end: number, hoursOfDay = 24) => {
	return (end / hoursOfDay) * 100;
};

export const titleCase = (text: string) => {
	return text.charAt(0).toUpperCase() + text.slice(1);
};

export const formatFilterFormData = (data: FormData) => {
	return {
		area: '' + data.get('area'),
		timeOfyear: {
			autumn: !!data.get('autumn'),
			winter: !!data.get('winter'),
			spring: !!data.get('spring'),
			summer: !!data.get('summer')
		},
		sunOptions: '' + data.get('hours-of-day'),
		hoursOfDay: {
			min: +(data.get('lower-suntime') || 0),
			max: +(data.get('upper-suntime') || 0)
		},
		exposure: {
			north: !!data.get('north'),
			'north-east': !!data.get('north-east'),
			east: !!data.get('east'),
			'south-east': !!data.get('south-east'),
			south: !!data.get('south'),
			'south-west': !!data.get('south-west'),
			west: !!data.get('west'),
			'north-west': !!data.get('north-west')
		}
	};
};

export const getSectorOptions = (sectors: SectorsData[]) => {
	return sectors.map((sector) => sector.properties.Settore.toLowerCase());
};

const getAllowedExposures = (exposures: { [key: string]: boolean }) => {
	let allowedExposures = [];
	for (const [key, value] of Object.entries(exposures)) {
		if (value) {
			allowedExposures.push(AZIMUTH[key]);
		}
	}

	return allowedExposures;
};

const formatHoursOfSunlight = (interval: string): number[] => {
	return interval.split('-').map((hour) => parseInt(hour));
};

const formatResults = (results: Array<Feature>) => {
	// Return a formatted version from results
	// to be displayed and used in the filterResults component
	let properties;
	let wall = {};
	let sector: string = '';
	let output: { [key: string]: Array<WallFilterResults | {}> } = {};

	// TODO Special case -> call function for similar results
	if (results.length === 0) return {};

	for (let crag of results) {
		properties = crag.properties;
		if (properties) {
			wall = {
				self: crag,
				name: properties.falesia,
				x: properties.falesia_x,
				y: properties.falesia_y,
				azimuth: properties.azimut
			};
			sector = properties.Settore.toLowerCase();

			if (sector === '-') {
				sector = properties.falesia;
			}
		}

		if (output[sector]) {
			output[sector].push(wall);
		} else {
			output[sector] = [wall];
		}
	}

	return output;
};

const cleanResults = (results: Array<Feature>) => {
	// Remove duplicates
	let output: Array<Feature> = [];
	let memory: Array<string | number | undefined> = [];

	for (let record of results) {
		if (memory.includes(record.id)) continue;
		memory.push(record.id);
		output.push(record);
	}

	return output;
};

const filterByArea = (area: string, data: Array<Feature>) => {
	let properties;
	let sector = '';
	let results: Array<Feature> = [];

	for (let crag of data) {
		properties = crag.properties;
		if (properties) {
			sector = properties.Settore === '-' ? properties.falesia : properties.Settore;
		}

		if (sector.toLowerCase() === area.toLowerCase() || area === 'all-sectors') {
			results.push(crag);
		}
	}

	return results;
};

const filterByExposure = (exposure: { [key: string]: boolean }, data: Array<Feature>) => {
	let properties;
	let results = [];

	let allowedExposures = getAllowedExposures(exposure);

	if (allowedExposures.length === 0) return data;

	for (let crag of data) {
		properties = crag.properties;
		if (properties && allowedExposures.includes(properties.azimut)) {
			results.push(crag);
		}
	}

	return results;
};

const filterBySunOptions = (
	options: string,
	hours: { [key: string]: number },
	period: { [key: string]: boolean },
	data: Array<Feature>
) => {
	// Depending on the options the min and max hours are selected

	let properties;
	let results: Array<Feature> = [];

	let autumnResults = [];
	let winterResults = [];
	let springResults = [];
	let summerResults = [];

	// Active period in filter
	let autumn = period.autumn;
	let winter = period.winter;
	let spring = period.spring;
	let summer = period.summer;

	let minHour, maxHour: number;

	if (options === 'all-day-sun') {
		[minHour, maxHour] = [MIN_HOUR_OF_SUNLIGHT, MAX_HOUR_OF_SUNLIGHT];
	} else if (options === 'all-day-shadow') {
		[minHour, maxHour] = [NaN, NaN];
	} else {
		minHour = hours.min;
		maxHour = hours.max;
	}

	for (let crag of data) {
		properties = crag.properties || {};
		// Filter on all sun
		let [minAutumn, maxAutumn] = formatHoursOfSunlight(properties.fall);
		let [minWinter, maxWinter] = formatHoursOfSunlight(properties.winter);
		let [minSpring, maxSpring] = formatHoursOfSunlight(properties.spring);
		let [minSummer, maxSummer] = formatHoursOfSunlight(properties.summr);

		// When all-day-sun I don't consider the interval but the time delta
		// I want crags with gte 8h of sun
		if (options === 'all-day-sun') {
			if (maxAutumn - minAutumn >= maxHour - minHour && !isNaN(minAutumn)) {
				autumnResults.push(crag);
			}

			if (maxWinter - minWinter >= maxHour - minHour && !isNaN(minWinter)) {
				winterResults.push(crag);
			}

			if (maxSpring - minSpring >= maxHour - minHour && !isNaN(minSpring)) {
				springResults.push(crag);
			}

			if (maxSummer - minSummer >= maxHour - minHour && !isNaN(minSummer)) {
				summerResults.push(crag);
			}
		} else {
			// Otherwise I consider the time interval
			// Inclusive interval per season
			if ((minAutumn >= minHour && maxAutumn <= maxHour) || (isNaN(minAutumn) && isNaN(minHour))) {
				autumnResults.push(crag);
			}

			if ((minWinter >= minHour && maxWinter <= maxHour) || (isNaN(minWinter) && isNaN(minHour))) {
				winterResults.push(crag);
			}

			if ((minSpring >= minHour && maxSpring <= maxHour) || (isNaN(minSpring) && isNaN(minHour))) {
				springResults.push(crag);
			}

			if ((minSummer >= minHour && maxSummer <= maxHour) || (isNaN(minSummer) && isNaN(minHour))) {
				summerResults.push(crag);
			}
		}
	}

	// If all the options are false then return all seasons
	if (!autumn && !winter && !spring && !summer) {
		results = [...autumnResults, ...winterResults, ...springResults, ...summerResults];
	}

	// If there is one or more options checked
	if (autumn) {
		results = [...results, ...autumnResults];
	}

	if (winter) {
		results = [...results, ...winterResults];
	}

	if (spring) {
		results = [...results, ...springResults];
	}

	if (summer) {
		results = [...results, ...summerResults];
	}

	return cleanResults(results);
};

export const digestFormData = (data: any, filters: FilterForm) => {
	let results: Array<Feature> = data;

	// Colinder filter model
	// 1. Sector
	results = filterByArea(filters.area, results);

	// 2. Exposure
	results = filterByExposure(filters.exposure, results);

	// 3. Sunlight
	results = filterBySunOptions(filters.sunOptions, filters.hoursOfDay, filters.timeOfyear, results);

	// Formatting to get an object with key[sector]: value[Array<crags>]
	const cleanedResults = formatResults(results);
	return cleanedResults;
};

// Timezone and Timestamps
export const getTimezoneDate = (timestamp: number, offset: number) => {
	return timestamp + offset;
};

export const formatUnixDate = (unix: number, lang: string = 'en') => {
	let DAYS_OF_THE_WEEK: string[] = [];
	if (lang === 'it') {
		DAYS_OF_THE_WEEK = ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'];
	} else {
		DAYS_OF_THE_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	}

	let date = new Date(unix * 1000);

	let day = date.getDate();
	let weekDay = DAYS_OF_THE_WEEK[date.getDay()];
	let hour = date.getHours();

	return [day, weekDay, hour];
};

export const getPercentage = (num: number) => {
	return isNaN(num) ? '-' : Math.floor(num * 100);
};

// Cache utils
export const getCacheKey = (prefix: string, data: string) => {
	/**
	 * Utils to form the key to put in the cache
	 * The function will hash the data MD5 and attach the prefix
	 * and return the key as String
	 */

	let hash = MD5(data);

	return `${prefix}:${hash}`;
};

export const slugify = (text: string): string => {
	return text
		.split(/\s+/)
		.map((c) => c.toLowerCase())
		.join('-');
};
