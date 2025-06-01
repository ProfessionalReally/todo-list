import '../styles/components/todos.style.scss';
import { TodoList } from './todo-list.tsx';

export const Todos = () => {
	return (
		<section className={'todos'}>
			<div className={'todos__header'}>
				<div className={'todos__info'}>
					<p
						className={
							'todos__info-title todos__info-title--created'
						}
					>
						Created task
					</p>
					<span className={'todos__info-count'}>5</span>
				</div>
				<div className={'todos__info'}>
					<p
						className={
							'todos__info-title todos__info-title--completed'
						}
					>
						Completed
					</p>
					<span className={'todos__info-count'}>2 of 5</span>
				</div>
			</div>
			<TodoList />
		</section>
	);
};
