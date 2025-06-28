import '@src/styles/components/todo-list.style.scss';
import { TodoItem } from './todo-item';
import React from 'react';
import type { TodoI } from '@src/types';
import emptyTodos from '@src/assets/EmptyTodo.svg';

type TodoListProps = {
	todos: TodoI[];
};

export const TodoList: React.FC<TodoListProps> = ({ todos }) => {
	return (
		<>
			<ul className={'todo-list'}>
				{todos.length > 0 &&
					todos.map((todo: TodoI) => (
						<TodoItem key={todo.id} todo={todo} />
					))}
			</ul>
			{todos.length === 0 && (
				<div className={'empty-todos'}>
					<img
						src={emptyTodos}
						className={'empty-todos__image'}
						alt='Empty todos'
					/>
					<p className={'empty-todos__text'}>Empty...</p>
				</div>
			)}
		</>
	);
};
