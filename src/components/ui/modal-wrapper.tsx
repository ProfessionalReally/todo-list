import Modal from 'react-modal';
import React from 'react';
import '../../styles/components/ui/modal-wrapper.style.scss';
import { X } from 'lucide-react';

Modal.setAppElement('#root');

type ModalProps = {
	children: React.ReactNode;
	isOpen: boolean;
	onClose: () => void;
	contentLabel?: string;
};

export const ModalWrapper: React.FC<ModalProps> = ({
	children,
	isOpen,
	onClose,
	contentLabel,
}) => {
	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onClose}
			contentLabel={contentLabel || 'Modal'}
			className='modal'
			overlayClassName='modal__overlay'
		>
			<button className={'modal__close-button'} onClick={onClose}>
				<X size={'20'} color={'var(--color-gray-300)'} />
			</button>
			{children}
		</Modal>
	);
};
