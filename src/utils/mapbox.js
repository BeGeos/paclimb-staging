import mapbox from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

// https://docs.mapbox.com/help/glossary/access-token/
mapbox.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

export const FINALE_LIGURE_BBOX = [8.2164857, 44.118488, 8.4883968, 44.2654405];
export const FINALE_LIGURE_MAX_BOUNDS = [
	[8.2164857, 44.1184881],
	[8.4883968, 44.2654405]
];

export const addCursorToLayers = (map, layer) => {
	map.on('mouseenter', layer, (e) => {
		map.getCanvas().style.cursor = 'pointer';
	});

	map.on('mouseleave', layer, (e) => {
		map.getCanvas().style.cursor = '';
	});
};

export const addFlytTo = (map, layer) => {
	map.on('click', layer, (e) => {
		map.flyTo({
			center: e.features[0].geometry.coordinates,
			zoom: 15
		});
	});
};

export { mapbox, MapboxGeocoder };
