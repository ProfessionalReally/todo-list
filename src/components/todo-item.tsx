import '../styles/components/todo-item.style.scss';
import { Trash2, Pencil } from 'lucide-react';
import { Checkbox } from './ui/checkbox';
import React from 'react';

type TodoItemProps = {
	id: string;
	title: string;
	completed?: boolean;
	onClickEdit: () => void;
	onClickDelete: () => void;
};

export const TodoItem: React.FC<TodoItemProps> = ({
	id,
	title,
	completed = false,
	onClickEdit,
	onClickDelete,
}) => {
	return (
		<ul className={'todo-list__item'}>
			<Checkbox id={id} onChange={() => {}} checked={completed} />
			<p
				className={
					'todo-list__item-text' + ' todo-list__item-text--completed'
				}
			>
				{title}
			</p>
			<button className={'todo-list__item-button'} onClick={onClickEdit}>
				<Pencil size={'20'} color={'var(--color-gray-300)'} />
			</button>
			<button
				className={'todo-list__item-button'}
				onClick={onClickDelete}
			>
				<Trash2 size={'20'} color={'var(--color-gray-300)'} />
			</button>
		</ul>
	);
};
