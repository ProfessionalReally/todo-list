import { ModalWrapper } from './ui/modal-wrapper.tsx';
import React, { memo } from 'react';
import { Icon } from './ui/icon';
import { Button } from './ui/button';
import { SquarePen } from 'lucide-react';
import '../styles/components/modal.style.scss';
import { TextArea } from './ui/textarea';

type EditModalProps = {
	isOpen: boolean;
	editTitle: string;
	onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
	onUpdate: () => void;
	onCancel: () => void;
};
export const EditModal: React.FC<EditModalProps> = memo(
	({ isOpen, editTitle, onChange, onUpdate, onCancel }) => {
		return (
			<ModalWrapper
				isOpen={isOpen}
				onClose={onCancel}
				contentLabel='Edit Todo'
			>
				<div className='modal__content'>
					<div className='modal__title'>
						<Icon Icon={SquarePen} size={24} />
						<h2 className='modal__title--text'>Edit Todo</h2>
					</div>
					<TextArea
						value={editTitle}
						onChange={onChange}
						placeholder='Edit todo'
						label='Title: '
						className='modal__edit-textarea'
					/>
					{!editTitle && (
						<p className='modal__text modal__text--danger'>
							Title mustn't be empty!
						</p>
					)}
					<div className='modal__buttons'>
						<Button
							onClick={onUpdate}
							className='modal__button modal__button--primary'
						>
							Update
						</Button>
						<Button
							onClick={onCancel}
							className='modal__button modal__button--danger'
						>
							Cancel
						</Button>
					</div>
				</div>
			</ModalWrapper>
		);
	},
);
