<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/header/Header.svelte';
	let { children } = $props();
</script>

<div class="p-6">
	<Header />
	{@render children()}
</div>
