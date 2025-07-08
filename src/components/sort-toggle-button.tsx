import { SORT_OPTIONS, type SortT } from '@src/types';
import { Icon } from '@src/components/ui/icon';
import { ArrowDownAZ, ArrowUpAZ, ListFilter } from 'lucide-react';
import { useViewSettings } from '@src/hooks/use-view-settings';
import { Button } from '@src/components/ui/button';
import React from 'react';

type SortToggleButtonProps = {
	className?: string;
};

const getSortIcon = (sort: SortT) => {
	if (sort === SORT_OPTIONS.asc) return <Icon Icon={ArrowDownAZ} />;
	if (sort === SORT_OPTIONS.desc) return <Icon Icon={ArrowUpAZ} />;
	return <Icon Icon={ListFilter} />;
};

export const SortToggleButton: React.FC<SortToggleButtonProps> = ({
	className = '',
}) => {
	const { sort, onToggleSort } = useViewSettings();

	return (
		<Button onClick={onToggleSort} className={className}>
			Sort
			{getSortIcon(sort)}
		</Button>
	);
};
