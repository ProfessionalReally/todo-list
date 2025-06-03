import { ModalWrapper } from './ui/modal-wrapper.tsx';
import React, { memo } from 'react';
import { Icon } from './ui/icon';
import { Button } from './ui/button';
import '../styles/components/modal.style.scss';
import { CircleAlert } from 'lucide-react';

type DeleteModalProps = {
	isOpen: boolean;
	onDelete: () => void;
	onCancel: () => void;
};
export const DeleteModal: React.FC<DeleteModalProps> = memo(
	({ isOpen, onDelete, onCancel }) => {
		return (
			<ModalWrapper
				isOpen={isOpen}
				onClose={onCancel}
				contentLabel='Edit Todo'
			>
				<div className='modal__content'>
					<div className='modal__title'>
						<Icon Icon={CircleAlert} size={24} />
						<h2 className='modal__title--text'>Delete Todo</h2>
					</div>
					<p className='modal__text'>
						Are you sure you want to delete this todo?
					</p>
					<div className='modal__buttons'>
						<Button
							onClick={onDelete}
							className='modal__button modal__button--danger'
						>
							Delete
						</Button>
						<Button
							onClick={onCancel}
							className='modal__button modal__button--light'
						>
							Cancel
						</Button>
					</div>
				</div>
			</ModalWrapper>
		);
	},
);
