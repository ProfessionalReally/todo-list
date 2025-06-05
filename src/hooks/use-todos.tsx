import {
	useRequestDeleteTodo,
	useRequestGetTodos,
	useRequestPostTodo,
	useRequestUpdateTodo,
} from './use-request';
import type { Todo } from '../types';
import { useCallback } from 'react';

export const useTodos = () => {
	const { todos, isLoading, errorGet, setTodos } = useRequestGetTodos();
	const { requestPostTodo, isCreating, errorPost } =
		useRequestPostTodo(setTodos);
	const { requestDeleteTodo, isDeleting, errorDelete } =
		useRequestDeleteTodo(setTodos);
	const { requestUpdateTodo, isUpdating, errorUpdate } =
		useRequestUpdateTodo(setTodos);

	const addTodo = useCallback((title: string) => {
		requestPostTodo(title);
	}, []);

	const updateTodo = useCallback(
		(id: string, updatedFields: Partial<Todo>) => {
			const todo = todos.find((todo) => todo.id === id);
			todo
				? requestUpdateTodo(id, updatedFields)
				: console.warn('Todo not found');
		},
		[todos],
	);

	const deleteTodo = useCallback(
		(id: string) => {
			const todo = todos.find((todo) => todo.id === id);
			todo ? requestDeleteTodo(id) : console.warn('Todo not found');
		},
		[todos],
	);

	const error = errorGet || errorPost || errorDelete || errorUpdate;

	return {
		todos,
		isLoading,
		isCreating,
		isDeleting,
		isUpdating,
		error,
		updateTodo,
		deleteTodo,
		addTodo,
	};
};
