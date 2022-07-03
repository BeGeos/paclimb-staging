<script lang="ts">
	export let _id: string;
</script>

<div id={_id} class="p-4 border border-black/40 rounded-lg flex flex-col gap-4">
	<slot />
</div>
