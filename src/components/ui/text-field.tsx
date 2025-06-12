import React from 'react';
import '../../styles/components/ui/text-field.style.scss';

type TextFieldProps = {
	value: string;
	label?: string;
	className?: string;
	type?: 'text' | 'password';
	placeholder?: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
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
			<input
				className={'text-field ' + className}
				type={type}
				{...props}
			/>
		</>
	);
};
