import React from 'react';

type SelectProps = {
	children: React.ReactNode;
	className?: string;
	disabled?: boolean;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const Select: React.FC<SelectProps> = ({
	children,
	className = '',
	...props
}) => {
	return (
		<select className={className} {...props}>
			{children}
		</select>
	);
};
