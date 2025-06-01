import React from 'react';
import '../../styles/components/ui/text-field.style.scss';

type TextFieldProps = {
	value: string;
	className?: string;
	type?: 'text' | 'password';
	placeholder?: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	required?: boolean;
};

export const TextField: React.FC<TextFieldProps> = ({
	className = '',
	type = 'text',
	...props
}) => {
	return (
		<input className={'text-field ' + className} type={type} {...props} />
	);
};
