export const API_HOST =
	import.meta.env.VITE_NODE_ENV === 'development'
		? 'http://localhost:8080'
		: 'https://api.saiki.prayujt.com';
