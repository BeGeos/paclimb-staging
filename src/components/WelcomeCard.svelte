<script lang="ts">
	export let visible: boolean;
	export let handleOpen: any;
</script>

<div
	class="max-w-[90%] md:max-w-xl mx-auto rounded-lg bg-white/80 text-center p-8 my-16 scale-0 shadow-2xl"
	class:visible
	on:click={(e) => e.stopPropagation()}
>
	<h4 class="text-xl mb-2 font-bold">Hi Climbers!</h4>
	<p class="mb-6 font-normal">
		Here you can <span class="font-bold">look</span> for and <span class="font-bold">explore</span> all
		the crags in Finale Ligure. With the geolocation will be very easy to reach the crags.
	</p>
	<h1 class="md:text-5xl text-3xl font-bold cursor-pointer underline" on:click={handleOpen}>
		Explore the 3D Map!
	</h1>
</div>

<style>
	.visible {
		transform: scale(1);
	}
</style>
