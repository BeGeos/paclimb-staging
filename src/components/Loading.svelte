<script lang="ts">
	export let loading: boolean;
	// TODO remove this component since it is not in use
</script>

{#if loading}
	<div class="fixed inset-0 -z-10 bg-white flex items-center justify-center">
		<div>Loading...</div>
		<div class="h-5 w-5 rounded-full animate-spin border-t-4 border-t-sky-blue" />
	</div>
{/if}
