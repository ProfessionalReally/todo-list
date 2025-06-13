import React, { createContext, useContext, useState } from 'react';

export const filterOptions = {
	all: 'all',
	completed: 'completed',
	uncompleted: 'uncompleted',
} as const;
export type Filter = 'all' | 'completed' | 'uncompleted';
export type Sort = boolean | null;

type TodoViewContextType = {
	filter: Filter;
	setFilter: (filter: Filter) => void;
	sort: Sort;
	setSort: (sort: (prev: Sort) => Sort) => void;
};

const TodoViewContext = createContext<TodoViewContextType | null>(null);

export const TodoViewProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [filter, setFilter] = useState<Filter>('all');
	const [sort, setSort] = useState<Sort>(null);

	return (
		<TodoViewContext value={{ filter, setFilter, sort, setSort }}>
			{children}
		</TodoViewContext>
	);
};

export const useTodoViewContext = () => {
	const context = useContext(TodoViewContext);
	if (!context) {
		throw new Error(
			'useTodoViewContext must be used within a TodoViewProvider',
		);
	}
	return context;
};
