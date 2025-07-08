import type { TodoI } from '@src/types';
import {
	deleteTodo,
	getTodoById,
	getTodos,
	postTodo,
	updateTodo,
} from '@src/services';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
	TODO_CARD_DELETE_TODO,
	TODO_CARD_FETCH_TODO_BY_ID,
	TODO_CARD_UPDATE_TODO,
	TODO_LIST_ADD_TODO,
	TODO_LIST_FETCH_TODOS,
} from '@src/redux/actions/actionTypes';
import { UNKNOWN_ERROR } from '@src/constants';

export const fetchTodos = createAsyncThunk<
	TodoI[],
	void,
	{
		rejectValue: string;
	}
>(TODO_LIST_FETCH_TODOS, async (_, { rejectWithValue }) => {
	try {
		return await getTodos();
	} catch (error) {
		return rejectWithValue(
			error instanceof Error ? error.message : UNKNOWN_ERROR,
		);
	}
});

export const addTodoRequest = createAsyncThunk<
	TodoI,
	{ title: string },
	{ rejectValue: string }
>(TODO_LIST_ADD_TODO, async ({ title }, { rejectWithValue }) => {
	try {
		return await postTodo(title);
	} catch (error) {
		return rejectWithValue(
			error instanceof Error ? error.message : UNKNOWN_ERROR,
		);
	}
});

export const fetchTodoById = createAsyncThunk<
	TodoI,
	{ id: string },
	{ rejectValue: string }
>(TODO_CARD_FETCH_TODO_BY_ID, async ({ id }, { rejectWithValue }) => {
	try {
		return await getTodoById(id);
	} catch (error) {
		return rejectWithValue(
			error instanceof Error ? error.message : UNKNOWN_ERROR,
		);
	}
});

export const updateTodoRequest = createAsyncThunk<
	TodoI,
	{ id: string; updatedFields: Partial<TodoI> },
	{ rejectValue: string }
>(TODO_CARD_UPDATE_TODO, async ({ id, updatedFields }, { rejectWithValue }) => {
	try {
		return await updateTodo(id, updatedFields);
	} catch (error) {
		return rejectWithValue(
			error instanceof Error ? error.message : UNKNOWN_ERROR,
		);
	}
});

export const deleteTodoRequest = createAsyncThunk<
	{},
	{ id: string },
	{ rejectValue: string }
>(TODO_CARD_DELETE_TODO, async ({ id }, { rejectWithValue }) => {
	try {
		return await deleteTodo(id);
	} catch (error) {
		return rejectWithValue(
			error instanceof Error ? error.message : UNKNOWN_ERROR,
		);
	}
});
