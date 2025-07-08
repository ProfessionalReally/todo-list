import { selectTodoCard } from '@src/redux/selectors';
import { useEffect } from 'react';
import { fetchTodoById } from '@src/redux/actions/actions';
import { useAppDispatch, useAppSelector } from '@src/redux/hooks';

export const useTodoCard = (id: string) => {
	const dispatch = useAppDispatch();

	const { todo, isLoading, error } = useAppSelector(selectTodoCard);

	useEffect(() => {
		if (!id) return;

		dispatch(fetchTodoById({ id }));
	}, [dispatch, id]);

	return {
		todo,
		isLoading,
		error,
	};
};
