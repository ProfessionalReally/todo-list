import { Header } from '../components/header';
import { Todos } from '../components/todos';
import '../styles/pages/todo-page.style.scss';
import { Spinner } from '../components/ui/spinner';
import { Error } from '../components/ui/error';
import { useTodos } from '../hooks/use-todos';
import React, { useMemo, useState } from 'react';
import { useDebounce } from '../hooks/use-debounce.tsx';

export const TodoPage = () => {
	const [query, setQuery] = useState<string>('');
	const [sortAsc, setSortAsc] = useState<boolean | null>(null);

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
		<div className={'todo-page'}>
			<Header
				addTodo={addTodo}
				onChangeQuery={onChangeQuery}
				onToggleSort={onToggleSort}
				query={query}
				sortAsc={sortAsc}
			/>
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
