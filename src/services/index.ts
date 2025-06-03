export const getTodos = async () => {
	try {
		const response = await fetch(
			'https://jsonplaceholder.typicode.com/todos',
		);
		if (!response.ok) {
			throw new Error(`Failed to get todos: ${response.status}`);
		}
		return await response.json();
	} catch (error: Error | unknown) {
		throw error;
	}
};
