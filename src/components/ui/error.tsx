import React from 'react';
import '../../styles/components/ui/error.scss';

type ErrorProps = {
	children: React.ReactNode;
};
export const Error: React.FC<ErrorProps> = ({ children }) => {
	return <div className={'error'}>{children}</div>;
};
