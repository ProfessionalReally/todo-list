import { useDispatch, useSelector } from 'react-redux';
import { selectTodoCard } from '@src/redux/selectors';
import { useEffect } from 'react';
import type { AppDispatch } from '@src/redux/store';
import { fetchTodoById } from '@src/redux/actions';

export const useTodoCard = (id: string) => {
	const dispatch = useDispatch<AppDispatch>();

	const { todo, isLoading, error, isTimeout } = useSelector(selectTodoCard);

	useEffect(() => {
		if (!id) return;
		dispatch(fetchTodoById(id));
	}, [dispatch]);

	return {
		todo,
		isLoading,
		error,
		isTimeout,
	};
};
