import React, { useState } from 'react';
import type { TodoI, TYPE_MODAL } from '@src/types';
import { TYPES_MODAL } from '@src/types';

export const useModal = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalType, setModalType] = useState<TYPE_MODAL | null>(null);
	const [editTitle, setEditTitle] = useState('');

	const closeModal = () => {
		setIsModalOpen(false);
		setModalType(null);
		setEditTitle('');
	};

	const openEditModal = (todo: TodoI) => {
		if (!isModalOpen) {
			setEditTitle(todo.title);
			setModalType(TYPES_MODAL.EDIT);
			setIsModalOpen(true);
		}
	};

	const openDeleteModal = () => {
		if (!isModalOpen) {
			setModalType(TYPES_MODAL.DELETE);
			setIsModalOpen(true);
		}
	};

	const handleEditInputChange = (
		e: React.ChangeEvent<HTMLTextAreaElement>,
	) => {
		setEditTitle(e.target.value);
	};

	const checkModalType = () => {
		return modalType === TYPES_MODAL.EDIT;
	};

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
