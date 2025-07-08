import {
	type FilterT,
	type QueryT,
	type SortT,
	FILTER_OPTIONS,
	SORT_OPTIONS,
} from '@src/types';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type ViewSettingsState = {
	query: QueryT;
	sort: SortT;
	filter: FilterT;
};

const initialStateViewSettings: ViewSettingsState = {
	query: '',
	sort: SORT_OPTIONS.none,
	filter: FILTER_OPTIONS.all,
};

const toggleSort = (sort: any) => {
	if (sort === SORT_OPTIONS.none) return SORT_OPTIONS.asc;
	else if (sort === SORT_OPTIONS.asc) return SORT_OPTIONS.desc;
	return SORT_OPTIONS.none;
};

const ViewSettingsSlice = createSlice({
	name: 'viewSettings',
	initialState: initialStateViewSettings,
	reducers: {
		setQueryAction(state, action: PayloadAction<QueryT>) {
			state.query = action.payload;
		},
		setFilterAction(state, action: PayloadAction<FilterT>) {
			state.filter = action.payload;
		},
		toggleSortAction(state) {
			state.sort = toggleSort(state.sort);
		},
	},
});

export const { setQueryAction, setFilterAction, toggleSortAction } =
	ViewSettingsSlice.actions;
export const viewSettingsReducer = ViewSettingsSlice.reducer;
