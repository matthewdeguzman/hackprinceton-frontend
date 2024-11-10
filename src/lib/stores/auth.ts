import { writable } from 'svelte/store';

const isBrowser = typeof window !== 'undefined';

const token = writable<string | null>(isBrowser ? localStorage.getItem('auth_token') : null);

if (isBrowser) {
	token.subscribe(($token) => {
		console.log('auth_token', $token);
		if ($token) {
			localStorage.setItem('auth_token', $token);
		} else {
			localStorage.removeItem('auth_token');
		}
	});
}

export default token;
