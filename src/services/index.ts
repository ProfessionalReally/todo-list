import type { Todo } from '../types';

const SERVER_URL_TODOS = 'http://localhost:3000/todos';

export const getTodos = async () => {
	try {
		const response = await fetch(SERVER_URL_TODOS);
		if (!response.ok) {
			throw new Error(`Failed to get todos: ${response.status}`);
		}
		return await response.json();
	} catch (error: Error | unknown) {
		throw error;
	}
};

export const postTodo = async (title: string) => {
	try {
		const response = await fetch(SERVER_URL_TODOS, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
			body: JSON.stringify({ title: title, completed: false }),
		});
		if (!response.ok) {
			throw new Error(`Failed to post todo: ${response.status}`);
		}
		return await response.json();
	} catch (error: Error | unknown) {
		throw error;
	}
};

export const deleteTodo = async (id: string) => {
	try {
		const response = await fetch(`${SERVER_URL_TODOS}/${id}`, {
			method: 'DELETE',
		});
		if (!response.ok) {
			throw new Error(`Failed to delete todo: ${response.status}`);
		}
		return await response.json();
	} catch (error: Error | unknown) {
		throw error;
	}
};

export const updateTodo = async (id: string, updatedFields: Partial<Todo>) => {
	try {
		const response = await fetch(`${SERVER_URL_TODOS}/${id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
			body: JSON.stringify(updatedFields),
		});
		if (!response.ok) {
			throw new Error(`Failed to update todo: ${response.status}`);
		}
		return await response.json();
	} catch (error: Error | unknown) {
		throw error;
	}
};
