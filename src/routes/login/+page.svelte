<script lang="ts">
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import FormButton from '$lib/components/ui/form/form-button.svelte';

	import LoaderCircle from 'lucide-svelte/icons/loader-circle';

	import tokenStore from '$lib/stores/auth';
	import { API_HOST } from '$lib/vars';

	let identifier = '';
	let password = '';
	let loginLoading = false;

	const handleSubmit = async (event: Event) => {
		event.preventDefault();
		loginLoading = true;

		if (!identifier || !password) {
			loginLoading = false;
			return;
		}

		const data = {
			identifier,
			password
		};

		try {
			const response = await fetch(`${API_HOST}/users/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			});

			if (response.ok) {
				console.log('Login successful');
				const result = await response.json();
				const { token } = result;
				tokenStore.set(token);
				window.location.href = '/sets';
			} else {
				console.error('Login failed', response.statusText);
			}
		} catch (error) {
			console.error('Error during fetch', error);
		} finally {
			loginLoading = false;
		}
	};
</script>

<form class="mt-10 flex flex-col items-center" on:submit={handleSubmit}>
	<div class="grid w-full max-w-sm items-center gap-4">
		<div class="mb-10 flex flex-col items-center">
			<h1 class="text-3xl font-bold">Sign in to your account</h1>
		</div>

		<div class="flex flex-col gap-2">
			<Label for="identifier">Username or Email</Label>
			<Input id="identifier" bind:value={identifier} placeholder="Username or email" type="text" />
		</div>

		<div class="flex flex-col gap-2">
			<Label for="password">Password</Label>
			<Input id="password" bind:value={password} placeholder="Password" type="password" />
		</div>
	</div>

	<div class="mt-10">
		<FormButton type="submit">
			<div class="flex items-center gap-2">
				<p>Sign In</p>
				{#if loginLoading}
					<LoaderCircle class="h-4 w-4 animate-spin text-white" />
				{/if}
			</div>
		</FormButton>
	</div>
</form>
