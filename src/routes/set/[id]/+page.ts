import type { PageLoad } from './$types';
import { API_HOST } from '$lib/vars';
import { token as tokenStore } from '$lib/stores/auth';
import { get } from 'svelte/store';

export const load: PageLoad = async ({ params }) => {
	try {
		const response = await fetch(`${API_HOST}/sets/${params.id}`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${get(tokenStore)}`,
				'Content-Type': 'application/json'
			}
		});

		if (response.ok) {
			const res = await response.json();
			console.log(res);
			return res;
		} else {
			console.error('Login failed', response.statusText);
		}
	} catch (error) {
		console.error('Error during fetch', error);
	}

	// return {
	// 	title: 'Study set 1',
	// 	cards: [
	// 		{
	// 			id: '1',
	// 			front: 'Front 1',
	// 			back: 'Back 1',
	// 			set_id: '1'
	// 		},
	// 		{
	// 			id: '2',
	// 			front: 'Front 2',
	// 			back: 'Back 2',
	// 			set_id: '1'
	// 		},
	// 		{
	// 			id: '3',
	// 			front: 'Front 3',
	// 			back: 'Back 3',
	// 			set_id: '1'
	// 		},
	// 		{
	// 			id: '4',
	// 			front: 'Front 4',
	// 			back: 'Back 3',
	// 			set_id: '1'
	// 		},
	// 		{
	// 			id: '5',
	// 			front: 'Front 5',
	// 			back: 'Back 5',
	// 			set_id: '1'
	// 		}
	// 	]
	// };
};
