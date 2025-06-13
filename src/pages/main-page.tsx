import { Header } from '../components/header';
import { Todos } from '../components/todos';
import '../styles/pages/main-page.style.scss';
import { Spinner } from '../components/ui/spinner';
import { Error } from '../components/ui/error';
import { useTodos } from '../hooks/use-todos';
import React, { useMemo, useState } from 'react';
import { useDebounce } from '../hooks/use-debounce';
import { Button } from '../components/ui/button';
import { TextField } from '../components/ui/text-field';
import { Icon } from '../components/ui/icon';
import { ArrowDownAZ, ArrowUpAZ, CirclePlus } from 'lucide-react';
import { Select } from '../components/ui/select';
import {
	useTodoViewContext,
	filterOptions,
} from '../context/todo-view-context';
import type { Sort, Filter } from '../context/todo-view-context';

const getSortIcon = (sort: Sort) => {
	if (sort === true) return <Icon Icon={ArrowDownAZ} />;
	if (sort === false) return <Icon Icon={ArrowUpAZ} />;
	return null;
};

export const MainPage = () => {
	const [query, setQuery] = useState<string>('');
	const [titleTodo, setTitleTodo] = useState<string>('');

	const { sort, setSort, filter, setFilter } = useTodoViewContext();

	const { todos, isLoading, error, updateTodo, deleteTodo, addTodo } =
		useTodos();

	const debouncedQuery = useDebounce(query, 500);

	const searchedTodos = useMemo(() => {
		if (!query.trim()) return todos;
		return (
			todos.filter((todo) =>
				todo.title.toLowerCase().includes(debouncedQuery.toLowerCase()),
			) || []
		);
	}, [todos, debouncedQuery]);

	const filteredSortedTodos = useMemo(() => {
		return [...searchedTodos]
			.sort((a, b) => {
				if (sort === null) return 0;
				if (sort) return a.title.localeCompare(b.title);
				return b.title.localeCompare(a.title);
			})
			.filter((todo) => {
				if (filter === filterOptions.completed) return todo.completed;
				if (filter === filterOptions.uncompleted)
					return !todo.completed;
				return todo;
			});
	}, [searchedTodos, sort, filter]);

	const onChangeAddTodoInput = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		setTitleTodo(event.target.value);
	};
	const onSubmitAddTodo = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!titleTodo) return;
		addTodo(titleTodo);
		setTitleTodo('');
	};

	const onChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
		setQuery(event.target.value);
	};

	const onChangeFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setFilter(event.target.value as Filter);
	};

	const onToggleSort = () => {
		setSort((prev: Sort) => {
			if (prev === null) return true;
			if (prev) return false;
			return null;
		});
	};

	return (
		<div className={'main-page'}>
			<Header>
				<div className={'header__panel'}>
					<div className={'header__controls'}>
						<Button
							onClick={onToggleSort}
							className={'header__button--filter'}
						>
							Sort
							{getSortIcon(sort)}
						</Button>
						<form
							className={'header__form'}
							onSubmit={onSubmitAddTodo}
						>
							<TextField
								value={titleTodo}
								onChange={onChangeAddTodoInput}
								className={'header__input-create'}
								placeholder='Add a new task'
							/>
							<Button
								onClick={() => {}}
								type='submit'
								className={'header__button--create'}
							>
								Create
								<Icon Icon={CirclePlus} />
							</Button>
						</form>
					</div>
					<div className={'header__search'}>
						<TextField
							value={query}
							onChange={onChangeQuery}
							className={'header__input-search'}
							placeholder='Search...'
						/>
						<Select value={filter} onChange={onChangeFilter}>
							<option value='all'>All</option>
							<option value='completed'>Completed</option>
							<option value='uncompleted'>Uncompleted</option>
						</Select>
					</div>
				</div>
			</Header>
			{isLoading && <Spinner />}
			{error && <Error>{error.message}</Error>}
			{!isLoading && !error && (
				<Todos
					todos={filteredSortedTodos}
					updateTodo={updateTodo}
					deleteTodo={deleteTodo}
				/>
			)}
		</div>
	);
};
