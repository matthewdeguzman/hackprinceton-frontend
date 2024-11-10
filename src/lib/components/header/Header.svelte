<script lang="ts">
	import tokenStore from '$lib/stores/auth';
	import { Plus } from 'lucide-svelte';

	const logout = () => {
		window.location.href = '/';
		tokenStore.set(null);
		localStorage.removeItem('token');
	};
</script>

<div class="flex w-full flex-col items-center">
	<header class="flex h-[60px] w-full max-w-[1370px] items-center rounded-full px-8 shadow">
		<div class="flex grow items-center">
			<a href={$tokenStore ? '/sets' : '/'}>
				<img src="/assets/logo-black.svg" alt="Saiki" width={30} height={30} />
			</a>
		</div>

		<div class="flex gap-6">
			{#if $tokenStore}
				<a
					href="/create"
					class="flex items-center gap-1 rounded-full bg-blue py-1.5 pl-4 pr-6 text-white"
					><Plus strokeWidth={1.5} />Create Set</a
				>
				<button on:click={logout}> Log out </button>
			{:else}
				<a href="/login"> Log in </a>
				<a href="/signup" class="text-blue">Sign up</a>
			{/if}
		</div>
	</header>
</div>
