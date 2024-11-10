<script lang="ts">
	import '../app.css';
	import { quadOut } from 'svelte/easing';
	import { fly, fade } from 'svelte/transition';
	import Header from '$lib/components/header/Header.svelte';
	let { children, data } = $props();
</script>

<div class="p-6">
	<Header />
	{#key data.pathname}
		<div
			in:fly={{ delay: 200, duration: 600, y: 500, easing: quadOut }}
			out:fade={{ duration: 200 }}
		>
			{@render children()}
		</div>
	{/key}
</div>
