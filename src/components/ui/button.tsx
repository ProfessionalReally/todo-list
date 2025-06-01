import React from 'react';
import '../../styles/components/ui/button.style.scss';

type ButtonProps = {
	children: React.ReactNode;
	className?: string;
	type?: 'button' | 'submit';
	disabled?: boolean;
	onClick: () => void;
};

export const Button: React.FC<ButtonProps> = ({
	children,
	type = 'button',
	className = '',
	...props
}) => {
	return (
		<button type={type} className={'button ' + className} {...props}>
			{children}
		</button>
	);
};
