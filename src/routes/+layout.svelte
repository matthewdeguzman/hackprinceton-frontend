<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/header/Header.svelte';
	let { children } = $props();
</script>

<div class="p-4">
	<Header />
	{@render children()}
</div>
