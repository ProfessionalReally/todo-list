import {
	selectFilteredSortedTodos,
	selectTodoList,
} from '@src/redux/selectors';
import { useAppSelector } from '@src/redux/hooks';

export const useTodoList = () => {
	const { fetch, add, update } = useAppSelector(selectTodoList);
	const todos = useAppSelector(selectFilteredSortedTodos);

	return {
		todos,
		isLoading: fetch.isLoading,
		error: fetch.error,
		isAdding: add.isLoading,
		errorAdding: add.error,
		isUpdating: update.isLoading,
		errorUpdating: update.error,
		idUpdate: update.id,
	};
};
