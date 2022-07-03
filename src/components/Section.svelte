<script lang="ts">
	export let id: string;
	export let position: string;
</script>

<section
	{id}
	class="py-8 min-h-screen"
	class:fixed={position === 'fixed'}
	class:relative={position === 'relative'}
>
	<slot />
</section>

<style>
	.fixed {
		position: fixed;
		inset: 0;
		z-index: 20;
	}
</style>
