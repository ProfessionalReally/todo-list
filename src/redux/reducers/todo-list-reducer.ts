import type { TodoI } from '@src/types';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import {
	addTodoRequest,
	fetchTodos,
	updateTodoRequest,
} from '@src/redux/actions/actions';
import { UNKNOWN_ERROR } from '@src/constants';

type TodoListState = {
	todos: TodoI[];
	fetch: {
		isLoading: boolean;
		error: string | null;
	};
	add: {
		isLoading: boolean;
		error: string | null;
	};
	update: {
		id: string | null;
		isLoading: boolean;
		error: string | null;
	};
};

type StatusSlice = {
	isLoading: boolean;
	error: string | null;
};

const initialStateTodoList: TodoListState = {
	todos: [],
	fetch: {
		isLoading: false,
		error: null,
	},
	add: {
		isLoading: false,
		error: null,
	},
	update: {
		id: null,
		isLoading: false,
		error: null,
	},
};

export const handlePending = (target: StatusSlice) => {
	target.isLoading = true;
	target.error = null;
};

export const handleRejected = (
	target: StatusSlice,
	action: { payload?: string },
) => {
	target.isLoading = false;
	target.error = action.payload ?? UNKNOWN_ERROR;
};

export const handleFulfilled = (target: StatusSlice) => {
	target.isLoading = false;
	target.error = null;
};

const todoListSlice = createSlice({
	name: 'todoList',
	initialState: initialStateTodoList,
	reducers: {},
	extraReducers: (builder) => {
		builder
			// FETCH
			.addCase(fetchTodos.pending, (state) => handlePending(state.fetch))
			.addCase(
				fetchTodos.fulfilled,
				(state, action: PayloadAction<TodoI[]>) => {
					state.todos = action.payload;
					handleFulfilled(state.fetch);
				},
			)
			.addCase(fetchTodos.rejected, (state, action) =>
				handleRejected(state.fetch, action),
			)

			// ADD
			.addCase(addTodoRequest.pending, (state) =>
				handlePending(state.add),
			)
			.addCase(
				addTodoRequest.fulfilled,
				(state, action: PayloadAction<TodoI>) => {
					state.todos.push(action.payload);
					handleFulfilled(state.add);
				},
			)
			.addCase(addTodoRequest.rejected, (state, action) =>
				handleRejected(state.add, action),
			)

			// UPDATE
			.addCase(updateTodoRequest.pending, (state, action) => {
				handlePending(state.update);
				state.update.id = action.meta.arg.id;
			})
			.addCase(
				updateTodoRequest.fulfilled,
				(state, action: PayloadAction<TodoI>) => {
					state.todos = state.todos.map((todo) =>
						todo.id === action.payload.id ? action.payload : todo,
					);
					handleFulfilled(state.update);
					state.update.id = null;
				},
			)
			.addCase(updateTodoRequest.rejected, (state, action) => {
				handleRejected(state.update, action);
				state.update.id = null;
			});
	},
});

export const todoListReducer = todoListSlice.reducer;
