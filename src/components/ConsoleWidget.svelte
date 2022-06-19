<script>
	export let title;
	export let data;
	export let extension;

	let measure = data === '-' ? '' : extension;
</script>

<div class="p-2 text-center rounded-lg transition-all hover:bg-light-blue cursor-pointer">
	<h4>{title}</h4>
	<p class="text-center">{data} {measure}</p>
</div>
