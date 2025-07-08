import { TextField } from '@src/components/ui/text-field';
import { Button } from '@src/components/ui/button';
import { Spinner } from '@src/components/ui/spinner';
import { Icon } from '@src/components/ui/icon';
import { CirclePlus } from 'lucide-react';
import React from 'react';
import { useTodoActions } from '@src/hooks/use-todo-actions';
import { useTodoList } from '@src/hooks/use-todo-list';
import '@src/styles/components/add-todo-form.style.scss';

export const AddTodoForm = () => {
	const { addTodo } = useTodoActions();
	const { isAdding } = useTodoList();

	const onSubmitAddTodo = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = event.currentTarget as HTMLFormElement & {
			title: { value: string };
		};

		const inputValue = form.title.value.trim();
		if (!inputValue) return;

		addTodo(inputValue);
		form.reset();
	};

	return (
		<form className={'add-todo-form'} onSubmit={onSubmitAddTodo}>
			<TextField
				name={'title'}
				defaultValue={''}
				disabled={isAdding}
				className={'add-todo-form__input-create'}
				placeholder='Add a new task'
			/>
			<Button
				onClick={() => {}}
				type='submit'
				disabled={isAdding}
				className={'add-todo-form__button-create'}
			>
				Create
				{isAdding ? <Spinner size={20} /> : <Icon Icon={CirclePlus} />}
			</Button>
		</form>
	);
};
