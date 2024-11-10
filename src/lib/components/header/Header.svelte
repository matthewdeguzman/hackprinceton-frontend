<script lang="ts">
	import tokenStore from '$lib/stores/auth';

	const logout = () => {
		window.location.href = '/login';
		tokenStore.set(null);
		localStorage.removeItem('token');
	};
</script>

<header class="flex h-[60px] w-full items-center rounded-2xl border border-solid border-black px-4">
	<div class="flex grow items-center">
		<h1>Logo Name</h1>
	</div>

	<div class="flex gap-4">
		{#if $tokenStore}
			<button on:click={logout}> Log out </button>
		{:else}
			<a href="/login"> Log in </a>
			<a href="/signup">Sign up</a>
		{/if}
	</div>
</header>
