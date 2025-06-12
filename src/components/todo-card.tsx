import '../styles/components/todo-card.style.scss';
import { X, Check, Pencil, Trash2 } from 'lucide-react';
import { Icon } from './ui/icon';
import type { Todo } from '../types';
import React, { memo, useCallback } from 'react';
import { Button } from './ui/button';

type TodoCardProps = {
	todo: Todo;
	openEditModal: (todo: Todo) => void;
	openDeleteModal: (todo: Todo) => void;
};

export const TodoCard: React.FC<TodoCardProps> = memo(
	({ todo, openEditModal, openDeleteModal }) => {
		const onClickDelete = useCallback(() => {
			openDeleteModal(todo);
		}, [todo, openDeleteModal]);

		const onClickEdit = useCallback(() => {
			openEditModal(todo);
		}, [todo, openEditModal]);

		return (
			<div className={'todo-card'}>
				<div className={'todo-card__heading'}>
					<h2 className={'todo-card__heading--text'}>
						Todo <span>Card</span>
					</h2>
				</div>
				<div className={'todo-card__content'}>
					<div className={'todo-card__status'}>
						<p className={'todo-card__text'}>Status: </p>
						{todo.completed ? (
							<Icon
								Icon={Check}
								size={28}
								color={'var(--color-purple'}
							/>
						) : (
							<Icon
								Icon={X}
								size={28}
								color={'var(--color-danger'}
							/>
						)}
					</div>
					<div className={'todo-card__title'}>
						<span className={'todo-card__text'}>Title: </span>
						<p className={'todo-card__title__text'}>{todo.title}</p>
					</div>
					<div className={'todo-card__buttons'}>
						<Button
							onClick={onClickEdit}
							className={
								'todo-card__button todo-card__button--edit'
							}
						>
							<Icon Icon={Pencil} size={20} />
							Edit
						</Button>
						<Button
							onClick={onClickDelete}
							className={
								'todo-card__button todo-card__button--delete'
							}
						>
							<Icon Icon={Trash2} size={20} />
							Delete
						</Button>
					</div>
				</div>
			</div>
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
