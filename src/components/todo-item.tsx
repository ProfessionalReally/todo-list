import '../styles/components/todo-item.style.scss';
import { Trash2, Pencil } from 'lucide-react';
import { Checkbox } from './ui/checkbox';
import React, { memo, useCallback } from 'react';
import { Icon } from './ui/icon';
import type { Todo } from '../types';

type TodoItemProps = {
	todo: Todo;
	updateTodo: (id: string, updatedFields: Partial<Todo>) => void;
	openEditModal: (todo: Todo) => void;
	openDeleteModal: (todo: Todo) => void;
};

export const TodoItem: React.FC<TodoItemProps> = memo(
	({ todo, updateTodo, openEditModal, openDeleteModal }) => {
		const onToggleCompleted = useCallback(() => {
			updateTodo(todo.id, { completed: !todo.completed });
		}, [todo, updateTodo]);

		const onClickDelete = useCallback(() => {
			openDeleteModal(todo);
		}, [todo, openDeleteModal]);

		const onClickEdit = useCallback(() => {
			openEditModal(todo);
		}, [todo, openEditModal]);

		return (
			<li className={'todo-list__item'}>
				<Checkbox
					id={todo.id}
					onChange={onToggleCompleted}
					checked={todo.completed}
				/>
				<p
					className={`todo-list__item-text ${todo.completed && 'todo-list__item-text--completed'}`}
				>
					{todo.title}
				</p>
				<button
					className={'todo-list__item-button'}
					onClick={onClickEdit}
				>
					<Icon
						Icon={Pencil}
						size={20}
						color={'var(--color-gray-300)'}
					/>
				</button>
				<button
					className={'todo-list__item-button'}
					onClick={onClickDelete}
				>
					<Icon
						Icon={Trash2}
						size={20}
						color={'var(--color-gray-300)'}
					/>
				</button>
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
