<script lang="ts">
	// Font Awesome
	import Fa from 'svelte-fa/src/fa.svelte';

	export let link: string | null;
	export let text: string;
	export let icon: boolean | any = false;
</script>

<a
	href={link}
	target="_blank"
	rel="noopener noreferrer"
	class="py-1 px-2 text-sm border border-black/40 flex gap-2 items-center rounded shadow-lg hover:bg-sky-blue hover:-translate-y-1 hover:text-white cursor-pointer"
>
	{#if icon}
		<Fa {icon} />
	{/if}
	{text}</a
>
