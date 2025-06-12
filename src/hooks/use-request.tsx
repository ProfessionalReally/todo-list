import React, { useEffect, useState } from 'react';
import type { Todo } from '../types';
import {
	deleteTodo,
	getTodoById,
	getTodos,
	postTodo,
	updateTodo,
} from '../services';

const LOADING_TIMEOUT = 5000;

type AsyncFunction<T> = () => Promise<T>;

const useRequest = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);

	const request = async (asyncFn: AsyncFunction<Todo[] | Todo>) => {
		setIsLoading(true);
		setError(null);
		try {
			return await asyncFn();
		} catch (error: Error | unknown) {
			console.error(error);
			setError(error as Error);
		} finally {
			setIsLoading(false);
		}
	};

	return { isLoading, error, request };
};

export const useRequestGetTodos = () => {
	const [todos, setTodos] = useState<Todo[]>([]);
	const { request, isLoading, error: errorGet } = useRequest();

	useEffect(() => {
		request(getTodos).then((data: Todo[] | Todo | undefined) => {
			if (data) setTodos(data as Todo[]);
		});
	}, []);

	return { todos, isLoading, errorGet, setTodos };
};

export const useRequestGetTodo = (id: string | undefined) => {
	const [isTimeout, setIsTimeout] = useState(false);
	const [hasFetched, setHasFetched] = useState(false);
	const [todo, setTodo] = useState<Todo | null>(null);
	const { request, isLoading, error: errorGet } = useRequest();

	useEffect(() => {
		if (!id) return;

		let didTimeout = false;

		const timeoutId = setTimeout(() => {
			didTimeout = true;
			setIsTimeout(true);
		}, LOADING_TIMEOUT);

		request(async () => {
			return await getTodoById(id);
		})
			.then((data: Todo[] | Todo | undefined) => {
				if (!didTimeout) setHasFetched(true);
				if (data) setTodo(data as Todo);
			})
			.finally(() => {
				clearTimeout(timeoutId);
			});

		return () => clearTimeout(timeoutId);
	}, [id]);

	return { todo, isTimeout, hasFetched, isLoading, errorGet, setTodo };
};

export const useRequestPostTodo = (
	setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
) => {
	const { request, isLoading: isCreating, error: errorPost } = useRequest();
	const requestPostTodo = async (title: string) => {
		request(async () => {
			return await postTodo(title);
		}).then((data: Todo[] | Todo | undefined) => {
			if (data) setTodos((prev: Todo[]) => [...prev, data as Todo]);
		});
	};

	return { requestPostTodo, isCreating, errorPost };
};

export const useRequestDeleteTodo = (
	setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
) => {
	const { request, isLoading: isDeleting, error: errorDelete } = useRequest();

	const requestDeleteTodo = async (id: string) => {
		request(async () => {
			return await deleteTodo(id);
		}).then((data: Todo[] | Todo | undefined) => {
			if (data)
				setTodos((prev: Todo[]) =>
					prev.filter((todo) => todo.id !== id),
				);
		});
	};

	return { requestDeleteTodo, isDeleting, errorDelete };
};

export const useRequestUpdateTodo = (
	setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
) => {
	const { request, isLoading: isUpdating, error: errorUpdate } = useRequest();

	const requestUpdateTodo = async (
		id: string,
		updatedFields: Partial<Todo>,
	) => {
		request(async () => {
			return await updateTodo(id, updatedFields);
		}).then(() => {
			setTodos((prev: Todo[]) =>
				prev.map((t) => (t.id === id ? { ...t, ...updatedFields } : t)),
			);
		});
	};

	return { requestUpdateTodo, isUpdating, errorUpdate };
};
