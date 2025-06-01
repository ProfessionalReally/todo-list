import todoLogo from '../assets/TodoLogo.svg';
import { CirclePlus, ArrowDownAZ } from 'lucide-react';
import '../styles/components/header.style.scss';
import { Button } from './ui/button';
import { TextField } from './ui/text-field';

export const Header = () => {
	return (
		<header className={'header'}>
			<img src={todoLogo} alt='Todo Logo' />
			<div className={'header__panel'}>
				<div className={'header__controls'}>
					<Button
						onClick={() => {}}
						className={'header__button--filter'}
					>
						Filter
						<ArrowDownAZ size={20} />
					</Button>
					<form className={'header__form'}>
						<TextField
							value={''}
							onChange={() => {}}
							className={'header__input-create'}
							placeholder='Add a new task'
						/>
						<Button
							onClick={() => {}}
							className={'header__button--create'}
						>
							Create
							<CirclePlus size={20} />
						</Button>
					</form>
				</div>
				<TextField
					value={''}
					onChange={() => {}}
					className={'header__search'}
					placeholder='Search...'
				/>
			</div>
		</header>
	);
};
