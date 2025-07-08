import { todoListReducer } from '@src/redux/reducers/todo-list-reducer';
import { configureStore } from '@reduxjs/toolkit';
import { viewSettingsReducer } from '@src/redux/reducers/view-settings-reducer';
import { todoCardReducer } from '@src/redux/reducers/todo-card-reducer';

export const store = configureStore({
	reducer: {
		todoList: todoListReducer,
		todoCard: todoCardReducer,
		viewSettings: viewSettingsReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
