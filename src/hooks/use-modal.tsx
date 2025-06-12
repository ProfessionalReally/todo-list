import React, { useCallback, useState } from 'react';
import type { Todo, TYPE_MODAL } from '../types';
import { TYPES_MODAL } from '../types';

export const useModal = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalType, setModalType] = useState<TYPE_MODAL | null>(null);
	const [editTitle, setEditTitle] = useState('');

	const closeModal = useCallback(() => {
		setIsModalOpen(false);
		setModalType(null);
		setEditTitle('');
	}, []);

	const openEditModal = useCallback(
		(todo: Todo) => {
			if (!isModalOpen) {
				setEditTitle(todo.title);
				setModalType(TYPES_MODAL.EDIT);
				setIsModalOpen(true);
			}
		},
		[isModalOpen],
	);

	const openDeleteModal = useCallback(() => {
		if (!isModalOpen) {
			setModalType(TYPES_MODAL.DELETE);
			setIsModalOpen(true);
		}
	}, [isModalOpen]);

	const handleEditInputChange = useCallback(
		(e: React.ChangeEvent<HTMLTextAreaElement>) => {
			setEditTitle(e.target.value);
		},
		[],
	);

	const checkModalType = useCallback(() => {
		if (modalType === TYPES_MODAL.EDIT) return true;
		if (modalType === TYPES_MODAL.DELETE) return false;
	}, [modalType]);

	return {
		isModalOpen,
		editTitle,
		openEditModal,
		openDeleteModal,
		handleEditInputChange,
		checkModalType,
		closeModal,
	};
};
