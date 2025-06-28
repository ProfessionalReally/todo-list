import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectFilteredSortedTodos,
	selectTodoList,
} from '@src/redux/selectors';
import { fetchTodos } from '@src/redux/actions';
import type { AppDispatch } from '@src/redux/store';

export const useTodoList = () => {
	const dispatch = useDispatch<AppDispatch>();
	const { isLoading, error } = useSelector(selectTodoList);
	const todos = useSelector(selectFilteredSortedTodos);

	useEffect(() => {
		dispatch(fetchTodos());
	}, [dispatch]);

	return {
		todos,
		isLoading,
		error,
	};
};
