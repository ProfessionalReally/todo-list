import type { TodoI } from '@src/types';
import {
	addTodoRequest,
	deleteTodoRequest,
	updateTodoRequest,
} from '@src/redux/actions/actions';
import { useAppDispatch } from '@src/redux/hooks';

export const useTodoActions = () => {
	const dispatch = useAppDispatch();

	const addTodo = (title: string) => dispatch(addTodoRequest({ title }));

	const updateTodo = (id: string, updatedFields: Partial<TodoI>) =>
		dispatch(updateTodoRequest({ id, updatedFields }));

	const deleteTodo = (id: string) => dispatch(deleteTodoRequest({ id }));

	return {
		addTodo,
		updateTodo,
		deleteTodo,
	};
};
