import type { GeoJsonGeometryTypes, Geometry, Polygon } from 'geojson';

export interface MapData {
	falesia: string;
	Settore: string;
	link_wall: string;
	A51_wall: string;
	VSud_wall: string;
	azimut: string;
	falesia_x: string;
	falesia_y: string;
	park1: string;
	park1_lk: string;
	park1_road: string;
	park1_x: string;
	park1_y: string;
	park2?: string;
	park2_lk?: string;
	park2_road?: string;
	park2_x?: string;
	park2_y?: string;
	fall: string;
	spring: string;
	summr: string;
	winter: string;
}

export interface ParkData {
	nome_cpark: string;
	GoogleLink: string;
	ClimbRoad: string;
	park_num: number | string;
	nom_cpark2: string;
	x: number | string;
	y: number | string;
}

export interface WallsData {
	type?: string | GeoJsonGeometryTypes;
	id?: string | number;
	geometry?: Geometry;
	properties: MapData;
	[key: string]: any;
}

export interface SectorsData {
	type?: string | GeoJsonGeometryTypes;
	id?: number | string;
	geometry?: Geometry;
	properties: {
		Settore: string;
		x: string | number;
		y: string | number;
	};
	[key: string]: any;
}

export interface ParkingsData {
	type?: string | GeoJsonGeometryTypes;
	id?: string | number;
	geometry?: Geometry;
	properties: ParkData;
	[key: string]: any;
}

export type MapBoundingBox = number[];
