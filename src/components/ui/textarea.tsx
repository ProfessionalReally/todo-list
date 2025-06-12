import React from 'react';
import '../../styles/components/ui/textarea.style.scss';

type TextAreaProps = {
	value: string;
	label?: string;
	className?: string;
	placeholder?: string;
	onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
	required?: boolean;
};

export const TextArea: React.FC<TextAreaProps> = ({
	className = '',
	label = '',
	...props
}) => {
	return (
		<>
			{label && <label className={'text-area__label'}>{label}</label>}
			<textarea className={'text-area ' + className} {...props} />
		</>
	);
};
