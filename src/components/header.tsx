import todoLogo from '../assets/TodoLogo.svg';
import { CirclePlus, ArrowDownAZ, ArrowUpAZ } from 'lucide-react';
import '../styles/components/header.style.scss';
import { Button } from './ui/button';
import { TextField } from './ui/text-field';
import { Icon } from './ui/icon';
import React, { useState } from 'react';

type HeaderProps = {
	query: string;
	sortAsc: boolean | null;
	addTodo: (title: string) => void;
	onChangeQuery: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onToggleSort: () => void;
};

const getSortIcon = (sortAsc: boolean | null) => {
	if (sortAsc === true) return <Icon Icon={ArrowDownAZ} />;
	if (sortAsc === false) return <Icon Icon={ArrowUpAZ} />;
	return null;
};

export const Header: React.FC<HeaderProps> = ({
	query,
	sortAsc,
	addTodo,
	onChangeQuery,
	onToggleSort,
}) => {
	const [titleTodo, setTitleTodo] = useState<string>('');

	const onChangeAddTodoInput = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		setTitleTodo(event.target.value);
	};
	const onSubmitAddTodo = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!titleTodo) return;
		addTodo(titleTodo);
		setTitleTodo('');
	};

	return (
		<header className={'header'}>
			<img src={todoLogo} alt='Todo Logo' />
			<div className={'header__panel'}>
				<div className={'header__controls'}>
					<Button
						onClick={onToggleSort}
						className={'header__button--filter'}
					>
						Filter
						{getSortIcon(sortAsc)}
					</Button>
					<form className={'header__form'} onSubmit={onSubmitAddTodo}>
						<TextField
							value={titleTodo}
							onChange={onChangeAddTodoInput}
							className={'header__input-create'}
							placeholder='Add a new task'
						/>
						<Button
							onClick={() => {}}
							type='submit'
							className={'header__button--create'}
						>
							Create
							<Icon Icon={CirclePlus} />
						</Button>
					</form>
				</div>
				<TextField
					value={query}
					onChange={onChangeQuery}
					className={'header__search'}
					placeholder='Search...'
				/>
			</div>
		</header>
	);
};
