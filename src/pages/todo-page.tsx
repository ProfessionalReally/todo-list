import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Header } from '@src/components/header';
import { ArrowLeft } from 'lucide-react';
import { Icon } from '@src/components/ui/icon';
import '@src/styles/pages/todo-page.style.scss';
import { TodoCard } from '@src/components/todo-card';
import { EditModal } from '@src/components/edit-modal';
import { DeleteModal } from '@src/components/delete-modal';
import { useModal } from '@src/hooks/use-modal';
import { Spinner } from '@src/components/ui/spinner';
import { useTodoCard } from '@src/hooks/use-todo-card';
import { useTodoActions } from '@src/hooks/use-todo-actions';

const TodoPage = () => {
	const { id } = useParams<string>();
	const navigate = useNavigate();

	const { todo, isLoading, error, isTimeout } = useTodoCard(id!);

	useEffect(() => {
		if (!id) {
			navigate('/404');
			return;
		}
		if (isTimeout) {
			navigate('/load-error');
		} else if (error && !todo) {
			navigate('/404');
		}
	}, [id, isTimeout, error, todo, navigate]);

	const { updateTodo, deleteTodo } = useTodoActions();

	const {
		isModalOpen,
		editTitle,
		openEditModal,
		openDeleteModal,
		handleEditInputChange,
		checkModalType,
		closeModal,
	} = useModal();

	const handleUpdateTodo = () => {
		if (id && editTitle) {
			updateTodo(id, { title: editTitle })
				.catch(console.error)
				.finally(closeModal);
		}
	};

	const handleDeleteTodo = () => {
		if (id) {
			deleteTodo(id)
				.catch(console.error)
				.finally(() => {
					closeModal();
					navigate('/');
				});
		}
	};

	const handleClickBack = () => {
		navigate(-1);
	};

	const isEditModal = isModalOpen && checkModalType();
	const isDeleteModal = isModalOpen && !checkModalType();

	return (
		<>
			<div className={'todo-page'}>
				<Header />
				{isLoading && <Spinner />}
				<div className={'todo-page__content'}>
					<button
						className={'todo-page__back-button'}
						onClick={handleClickBack}
					>
						<Icon
							Icon={ArrowLeft}
							size={28}
							color={'var(--color-gray-300)'}
						/>
					</button>
					{!isLoading && todo && (
						<TodoCard
							todo={todo}
							openEditModal={openEditModal}
							openDeleteModal={openDeleteModal}
						/>
					)}
				</div>
			</div>
			{isEditModal && (
				<EditModal
					isOpen={isModalOpen}
					editTitle={editTitle}
					onChange={handleEditInputChange}
					onUpdate={handleUpdateTodo}
					onCancel={closeModal}
				/>
			)}
			{isDeleteModal && (
				<DeleteModal
					isOpen={isModalOpen}
					onDelete={handleDeleteTodo}
					onCancel={closeModal}
				/>
			)}
		</>
	);
};

export default TodoPage;
