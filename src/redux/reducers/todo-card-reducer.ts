import type { TodoI } from '@src/types';
import { type TodoCardActions } from '@src/redux/types';
import * as actions from '@src/redux/types';

type TodoCardState = {
	todo: TodoI | null;
	isLoading: boolean;
	error: string | null;
	isTimeout: boolean;
};

const initialStateTodoCard: TodoCardState = {
	todo: null,
	isLoading: false,
	error: null,
	isTimeout: false,
};

export const todoCardReducer = (
	state: TodoCardState = initialStateTodoCard,
	action: TodoCardActions,
): TodoCardState => {
	switch (action.type) {
		case actions.FETCH_TODO_BY_ID_REQUEST:
		case actions.UPDATE_TODO_REQUEST:
		case actions.DELETE_TODO_REQUEST:
			return { ...state, isLoading: true, error: null, isTimeout: false };

		case actions.FETCH_TODO_BY_ID_SUCCESS:
		case actions.UPDATE_TODO_SUCCESS:
			return {
				...state,
				todo: action.payload,
				isLoading: false,
				error: null,
			};

		case actions.FETCH_TODO_BY_ID_FAILURE:
		case actions.UPDATE_TODO_FAILURE:
		case actions.DELETE_TODO_FAILURE:
			return { ...state, isLoading: false, error: action.payload };

		case actions.FETCH_TODO_BY_ID_SET_TIMEOUT:
			return { ...state, isLoading: false, isTimeout: true };

		case actions.DELETE_TODO_SUCCESS:
			return { ...state, todo: null, isLoading: false, error: null };

		default:
			return state;
	}
};
