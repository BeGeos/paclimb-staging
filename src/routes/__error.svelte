<script context="module" lang="ts">
	import type { ErrorLoad } from '@sveltejs/kit';

	export const load: ErrorLoad = ({ error, status }) => {
		return {
			props: {
				error,
				status
			}
		};
	};
</script>

<script lang="ts">
	export let error: Error;
	export let status: number;

	let debug = import.meta.env.VITE_DEBUG === 'true';
</script>

<div class="min-w-full min-h-full flex flex-col gap-2 p-12">
	{#if debug}
		<h4>Status: {status}</h4>
		<h4>Error: {error.message}</h4>
		<h4>Stack: {error.stack}</h4>
	{:else}
		<h1 class="text-4xl font-bold text-center">{status} - {error.message}</h1>
	{/if}
</div>
