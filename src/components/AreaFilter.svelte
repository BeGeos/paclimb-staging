<script lang="ts">
	// import stores
	import { sectors } from '@stores';

	// Utils
	import { getSectorOptions, titleCase } from '@utils';

	let sectorOptions = getSectorOptions($sectors);
</script>

<label for="area" class="block">Area</label>
<select name="area" id="name" class="min-w-full border border-black/40 rounded-md p-2">
	<option value="all-sectors">All</option>
	{#each sectorOptions as sector}
		<option value={sector}>{titleCase(sector)}</option>
	{/each}
</select>
