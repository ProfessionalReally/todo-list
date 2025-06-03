import '../styles/components/todo-list.style.scss';
import { TodoItem } from './todo-item';
import React, { useCallback, useState } from 'react';
import type { Todo } from '../types';
import { EditModal } from './edit-modal';
import { DeleteModal } from './delete-modal';

type TodoListProps = {
	todos: Todo[];
	updateTodo: (id: string, updatedFields: Partial<Todo>) => void;
	deleteTodo: (id: string) => void;
};

const TYPES_MODAL = {
	EDIT: 'edit',
	DELETE: 'delete',
} as const;

type TYPE_MODAL = (typeof TYPES_MODAL)[keyof typeof TYPES_MODAL];

export const TodoList: React.FC<TodoListProps> = ({
	todos,
	updateTodo,
	deleteTodo,
}) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalType, setModalType] = useState<TYPE_MODAL | null>(null);
	const [selectedTodoId, setSelectedTodoId] = useState<string | null>(null);
	const [editTitle, setEditTitle] = useState('');

	const closeModal = useCallback(() => {
		setIsModalOpen(false);
		setModalType(null);
		setSelectedTodoId(null);
		setEditTitle('');
	}, []);

	const openEditModal = useCallback(
		(todo: Todo) => {
			if (!isModalOpen) {
				setSelectedTodoId(todo.id);
				setEditTitle(todo.title);
				setModalType(TYPES_MODAL.EDIT);
				setIsModalOpen(true);
			}
		},
		[isModalOpen],
	);

	const openDeleteModal = useCallback(
		(todo: Todo) => {
			if (!isModalOpen) {
				setSelectedTodoId(todo.id);
				setModalType(TYPES_MODAL.DELETE);
				setIsModalOpen(true);
			}
		},
		[isModalOpen],
	);

	const handleEditInputChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setEditTitle(e.target.value);
		},
		[],
	);

	const handleUpdateTodo = useCallback(() => {
		if (selectedTodoId && editTitle) {
			updateTodo(selectedTodoId, { title: editTitle });
			closeModal();
		}
	}, [updateTodo, selectedTodoId, editTitle, closeModal]);

	const handleDeleteTodo = useCallback(() => {
		if (selectedTodoId) {
			deleteTodo(selectedTodoId);
			closeModal();
		}
	}, [deleteTodo, selectedTodoId, closeModal]);

	return (
		<>
			<ul className={'todo-list'}>
				{todos.length > 0 &&
					todos.map((todo: Todo) => (
						<TodoItem
							key={todo.id}
							todo={todo}
							updateTodo={updateTodo}
							openEditModal={openEditModal}
							openDeleteModal={openDeleteModal}
						/>
					))}
			</ul>
			{isModalOpen && modalType === TYPES_MODAL.EDIT && (
				<EditModal
					isOpen={isModalOpen}
					editTitle={editTitle}
					onChange={handleEditInputChange}
					onUpdate={handleUpdateTodo}
					onCancel={closeModal}
				/>
			)}
			{isModalOpen && modalType === TYPES_MODAL.DELETE && (
				<DeleteModal
					isOpen={isModalOpen}
					onDelete={handleDeleteTodo}
					onCancel={closeModal}
				/>
			)}
		</>
	);
};
