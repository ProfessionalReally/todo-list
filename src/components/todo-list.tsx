import '../styles/components/todo-list.style.scss';
import { TodoItem } from './todo-item';
import { ModalWrapper } from './ui/modal-wrapper';
import { useState } from 'react';
import { TextField } from './ui/text-field';
import { Button } from './ui/button';
import { SquarePen, CircleAlert } from 'lucide-react';

export const TodoList = () => {
	const [isEditOpen, setIsEditOpen] = useState(false);
	const [isDeleteOpen, setIsDeleteOpen] = useState(true);

	const handleEditOpenModal = () => {
		setIsEditOpen(true);
	};

	const handleEditCloseModal = () => {
		setIsEditOpen(false);
	};

	const handleDeleteOpenModal = () => {
		setIsDeleteOpen(true);
	};

	const handleDeleteCloseModal = () => {
		setIsDeleteOpen(false);
	};

	return (
		<>
			<li className={'todo-list'}>
				<TodoItem
					onClickEdit={handleEditOpenModal}
					onClickDelete={handleDeleteOpenModal}
					id={'1'}
					title={'Todo 1'}
					completed
				/>
				<TodoItem
					onClickEdit={handleEditOpenModal}
					onClickDelete={handleDeleteOpenModal}
					id={'2'}
					title={'Todo 2'}
					completed
				/>
				<TodoItem
					onClickEdit={handleEditOpenModal}
					onClickDelete={handleDeleteOpenModal}
					id={'3'}
					title={'Todo 3'}
					completed
				/>
				<TodoItem
					onClickEdit={handleEditOpenModal}
					onClickDelete={handleDeleteOpenModal}
					id={'4'}
					title={'Todo 4'}
					completed
				/>
				<TodoItem
					onClickEdit={handleEditOpenModal}
					onClickDelete={handleDeleteOpenModal}
					id={'5'}
					title={'Todo 5'}
					completed
				/>
			</li>
			<ModalWrapper isOpen={isEditOpen} onClose={handleEditCloseModal}>
				<div className={'modal__content'}>
					<div className={'modal__title'}>
						<SquarePen size={24} />
						<h2 className={'modal__title--text'}>Edit Todo</h2>
					</div>
					<TextField
						value={''}
						onChange={() => {}}
						placeholder='Edit todo'
						className={'modal__edit-input'}
					/>
					<div className={'modal__buttons'}>
						<Button
							onClick={() => {}}
							className={'modal__button modal__button--primary'}
						>
							Update
						</Button>
						<Button
							onClick={handleEditCloseModal}
							className={'modal__button modal__button--danger'}
						>
							Cancel
						</Button>
					</div>
				</div>
			</ModalWrapper>
			<ModalWrapper
				isOpen={isDeleteOpen}
				onClose={handleDeleteCloseModal}
			>
				<div className={'modal__content'}>
					<div className={'modal__title'}>
						<CircleAlert size={24} />
						<h2 className={'modal__title-text'}>Delete Todo</h2>
					</div>

					<p className={'modal__text'}>
						Are you sure you want to delete this todo?
					</p>
					<div className={'modal__buttons'}>
						<Button
							onClick={() => {}}
							className={'modal__button modal__button--danger'}
						>
							Delete
						</Button>
						<Button
							onClick={handleDeleteCloseModal}
							className={'modal__button modal__button--light'}
						>
							Cancel
						</Button>
					</div>
				</div>
			</ModalWrapper>
		</>
	);
};
