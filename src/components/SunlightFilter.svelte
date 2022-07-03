<script lang="ts">
	export let name: string;

	// utils
	import { titleCase } from '@utils';
</script>

<label class="flex-1">
	<!-- <input type="hidden" {name} value="False" /> -->
	<input type="checkbox" {name} value="true" class="hidden peer" />
	<span
		class="block p-2 cursor-pointer border border-black/40 text-center rounded-md font-normal select-none min-w-full peer-checked:bg-sky-blue peer-checked:text-white peer-checked:border-none"
		>{titleCase(name)}</span
	>
</label>
