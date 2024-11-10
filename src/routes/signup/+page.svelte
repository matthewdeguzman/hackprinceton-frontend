<script lang="ts">
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';

	import LoaderCircle from 'lucide-svelte/icons/loader-circle';

	import { goto } from '$app/navigation';
	import { API_HOST } from '$lib/vars';

	let name = '';
	let email = '';
	let username = '';
	let password = '';
	let registerLoading = false;

	const handleSubmit = async (event: Event) => {
		event.preventDefault();
		registerLoading = true;

		if (!name || !email || !username || !password) {
			registerLoading = false;
			return;
		}

		const data = {
			name,
			email,
			username,
			password
		};

		try {
			const response = await fetch(`${API_HOST}/users/register`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			});

			if (response.ok) {
				console.log('Registration successful');
				goto('/login');
			} else console.error('Registration failed', response.statusText);
		} catch (error) {
			console.error('Error during fetch', error);
		} finally {
			registerLoading = false;
		}
	};
</script>

<form class="mt-10 flex flex-col items-center" on:submit={handleSubmit}>
	<div class="grid w-full max-w-sm items-center gap-4">
		<div class="mb-10 flex flex-col items-center">
			<h1 class="text-3xl font-bold">Sign up for an account</h1>
		</div>

		<div class="flex flex-col gap-2">
			<Label for="name">Name</Label>
			<Input id="name" bind:value={name} placeholder="Prayuj Tuli" type="text" />
		</div>

		<div class="flex flex-col gap-2">
			<Label for="email">Email</Label>
			<Input id="email" bind:value={email} placeholder="prayuj@prayujt.com" type="text" />
		</div>

		<div class="flex flex-col gap-2">
			<Label for="username">Username</Label>
			<Input id="username" bind:value={username} placeholder="prayujt" type="text" />
		</div>

		<div class="flex flex-col gap-2">
			<Label for="password">Password</Label>
			<Input id="password" bind:value={password} placeholder="********" type="password" />
		</div>
	</div>

	<div class="mt-10">
		<button class="rounded-full bg-blue px-6 py-2 text-sm text-white" type="submit">
			<div class="flex items-center gap-2">
				<p>Register</p>
				{#if registerLoading}
					<LoaderCircle class="h-4 w-4 animate-spin text-white" />
				{/if}
			</div>
		</button>
	</div>
</form>
