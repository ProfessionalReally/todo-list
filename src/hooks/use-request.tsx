import { useEffect, useState } from 'react';
import type { Todo } from '../types';
import { getTodos } from '../services';

export const useRequestGetTodos = () => {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		setIsLoading(true);
		setError(null);

		getTodos()
			.then((data) => {
				setTodos(data);
			})
			.catch((error) => {
				console.error(error);
				setError(error);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, []);

	return { todos, isLoading, error, setTodos };
};
