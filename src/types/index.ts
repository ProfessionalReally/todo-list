export interface TodoI {
	id: string;
	title: string;
	completed: boolean;
}

export const TYPES_MODAL = {
	EDIT: 'edit',
	DELETE: 'delete',
} as const;

export type TYPE_MODAL = (typeof TYPES_MODAL)[keyof typeof TYPES_MODAL];

export type QueryT = string;

export const SORT_OPTIONS = {
	asc: true,
	desc: false,
	none: null,
} as const;
export type SortT = (typeof SORT_OPTIONS)[keyof typeof SORT_OPTIONS];

export const FILTER_OPTIONS = {
	all: 'all',
	completed: 'completed',
	uncompleted: 'uncompleted',
} as const;
export type FilterT = (typeof FILTER_OPTIONS)[keyof typeof FILTER_OPTIONS];
