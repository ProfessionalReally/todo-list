import { applyMiddleware, combineReducers, createStore } from 'redux';
import { thunk } from 'redux-thunk';
import { todoListReducer } from '@src/redux/reducers/todo-list-reducer';
import { composeWithDevTools } from '@redux-devtools/extension';
import { todoCardReducer } from '@src/redux/reducers/todo-card-reducer';
import { viewSettingsReducer } from '@src/redux/reducers/view-settings-reducer';

const rootReducer = combineReducers({
	todoList: todoListReducer,
	todoCard: todoCardReducer,
	viewSettings: viewSettingsReducer,
});

export const store = createStore(
	rootReducer,
	{},
	composeWithDevTools(applyMiddleware(thunk)),
);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
