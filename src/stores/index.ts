import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

// Import falesie
import { features as walls } from './files/falesie.json';
import { features as _parkings } from './files/parking.json';
import { features as _sectors } from './files/sector.json';

export const falesie = writable([]);
export const parkings = writable([]);
export const sectors = writable([]);

export const roadColors = writable({});

const loadFalesie = async () => {
	falesie.set(walls);
};

const loadParkings = async () => {
	parkings.set(_parkings);
};

const loadSectors = async () => {
	sectors.set(_sectors);
};

const loadColors = async () => {
	roadColors.set({
		'verezzi road': '#eaf344',
		'perti road': '#38a800',
		'monte sordo road': '#57ceef',
		'boragni road': '#006eff',
		'le manie road': '#ffaa00',
		'capo noli road': '#a800e6',
		'bric road': '#00e6a8'
	});
};

// Routines
loadFalesie();
loadParkings();
loadSectors();
loadColors();
