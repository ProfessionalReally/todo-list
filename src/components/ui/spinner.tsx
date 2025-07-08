import '@src/styles/components/ui/spinner.style.scss';
import React from 'react';

type SpinnerProps = {
	className?: string;
	fullScreen?: boolean;
	size: number;
};

export const Spinner: React.FC<SpinnerProps> = ({
	className = '',
	fullScreen = false,
	size = 20,
}) => {
	return (
		<div
			className={
				'spinner ' +
				(fullScreen ? ' spinner_full-screen ' : '') +
				className
			}
		>
			<div
				className={
					'spinner__loader ' +
					(fullScreen
						? 'spinner__loader--fullscreen'
						: 'spinner__loader--small')
				}
				style={{ width: `${size}px`, height: `${size}px` }}
			></div>
		</div>
	);
};
