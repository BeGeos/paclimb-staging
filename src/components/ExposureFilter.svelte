<script lang="ts">
	export let name: string;
	export let exposure: string;
	export let top: string = 'auto';
	export let bottom: string = 'auto';
	export let right: string = 'auto';
	export let left: string = 'auto';
	export let translate: string = '';

	let primaryExposure: string[] = ['N', 'S', 'E', 'W'];

	let sizeClass: string = primaryExposure.includes(exposure)
		? 'primary-btn-exposure'
		: 'secondary-btn-exposure';
</script>

<label class="block absolute" style:top style:left style:right style:bottom>
	<input type="checkbox" {name} value="true" class="hidden peer" />
	<span
		class={`block select-none border border-black/40 peer-checked:bg-sky-blue peer-checked:text-white peer-checked:border-none ${sizeClass}`}
		style:transform={`translate${translate}`}>{exposure}</span
	>
</label>
