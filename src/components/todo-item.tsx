import '@src/styles/components/todo-item.style.scss';
import { Checkbox } from './ui/checkbox';
import React, { memo, useCallback } from 'react';
import type { TodoI } from '@src/types';
import { Link } from 'react-router-dom';
import { useTodoActions } from '@src/hooks/use-todo-actions';
import { Spinner } from '@src/components/ui/spinner';

type TodoItemProps = {
	todo: TodoI;
	isUpdating?: boolean;
};

export const TodoItem: React.FC<TodoItemProps> = memo(
	({ todo, isUpdating }) => {
		const { updateTodo } = useTodoActions();

		const onToggleCompleted = useCallback(() => {
			updateTodo(todo.id, { completed: !todo.completed });
		}, [todo, updateTodo]);

		return (
			<li className={'todo-list__item'}>
				<Checkbox
					id={todo.id}
					onChange={onToggleCompleted}
					checked={todo.completed}
					disabled={isUpdating}
				/>
				<Link
					to={`/todo/${todo.id}`}
					className={`todo-list__item-text ${todo.completed ? 'todo-list__item-text--completed' : ''}`}
				>
					{todo.title}
				</Link>
				<div className={'todo-list__item__spinner-placeholder'}>
					{isUpdating && <Spinner size={20} />}
				</div>
			</li>
		);
	},
	(prev, next) => {
		return (
			prev.todo.id === next.todo.id &&
			prev.todo.title === next.todo.title &&
			prev.todo.completed === next.todo.completed &&
			prev.isUpdating === next.isUpdating
		);
	},
);
