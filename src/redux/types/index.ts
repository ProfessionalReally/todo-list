import type { FilterT, QueryT, TodoI } from '@src/types';

// Common Actions
export const UPDATE_TODO_REQUEST = 'UPDATE_TODO_REQUEST';
export const UPDATE_TODO_SUCCESS = 'UPDATE_TODO_SUCCESS';
export const UPDATE_TODO_FAILURE = 'UPDATE_TODO_FAILURE';

// List-Specific Actions
export const FETCH_TODOS_REQUEST = 'FETCH_TODOS_REQUEST';
export const FETCH_TODOS_SUCCESS = 'FETCH_TODOS_SUCCESS';
export const FETCH_TODOS_FAILURE = 'FETCH_TODOS_FAILURE';

export const ADD_TODO_REQUEST = 'ADD_TODO_REQUEST';
export const ADD_TODO_SUCCESS = 'ADD_TODO_SUCCESS';
export const ADD_TODO_FAILURE = 'ADD_TODO_FAILURE';

// Card-Specific Actions
export const FETCH_TODO_BY_ID_REQUEST = 'FETCH_TODO_BY_ID_REQUEST';
export const FETCH_TODO_BY_ID_SUCCESS = 'FETCH_TODO_BY_ID_SUCCESS';
export const FETCH_TODO_BY_ID_FAILURE = 'FETCH_TODO_BY_ID_FAILURE';
export const FETCH_TODO_BY_ID_SET_TIMEOUT = 'FETCH_TODO_BY_ID_SET_TIMEOUT';

export const DELETE_TODO_REQUEST = 'DELETE_TODO_REQUEST';
export const DELETE_TODO_SUCCESS = 'DELETE_TODO_SUCCESS';
export const DELETE_TODO_FAILURE = 'DELETE_TODO_FAILURE';

// View-Settings-Specific Actions
export const SET_QUERY = 'SET_QUERY';
export const SET_FILTER = 'SET_FILTER';
export const TOGGLE_SORT = 'TOGGLE_SORT';

// Action Type Definitions
type FetchTodosRequest = { type: typeof FETCH_TODOS_REQUEST };
type FetchTodosSuccess = {
	type: typeof FETCH_TODOS_SUCCESS;
	payload: TodoI[];
};
type FetchTodosFailure = {
	type: typeof FETCH_TODOS_FAILURE;
	payload: string;
};

type FetchTodoByIdRequest = { type: typeof FETCH_TODO_BY_ID_REQUEST };
type FetchTodoByIdSuccess = {
	type: typeof FETCH_TODO_BY_ID_SUCCESS;
	payload: TodoI;
};
type FetchTodoByIdFailure = {
	type: typeof FETCH_TODO_BY_ID_FAILURE;
	payload: string;
};
type FetchTodoByIdSetTimeout = {
	type: typeof FETCH_TODO_BY_ID_SET_TIMEOUT;
};

type AddTodoRequest = { type: typeof ADD_TODO_REQUEST };
type AddTodoSuccess = { type: typeof ADD_TODO_SUCCESS; payload: TodoI };
type AddTodoFailure = { type: typeof ADD_TODO_FAILURE; payload: string };

type UpdateTodoRequest = { type: typeof UPDATE_TODO_REQUEST };
type UpdateTodoSuccess = {
	type: typeof UPDATE_TODO_SUCCESS;
	payload: TodoI;
};
type UpdateTodoFailure = {
	type: typeof UPDATE_TODO_FAILURE;
	payload: string;
};

type DeleteTodoRequest = { type: typeof DELETE_TODO_REQUEST };
type DeleteTodoSuccess = { type: typeof DELETE_TODO_SUCCESS };
type DeleteTodoFailure = {
	type: typeof DELETE_TODO_FAILURE;
	payload: string;
};

type setQuery = { type: typeof SET_QUERY; payload: QueryT };
type setFilter = {
	type: typeof SET_FILTER;
	payload: FilterT;
};
type toggleSort = { type: typeof TOGGLE_SORT };

// Reusable Union Types
type SharedUpdateActions =
	| UpdateTodoRequest
	| UpdateTodoSuccess
	| UpdateTodoFailure;

export type TodoListActions =
	| FetchTodosRequest
	| FetchTodosSuccess
	| FetchTodosFailure
	| AddTodoRequest
	| AddTodoSuccess
	| AddTodoFailure
	| SharedUpdateActions;

export type TodoCardActions =
	| FetchTodoByIdRequest
	| FetchTodoByIdSuccess
	| FetchTodoByIdFailure
	| FetchTodoByIdSetTimeout
	| SharedUpdateActions
	| DeleteTodoRequest
	| DeleteTodoSuccess
	| DeleteTodoFailure;

export type ViewSettingsActions = setQuery | setFilter | toggleSort;
