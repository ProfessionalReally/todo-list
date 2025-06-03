import { useRequestGetTodos } from './use-request';
import type { Todo } from '../types';
import { useCallback } from 'react';

export const useTodos = () => {
	const { todos, isLoading, error, setTodos } = useRequestGetTodos();

	const addTodo = useCallback((title: string) => {
		setTodos((prev) => [
			{ id: String(Date.now()), title, completed: false },
			...prev,
		]);
	}, []);

	const updateTodo = useCallback(
		(id: string, updatedFields: Partial<Todo>) => {
			setTodos((prev) =>
				prev.map((todo) =>
					todo.id === id ? { ...todo, ...updatedFields } : todo,
				),
			);
		},
		[],
	);

	const deleteTodo = useCallback((id: string) => {
		setTodos((prev) => prev.filter((todo) => todo.id !== id));
	}, []);

	return {
		todos,
		isLoading,
		error,
		updateTodo,
		deleteTodo,
		addTodo,
	};
};
