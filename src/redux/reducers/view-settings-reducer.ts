import type { ViewSettingsActions } from '@src/redux/types';
import * as actions from '@src/redux/types';
import {
	type FilterT,
	FILTER_OPTIONS,
	type QueryT,
	type SortT,
	SORT_OPTIONS,
} from '@src/types';

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

export const viewSettingsReducer = (
	state: ViewSettingsState = initialStateViewSettings,
	action: ViewSettingsActions,
): ViewSettingsState => {
	switch (action.type) {
		case actions.SET_QUERY:
			return {
				...state,
				query: action.payload,
			};
		case actions.SET_FILTER:
			return {
				...state,
				filter: action.payload,
			};
		case actions.TOGGLE_SORT:
			let newSort = state.sort;
			if (newSort === SORT_OPTIONS.none) newSort = SORT_OPTIONS.asc;
			else if (newSort === SORT_OPTIONS.asc) newSort = SORT_OPTIONS.desc;
			else newSort = SORT_OPTIONS.none;
			return {
				...state,
				sort: newSort,
			};
		default:
			return state;
	}
};
