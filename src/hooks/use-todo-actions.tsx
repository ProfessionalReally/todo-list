import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@src/redux/store';
import type { TodoI } from '@src/types';
import {
	addTodoRequest,
	deleteTodoRequest,
	updateTodoRequest,
} from '@src/redux/actions';

export const useTodoActions = () => {
	const dispatch = useDispatch<AppDispatch>();

	const addTodo = (title: string) => dispatch(addTodoRequest(title));

	const updateTodo = (id: string, updatedFields: Partial<TodoI>) =>
		dispatch(updateTodoRequest(id, updatedFields));

	const deleteTodo = (id: string) => dispatch(deleteTodoRequest(id));

	return {
		addTodo,
		updateTodo,
		deleteTodo,
	};
};
