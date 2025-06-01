import { Header } from '../components/header.tsx';
import { Todos } from '../components/todos.tsx';
import '../styles/pages/todo-page.style.scss';

export const TodoPage = () => {
	return (
		<div className={'todo-page'}>
			<Header />
			<Todos />
		</div>
	);
};
