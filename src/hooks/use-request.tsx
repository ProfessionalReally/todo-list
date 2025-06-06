import React, { useEffect, useState } from 'react';
import type { Todo } from '../types';
import { db } from '../services/firebase';
import { ref, onValue, push, remove, update } from 'firebase/database';

const PATH_TODOS = 'todos';

export const useRequestGetTodos = (
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
	setError: React.Dispatch<React.SetStateAction<Error | null>>,
) => {
	const [todos, setTodos] = useState<Todo[]>([]);

	useEffect(() => {
		setIsLoading(true);

		return onValue(
			ref(db, PATH_TODOS),
			(snapshot) => {
				setError(null);
				if (snapshot.exists()) {
					const data = Object.entries(snapshot.val()).map(
						([id, todo]) => {
							return {
								id,
								...(todo as Omit<Todo, 'id'>),
							};
						},
					);
					setTodos(data);
				} else {
					setTodos([]);
				}
				setIsLoading(false);
			},
			(error) => {
				console.log('Failed to get todos', error);
				setError(error);
				setIsLoading(false);
			},
		);
	}, []);

	return { todos };
};

export const useRequestPostTodo = (
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
	setError: React.Dispatch<React.SetStateAction<Error | null>>,
) => {
	const [isCreating, setIsCreating] = useState(false);

	const requestPostTodo = (title: string) => {
		setIsLoading(true);
		setIsCreating(true);
		setError(null);

		push(ref(db, PATH_TODOS), { title, completed: false })
			.catch((error: Error) => {
				console.log('Failed to create todo', error);
				setError(error as Error);
			})
			.finally(() => {
				setIsLoading(false);
				setIsCreating(false);
			});
	};

	return { isCreating, requestPostTodo };
};

export const useRequestDeleteTodo = (
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
	setError: React.Dispatch<React.SetStateAction<Error | null>>,
) => {
	const [isDeleting, setIsDeleting] = useState(false);

	const requestDeleteTodo = (id: string) => {
		setIsLoading(true);
		setIsDeleting(true);
		setError(null);

		remove(ref(db, `${PATH_TODOS}/${id}`))
			.catch((error: Error) => {
				console.log('Failed to delete todo', error);
				setError(error as Error);
			})
			.finally(() => {
				setIsLoading(false);
				setIsDeleting(false);
			});
	};

	return { isDeleting, requestDeleteTodo };
};

export const useRequestUpdateTodo = (
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
	setError: React.Dispatch<React.SetStateAction<Error | null>>,
) => {
	const [isUpdating, setIsUpdating] = useState(false);

	const requestUpdateTodo = (id: string, updatedFields: Partial<Todo>) => {
		setIsLoading(true);
		setIsUpdating(true);
		setError(null);

		update(ref(db, `${PATH_TODOS}/${id}`), updatedFields)
			.catch((error: Error) => {
				console.log('Failed to update todo', error);
				setError(error as Error);
			})
			.finally(() => {
				setIsUpdating(false);
				setIsLoading(false);
			});
	};

	return { isUpdating, requestUpdateTodo };
};
