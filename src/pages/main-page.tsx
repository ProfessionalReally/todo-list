import { Header } from '@src/components/header';
import { Todos } from '@src/components/todos';
import { Spinner } from '@src/components/ui/spinner';
import { Error } from '@src/components/ui/error';
import { useTodoList } from '@src/hooks/use-todo-list';
import { useFetchTodoList } from '@src/hooks/use-fetch-todo-list';
import { HeaderPanel } from '@src/components/header-panel';
import '@src/styles/pages/main-page.style.scss';

export const MainPage = () => {
	useFetchTodoList();

	const { todos, isLoading, error } = useTodoList();

	return (
		<div className={'main-page'}>
			<Header>
				<HeaderPanel />
			</Header>
			{isLoading ? (
				<Spinner fullScreen size={100} />
			) : error ? (
				<Error>{error}</Error>
			) : (
				<Todos todos={todos} />
			)}
		</div>
	);
};
