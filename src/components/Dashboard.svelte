<script lang="ts">
	export let visible: boolean;
</script>

<div class:visible class="opacity-0">
	<slot />
</div>

<style>
	.visible {
		opacity: 1;
		transition: opacity 0.3s ease-in-out;
	}
</style>
