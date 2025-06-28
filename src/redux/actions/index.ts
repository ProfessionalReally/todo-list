import type { AppDispatch } from '@src/redux/store';
import * as actions from '@src/redux/types/';
import type { FilterT, QueryT, TodoI } from '@src/types';
import {
	deleteTodo,
	getTodoById,
	getTodos,
	postTodo,
	updateTodo,
} from '@src/services';

const UNKNOWN_ERROR = 'Unknown error';
const LOADING_TIMEOUT = 5000;

export const fetchTodos = () => async (dispatch: AppDispatch) => {
	dispatch({ type: actions.FETCH_TODOS_REQUEST });
	try {
		dispatch({
			type: actions.FETCH_TODOS_SUCCESS,
			payload: await getTodos(),
		});
	} catch (error) {
		dispatch({
			type: actions.FETCH_TODOS_FAILURE,
			payload: error instanceof Error ? error.message : UNKNOWN_ERROR,
		});
	}
};

export const fetchTodoById = (id: string) => async (dispatch: AppDispatch) => {
	dispatch({ type: actions.FETCH_TODO_BY_ID_REQUEST });

	const timeoutId = setTimeout(() => {
		dispatch({ type: actions.FETCH_TODO_BY_ID_SET_TIMEOUT });
	}, LOADING_TIMEOUT);

	try {
		dispatch({
			type: actions.FETCH_TODO_BY_ID_SUCCESS,
			payload: await getTodoById(id),
		});
	} catch (error) {
		dispatch({
			type: actions.FETCH_TODO_BY_ID_FAILURE,
			payload: error instanceof Error ? error.message : UNKNOWN_ERROR,
		});
	} finally {
		clearTimeout(timeoutId);
	}
};

export const addTodoRequest =
	(title: string) => async (dispatch: AppDispatch) => {
		dispatch({ type: actions.ADD_TODO_REQUEST });
		try {
			dispatch({
				type: actions.ADD_TODO_SUCCESS,
				payload: await postTodo(title),
			});
		} catch (error) {
			dispatch({
				type: actions.ADD_TODO_FAILURE,
				payload: error instanceof Error ? error.message : UNKNOWN_ERROR,
			});
		}
	};

export const updateTodoRequest =
	(id: string, updatedFields: Partial<TodoI>) =>
	async (dispatch: AppDispatch) => {
		dispatch({ type: actions.UPDATE_TODO_REQUEST });
		try {
			dispatch({
				type: actions.UPDATE_TODO_SUCCESS,
				payload: await updateTodo(id, updatedFields),
			});
		} catch (error) {
			dispatch({
				type: actions.UPDATE_TODO_FAILURE,
				payload: error instanceof Error ? error.message : UNKNOWN_ERROR,
			});
		}
	};

export const deleteTodoRequest =
	(id: string) => async (dispatch: AppDispatch) => {
		dispatch({ type: actions.DELETE_TODO_REQUEST });
		try {
			dispatch({
				type: actions.DELETE_TODO_SUCCESS,
				payload: await deleteTodo(id),
			});
		} catch (error) {
			dispatch({
				type: actions.DELETE_TODO_FAILURE,
				payload: error instanceof Error ? error.message : UNKNOWN_ERROR,
			});
		}
	};

export const setQueryAction = (query: QueryT) => ({
	type: actions.SET_QUERY,
	payload: query,
});

export const setFilterAction = (filter: FilterT) => ({
	type: actions.SET_FILTER,
	payload: filter,
});

export const toggleSortAction = () => ({
	type: actions.TOGGLE_SORT,
});
