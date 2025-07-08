import { useAppDispatch } from '@src/redux/hooks';
import { useEffect } from 'react';
import { fetchTodos } from '@src/redux/actions/actions.ts';

export const useFetchTodoList = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchTodos());
	}, [dispatch]);
};
