export const API_HOST =
	import.meta.env.VITE_NODE_ENV === 'production'
		? 'https://prod.url.com'
		: 'http://localhost:8080';
