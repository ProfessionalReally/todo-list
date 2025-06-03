import type { LucideIcon } from 'lucide-react';
import React, { memo } from 'react';

type IconProps = {
	Icon: LucideIcon;
	size?: number;
	className?: string;
	color?: string;
};

export const Icon: React.FC<IconProps> = memo(
	({ Icon, size = 20, className = '', color = '#fff' }) => {
		return <Icon size={size} className={className} color={color} />;
	},
);
