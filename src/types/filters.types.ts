export interface FilterForm {
	area: string;
	timeOfyear: {
		autumn: boolean;
		winter: boolean;
		spring: boolean;
		summer: boolean;
	};
	sunOptions: string;
	hoursOfDay: {
		min: number;
		max: number;
	};
	exposure: {
		north: boolean;
		'north-east': boolean;
		east: boolean;
		'south-east': boolean;
		south: boolean;
		'south-west': boolean;
		west: boolean;
		'north-west': boolean;
	};
}
