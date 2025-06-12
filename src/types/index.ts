export interface Todo {
	id: string;
	title: string;
	completed: boolean;
}

export const TYPES_MODAL = {
	EDIT: 'edit',
	DELETE: 'delete',
} as const;

export type TYPE_MODAL = (typeof TYPES_MODAL)[keyof typeof TYPES_MODAL];
