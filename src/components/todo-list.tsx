import '@src/styles/components/todo-list.style.scss';
import { TodoItem } from './todo-item';
import React from 'react';
import type { TodoI } from '@src/types';
import emptyTodos from '@src/assets/EmptyTodo.svg';
import { useTodoList } from '@src/hooks/use-todo-list.tsx';

type TodoListProps = {
	todos: TodoI[];
};

export const TodoList: React.FC<TodoListProps> = ({ todos }) => {
	const { isUpdating, idUpdate } = useTodoList();

	return (
		<>
			<ul className={'todo-list'}>
				{todos.length > 0 &&
					todos.map((todo: TodoI) => (
						<TodoItem
							key={todo.id}
							todo={todo}
							isUpdating={isUpdating && idUpdate === todo.id}
						/>
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
