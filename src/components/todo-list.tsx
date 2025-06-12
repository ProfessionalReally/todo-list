import '../styles/components/todo-list.style.scss';
import { TodoItem } from './todo-item';
import React from 'react';
import type { Todo } from '../types';
import emptyTodos from '../assets/EmptyTodo.svg';

type TodoListProps = {
	todos: Todo[];
	updateTodo: (id: string, updatedFields: Partial<Todo>) => void;
};

export const TodoList: React.FC<TodoListProps> = ({ todos, updateTodo }) => {
	return (
		<>
			<ul className={'todo-list'}>
				{todos.length > 0 &&
					todos.map((todo: Todo) => (
						<TodoItem
							key={todo.id}
							todo={todo}
							updateTodo={updateTodo}
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
