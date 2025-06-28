import type { TodoI } from '@src/types';
import type { TodoListActions } from '@src/redux/types';
import * as actions from '@src/redux/types';

type TodoListState = {
	todos: TodoI[];
	isLoading: boolean;
	error: string | null;
};

const initialStateTodoList: TodoListState = {
	todos: [],
	isLoading: false,
	error: null,
};

export const todoListReducer = (
	state: TodoListState = initialStateTodoList,
	action: TodoListActions,
) => {
	switch (action.type) {
		case actions.FETCH_TODOS_REQUEST:
		case actions.ADD_TODO_REQUEST:
		case actions.UPDATE_TODO_REQUEST:
			return {
				...state,
				isLoading: true,
				error: null,
			};

		case actions.FETCH_TODOS_SUCCESS:
			return {
				...state,
				todos: action.payload,
				isLoading: false,
				error: null,
			};

		case actions.ADD_TODO_SUCCESS:
			return {
				...state,
				todos: [...state.todos, action.payload],
				isLoading: false,
				error: null,
			};

		case actions.UPDATE_TODO_SUCCESS: {
			return {
				...state,
				todos: state.todos.map((todo) =>
					todo.id === action.payload.id ? action.payload : todo,
				),
				isLoading: false,
				error: null,
			};
		}

		case actions.FETCH_TODOS_FAILURE:
		case actions.ADD_TODO_FAILURE:
		case actions.UPDATE_TODO_FAILURE:
			return {
				...state,
				isLoading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};
