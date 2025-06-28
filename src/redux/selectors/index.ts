import type { RootState } from '@src/redux/store';
import { createSelector } from 'reselect';
import { FILTER_OPTIONS, SORT_OPTIONS } from '@src/types';

export const selectTodoList = (state: RootState) => state.todoList;
export const selectTodoCard = (state: RootState) => state.todoCard;
export const selectViewSettings = (state: RootState) => state.viewSettings;

export const selectTodos = (state: RootState) => state.todoList.todos;
export const selectQuery = (state: RootState) => state.viewSettings.query;
export const selectSort = (state: RootState) => state.viewSettings.sort;
export const selectFilter = (state: RootState) => state.viewSettings.filter;

export const selectFilteredSortedTodos = createSelector(
	[selectTodos, selectQuery, selectSort, selectFilter],
	(todos, query, sort, filter) => {
		let result = todos;

		if (query.trim()) {
			result = todos.filter((todo) =>
				todo.title.toLowerCase().includes(query.toLowerCase()),
			);
		}

		if (sort !== SORT_OPTIONS.none) {
			result = [...result].sort((a, b) =>
				sort
					? a.title.localeCompare(b.title)
					: b.title.localeCompare(a.title),
			);
		}

		if (filter !== FILTER_OPTIONS.all) {
			result = result.filter((todo) => {
				if (filter === FILTER_OPTIONS.completed) return todo.completed;
				return !todo.completed;
			});
		}

		return result;
	},
);
