import { AddTodoForm } from '@src/components/add-todo-form';
import { SortToggleButton } from '@src/components/sort-toggle-button';
import { SearchAndFilter } from '@src/components/search-and-filter';
import '@src/styles/components/header-panel.style.scss';

export const HeaderPanel = () => {
	return (
		<div className={'header-panel'}>
			<div className={'header-panel__controls'}>
				<SortToggleButton className={'header-panel__button--sort'} />
				<AddTodoForm />
			</div>
			<SearchAndFilter />
		</div>
	);
};
