import type { TodoI } from '../types';
import { LOADING_TIMEOUT, REQUEST_TIMEOUT } from '@src/constants';

const SERVER_URL_TODOS: string = import.meta.env.VITE_SERVER_URL_TODOS;

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

export const getTodoById = async (id: string) => {
	const controller = new AbortController();

	const timeoutId = setTimeout(() => controller.abort(), LOADING_TIMEOUT);

	try {
		const response = await fetch(`${SERVER_URL_TODOS}/${id}`, {
			signal: controller.signal,
		});
		if (!response.ok) {
			throw new Error(`Failed to get todo: ${response.status}`);
		}
		return await response.json();
	} catch (error: Error | unknown) {
		if (controller.signal.aborted) {
			throw new Error(REQUEST_TIMEOUT);
		}
		throw error;
	} finally {
		clearTimeout(timeoutId);
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

export const updateTodo = async (id: string, updatedFields: Partial<TodoI>) => {
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
