import mapbox from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

// Mapbox types
import type { MapMouseEvent, Map, MapLayerMouseEvent } from 'mapbox-gl';

// Local Types
import type { MapBoundingBox } from '@types';

// https://docs.mapbox.com/help/glossary/access-token/
mapbox.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN as string;

export const FINALE_LIGURE_BBOX: MapBoundingBox = [8.2836296, 44.1547898, 8.4371453, 44.2277226];
export const FINALE_LIGURE_MAX_BOUNDS: MapBoundingBox[] = [
	[8.2836296, 44.1547898],
	[8.4371453, 44.2277226]
];

export const addCursorToLayers = (map: Map, layer: string) => {
	map.on('mouseenter', layer, (e: MapMouseEvent) => {
		map.getCanvas().style.cursor = 'pointer';
	});

	map.on('mouseleave', layer, (e: MapMouseEvent) => {
		map.getCanvas().style.cursor = '';
	});
};

export const addFlytTo = (map: Map, layer: string) => {
	map.on('click', layer, (e: MapLayerMouseEvent) => {
		if (e.features) {
			map.flyTo({
				center: e.features[0].geometry.coordinates,
				zoom: 15
			});
		}
	});
};

export { mapbox, MapboxGeocoder };
