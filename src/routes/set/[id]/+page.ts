import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	return {
		cards: [
			{
				id: '1',
				front: 'Front 1',
				back: 'Back 1',
				set_id: '1'
			},
			{
				id: '2',
				front: 'Front 2',
				back: 'Back 2',
				set_id: '1'
			},
			{
				id: '3',
				front: 'Front 3',
				back: 'Back 3',
				set_id: '1'
			},
			{
				id: '4',
				front: 'Front 4',
				back: 'Back 3',
				set_id: '1'
			},
			{
				id: '5',
				front: 'Front 5',
				back: 'Back 5',
				set_id: '1'
			}
		]
	};
};
