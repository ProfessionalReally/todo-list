import React from 'react';
import '../../styles/components/ui/checkbox.style.scss';

type CheckboxProps = {
	id: string;
	label?: string;
	className?: string;
	checked: boolean;
	disabled?: boolean;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Checkbox: React.FC<CheckboxProps> = ({
	id,
	label = '',
	className = '',
	...props
}) => {
	return (
		<div className={'checkbox ' + className}>
			<input
				type='checkbox'
				className={'checkbox__input'}
				id={id}
				{...props}
			/>
			<label htmlFor={id} className={'checkbox__label'}>
				{label}
			</label>
		</div>
	);
};
