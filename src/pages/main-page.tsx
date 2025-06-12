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

const getSortIcon = (sortAsc: boolean | null) => {
	if (sortAsc === true) return <Icon Icon={ArrowDownAZ} />;
	if (sortAsc === false) return <Icon Icon={ArrowUpAZ} />;
	return null;
};

export const MainPage = () => {
	const [query, setQuery] = useState<string>('');
	const [sortAsc, setSortAsc] = useState<boolean | null>(null);
	const [titleTodo, setTitleTodo] = useState<string>('');

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

	const sortedTodos = useMemo(() => {
		return [...searchedTodos].sort((a, b) => {
			if (sortAsc === null) return 0;
			if (sortAsc) return a.title.localeCompare(b.title);
			return b.title.localeCompare(a.title);
		});
	}, [searchedTodos, sortAsc]);

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

	const onToggleSort = () => {
		setSortAsc((prev) => {
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
							Filter
							{getSortIcon(sortAsc)}
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
					<TextField
						value={query}
						onChange={onChangeQuery}
						className={'header__search'}
						placeholder='Search...'
					/>
				</div>
			</Header>
			{isLoading && <Spinner />}
			{error && <Error>{error.message}</Error>}
			{!isLoading && !error && (
				<Todos
					todos={sortedTodos}
					updateTodo={updateTodo}
					deleteTodo={deleteTodo}
				/>
			)}
		</div>
	);
};
