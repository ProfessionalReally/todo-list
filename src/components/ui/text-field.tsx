import React from 'react';
import '@src/styles/components/ui/text-field.style.scss';

type TextFieldProps = {
	value?: string;
	name?: string;
	defaultValue?: string;
	label?: string;
	className?: string;
	type?: 'text' | 'password';
	placeholder?: string;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	disabled?: boolean;
	required?: boolean;
};

export const TextField: React.FC<TextFieldProps> = ({
	className = '',
	type = 'text',
	label = '',
	...props
}) => {
	return (
		<>
			{label && <label className={'text-field__label'}>{label}</label>}
			<input className={className} type={type} {...props} />
		</>
	);
};
