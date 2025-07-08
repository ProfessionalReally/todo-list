import type { TodoI } from '@src/types';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import {
	deleteTodoRequest,
	fetchTodoById,
	updateTodoRequest,
} from '@src/redux/actions/actions';
import { UNKNOWN_ERROR } from '@src/constants';

type TodoCardState = {
	todo: TodoI | null;
	isLoading: boolean;
	error: string | null;
};

const initialStateTodoCard: TodoCardState = {
	todo: null,
	isLoading: false,
	error: null,
};

const handlePending = (state: TodoCardState) => {
	state.isLoading = true;
	state.error = null;
};

const handleFulfilled = (
	state: TodoCardState,
	action?: PayloadAction<TodoI>,
) => {
	state.todo = action?.payload ?? null;
	state.isLoading = false;
	state.error = null;
};

const handleRejected = (
	state: TodoCardState,
	action: PayloadAction<string | undefined>,
) => {
	state.isLoading = false;
	state.error = action.payload ?? UNKNOWN_ERROR;
};

const todoCardSlice = createSlice({
	name: 'todoCard',
	initialState: initialStateTodoCard,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(fetchTodoById.pending, handlePending)
			.addCase(fetchTodoById.fulfilled, (state, action) => {
				handleFulfilled(state, action);
			})
			.addCase(fetchTodoById.rejected, handleRejected)

			.addCase(updateTodoRequest.pending, handlePending)
			.addCase(updateTodoRequest.fulfilled, (state, action) => {
				handleFulfilled(state, action);
			})
			.addCase(updateTodoRequest.rejected, handleRejected)

			.addCase(deleteTodoRequest.pending, handlePending)
			.addCase(deleteTodoRequest.fulfilled, (state) => {
				handleFulfilled(state);
			})
			.addCase(deleteTodoRequest.rejected, handleRejected);
	},
});

export const todoCardReducer = todoCardSlice.reducer;
