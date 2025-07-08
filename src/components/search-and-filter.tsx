import { TextField } from '@src/components/ui/text-field';
import { Select } from '@src/components/ui/select';
import { FILTER_OPTIONS, type FilterT } from '@src/types';
import React, { useEffect, useState } from 'react';
import { useViewSettings } from '@src/hooks/use-view-settings';
import { useDebounce } from '@src/hooks/use-debounce';
import { DEBOUNCE_DELAY } from '@src/constants';
import '@src/styles/components/search-and-filter.style.scss';

export const SearchAndFilter = () => {
	const [queryPage, setQueryPage] = useState<string>('');

	const { filter, onChangeFilter, onChangeQuery } = useViewSettings();

	const debouncedQuery = useDebounce(queryPage, DEBOUNCE_DELAY);

	useEffect(() => {
		onChangeQuery(debouncedQuery);
	}, [debouncedQuery]);

	const onChangeQueryPage = (event: React.ChangeEvent<HTMLInputElement>) => {
		setQueryPage(event.target.value);
	};

	return (
		<div className={'search-and-filter'}>
			<TextField
				value={queryPage}
				onChange={onChangeQueryPage}
				className={'search-and-filter__input-search'}
				placeholder='Search...'
			/>
			<Select
				value={filter}
				onChange={(e) => onChangeFilter(e.target.value as FilterT)}
				className={'search-and-filter__select-filter'}
			>
				{Object.entries(FILTER_OPTIONS).map(([key, value]) => (
					<option key={value} value={value}>
						{key.charAt(0).toUpperCase() + key.slice(1)}
					</option>
				))}
			</Select>
		</div>
	);
};
