import { writable } from 'svelte/store';

const isBrowser = typeof window !== 'undefined';

export const token = writable<string | null>(isBrowser ? localStorage.getItem('auth_token') : null);
export const user = writable<any>(isBrowser ? JSON.parse(localStorage.getItem('auth_user')) : null);

if (isBrowser) {
	token.subscribe(($token) => {
		console.log('auth_token', $token);
		if ($token) {
			localStorage.setItem('auth_token', $token);
		} else {
			localStorage.removeItem('auth_token');
		}
	});
	user.subscribe(($user) => {
		console.log('auth_user', $user);
		if ($user) {
			localStorage.setItem('auth_user', JSON.stringify($user));
		} else {
			localStorage.removeItem('auth_user');
		}
	});
}
