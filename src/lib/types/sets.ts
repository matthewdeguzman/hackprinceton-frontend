export interface Card {
	id: string;
	front: {
		type: string;
		content: string;
	};
	back: string;
	set_id: string;
}
