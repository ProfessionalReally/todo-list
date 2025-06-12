import '../styles/components/todo-item.style.scss';
import { Checkbox } from './ui/checkbox';
import React, { memo, useCallback } from 'react';
import type { Todo } from '../types';
import { Link } from 'react-router-dom';

type TodoItemProps = {
	todo: Todo;
	updateTodo: (id: string, updatedFields: Partial<Todo>) => void;
};

export const TodoItem: React.FC<TodoItemProps> = memo(
	({ todo, updateTodo }) => {
		const onToggleCompleted = useCallback(() => {
			updateTodo(todo.id, { completed: !todo.completed });
		}, [todo, updateTodo]);

		return (
			<li className={'todo-list__item'}>
				<Checkbox
					id={todo.id}
					onChange={onToggleCompleted}
					checked={todo.completed}
				/>
				<Link
					to={`/todo/${todo.id}`}
					className={`todo-list__item-text ${todo.completed ? 'todo-list__item-text--completed' : ''}`}
				>
					{todo.title}
				</Link>
			</li>
		);
	},
	(prev, next) => {
		return (
			prev.todo.id === next.todo.id &&
			prev.todo.title === next.todo.title &&
			prev.todo.completed === next.todo.completed
		);
	},
);
