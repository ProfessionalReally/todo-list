import todoLogo from '../assets/TodoLogo.svg';
import '../styles/components/header.style.scss';
import React from 'react';

type HeaderProps = {
	className?: string;
	children?: React.ReactNode;
};

export const Header: React.FC<HeaderProps> = ({ children, className = '' }) => {
	return (
		<header className={'header ' + className}>
			<img src={todoLogo} alt='Todo Logo' />
			{children}
		</header>
	);
};
