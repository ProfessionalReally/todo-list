import { Header } from '@src/components/header';
import { Todos } from '@src/components/todos';
import '@src/styles/pages/main-page.style.scss';
import { Spinner } from '@src/components/ui/spinner';
import { Error } from '@src/components/ui/error';
import { useTodoList } from '@src/hooks/use-todo-list';
import React, { useEffect, useState } from 'react';
import { useDebounce } from '@src/hooks/use-debounce';
import { Button } from '@src/components/ui/button';
import { TextField } from '@src/components/ui/text-field';
import { Icon } from '@src/components/ui/icon';
import { ArrowDownAZ, ArrowUpAZ, CirclePlus, ListFilter } from 'lucide-react';
import { Select } from '@src/components/ui/select';
import { DEBOUNCE_DELAY } from '@src/constants';
import { useTodoActions } from '@src/hooks/use-todo-actions';
import { FILTER_OPTIONS, type FilterT, type SortT } from '@src/types';
import { useViewSettings } from '@src/hooks/use-view-settings';

const getSortIcon = (sort: SortT) => {
	if (sort === true) return <Icon Icon={ArrowDownAZ} />;
	if (sort === false) return <Icon Icon={ArrowUpAZ} />;
	return <Icon Icon={ListFilter} />;
};

export const MainPage = () => {
	const [queryPage, setQueryPage] = useState<string>('');
	const { sort, filter, onChangeFilter, onChangeQuery, onToggleSort } =
		useViewSettings();
	const { todos, isLoading, error } = useTodoList();
	const { addTodo } = useTodoActions();

	const debouncedQuery = useDebounce(queryPage, DEBOUNCE_DELAY);

	useEffect(() => {
		onChangeQuery(debouncedQuery);
	}, [debouncedQuery]);

	const onSubmitAddTodo = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = event.currentTarget as HTMLFormElement & {
			title: { value: string };
		};

		const inputValue = form.title.value.trim();
		if (!inputValue) return;

		addTodo(inputValue);
		form.reset();
	};

	const onChangeQueryPage = (event: React.ChangeEvent<HTMLInputElement>) => {
		setQueryPage(event.target.value);
	};

	return (
		<div className={'main-page'}>
			<Header>
				<div className={'header__panel'}>
					<div className={'header__controls'}>
						<Button
							onClick={onToggleSort}
							className={'header__button--sort'}
							disabled={isLoading}
						>
							Sort
							{getSortIcon(sort)}
						</Button>
						<form
							className={'header__form'}
							onSubmit={onSubmitAddTodo}
						>
							<TextField
								name={'title'}
								defaultValue={''}
								disabled={isLoading}
								className={'header__input-create'}
								placeholder='Add a new task'
							/>
							<Button
								onClick={() => {}}
								type='submit'
								disabled={isLoading}
								className={'header__button--create'}
							>
								Create
								<Icon Icon={CirclePlus} />
							</Button>
						</form>
					</div>
					<div className={'header__search'}>
						<TextField
							value={queryPage}
							onChange={onChangeQueryPage}
							disabled={isLoading}
							className={'header__input-search'}
							placeholder='Search...'
						/>
						<Select
							value={filter}
							onChange={(e) =>
								onChangeFilter(e.target.value as FilterT)
							}
							disabled={isLoading}
							className={'header__select-filter'}
						>
							{Object.entries(FILTER_OPTIONS).map(
								([key, value]) => (
									<option key={value} value={value}>
										{key.charAt(0).toUpperCase() +
											key.slice(1)}
									</option>
								),
							)}
						</Select>
					</div>
				</div>
			</Header>
			{isLoading && <Spinner />}
			{error && <Error>{error}</Error>}
			{!error && <Todos todos={todos} />}
		</div>
	);
};
