import React from 'react';
import '@src/styles/components/ui/error.style.scss';

type ErrorProps = {
	children: React.ReactNode;
};
export const Error: React.FC<ErrorProps> = ({ children }) => {
	return <div className={'error'}>{children}</div>;
};
