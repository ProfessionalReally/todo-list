import '../styles/components/todos.style.scss';
import { TodoList } from './todo-list';
import type { Todo } from '../types';
import React, { useMemo } from 'react';

type TodosProps = {
	todos: Todo[];
	updateTodo: (id: string, updatedFields: Partial<Todo>) => void;
	deleteTodo: (id: string) => void;
};

export const Todos: React.FC<TodosProps> = ({ todos, updateTodo }) => {
	const completedTodos = useMemo(
		() => todos.filter((todo) => todo.completed),
		[todos],
	);

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
					<span className={'todos__info-count'}>{todos.length}</span>
				</div>
				<div className={'todos__info'}>
					<p
						className={
							'todos__info-title todos__info-title--completed'
						}
					>
						Completed
					</p>
					<span className={'todos__info-count'}>
						{completedTodos.length} of {todos.length}
					</span>
				</div>
			</div>
			<TodoList todos={todos} updateTodo={updateTodo} />
		</section>
	);
};
