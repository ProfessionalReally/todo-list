import {
	useRequestDeleteTodo,
	useRequestGetTodos,
	useRequestPostTodo,
	useRequestUpdateTodo,
} from './use-request';
import type { Todo } from '../types';
import { useCallback, useState } from 'react';

export const useTodos = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);

	const { todos } = useRequestGetTodos(setIsLoading, setError);
	const { requestPostTodo } = useRequestPostTodo(setIsLoading, setError);
	const { requestDeleteTodo } = useRequestDeleteTodo(setIsLoading, setError);
	const { requestUpdateTodo } = useRequestUpdateTodo(setIsLoading, setError);

	const addTodo = useCallback((title: string) => {
		requestPostTodo(title);
	}, []);

	const updateTodo = useCallback(
		(id: string, updatedFields: Partial<Todo>) => {
			const todo = todos.find((todo) => todo.id === id);
			todo
				? requestUpdateTodo(id, updatedFields)
				: console.log('Todo not found');
		},
		[todos],
	);

	const deleteTodo = useCallback(
		(id: string) => {
			const todo = todos.find((todo) => todo.id === id);
			todo ? requestDeleteTodo(id) : console.log('Todo not found');
		},
		[todos],
	);

	return {
		todos,
		isLoading,
		error,
		updateTodo,
		deleteTodo,
		addTodo,
	};
};
