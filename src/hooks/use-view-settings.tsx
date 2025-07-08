import { selectViewSettings } from '@src/redux/selectors';
import type { FilterT, QueryT } from '@src/types';
import {
	setFilterAction,
	setQueryAction,
	toggleSortAction,
} from '@src/redux/reducers/view-settings-reducer';
import { useAppDispatch, useAppSelector } from '@src/redux/hooks';

export const useViewSettings = () => {
	const dispatch = useAppDispatch();
	const viewSettingsState = useAppSelector(selectViewSettings);

	const onChangeQuery = (query: QueryT) => dispatch(setQueryAction(query));

	const onChangeFilter = (filter: FilterT) =>
		dispatch(setFilterAction(filter));

	const onToggleSort = () => dispatch(toggleSortAction());

	return {
		...viewSettingsState,
		onChangeQuery,
		onChangeFilter,
		onToggleSort,
	};
};
