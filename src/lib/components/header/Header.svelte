<script lang="ts">
	import tokenStore from '$lib/stores/auth';

	const logout = () => {
		window.location.href = '/login';
		tokenStore.set(null);
		localStorage.removeItem('token');
	};
</script>

<div class="flex w-full flex-col items-center">
	<header class="flex h-[60px] w-full max-w-[1200px] items-center rounded-full px-8 shadow">
		<div class="flex grow items-center">
			<a href="/">
				<img src="/assets/logo-black.svg" alt="Saiki" width={30} height={30} />
			</a>
		</div>

		<div class="flex gap-6">
			{#if $tokenStore}
				<button on:click={logout}> Log out </button>
			{:else}
				<a href="/login"> Log in </a>
				<a href="/signup" class="text-blue">Sign up</a>
			{/if}
		</div>
	</header>
</div>
