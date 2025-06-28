import { useDispatch, useSelector } from 'react-redux';
import { selectViewSettings } from '@src/redux/selectors';
import type { AppDispatch } from '@src/redux/store';
import type { FilterT, QueryT } from '@src/types';
import {
	setFilterAction,
	setQueryAction,
	toggleSortAction,
} from '@src/redux/actions';

export const useViewSettings = () => {
	const dispatch = useDispatch<AppDispatch>();
	const viewSettingsState = useSelector(selectViewSettings);

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
