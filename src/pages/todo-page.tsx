import { useNavigate, useParams } from 'react-router-dom';
import { useCallback, useEffect } from 'react';
import { deleteTodo, updateTodo } from '../services';
import { Header } from '../components/header';
import { ArrowLeft } from 'lucide-react';
import { Icon } from '../components/ui/icon';
import '../styles/pages/todo-page.style.scss';
import { TodoCard } from '../components/todo-card';
import { EditModal } from '../components/edit-modal';
import { DeleteModal } from '../components/delete-modal';
import { useRequestGetTodo } from '../hooks/use-request';
import { useModal } from '../hooks/use-modal';
import { Spinner } from '../components/ui/spinner';

const TodoPage = () => {
	const { id } = useParams<string>();
	const navigate = useNavigate();

	useEffect(() => {
		if (!id) {
			navigate('/404');
		}
	}, [id, navigate]);

	const { todo, isTimeout, hasFetched, isLoading, setTodo } =
		useRequestGetTodo(id!);

	useEffect(() => {
		if (isTimeout) {
			navigate('/load-error');
		} else if (hasFetched && !todo) {
			navigate('/404');
		}
	}, [todo, isLoading, isTimeout, navigate]);

	const {
		isModalOpen,
		editTitle,
		openEditModal,
		openDeleteModal,
		handleEditInputChange,
		checkModalType,
		closeModal,
	} = useModal();

	const handleUpdateTodo = useCallback(() => {
		if (id && editTitle) {
			updateTodo(id, { title: editTitle })
				.then(setTodo)
				.catch(console.error)
				.finally(closeModal);
		}
	}, [id, editTitle, closeModal]);

	const handleDeleteTodo = useCallback(() => {
		if (id) {
			deleteTodo(id)
				.catch(console.error)
				.finally(() => {
					closeModal();
					navigate('/');
				});
		}
	}, [id, closeModal]);

	const handleClickBack = useCallback(() => {
		navigate(-1);
	}, [navigate]);

	if (!todo) return null;

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
					{!isLoading && (
						<TodoCard
							todo={todo}
							openEditModal={openEditModal}
							openDeleteModal={openDeleteModal}
						/>
					)}
				</div>
			</div>
			{isModalOpen && checkModalType() && (
				<EditModal
					isOpen={isModalOpen}
					editTitle={editTitle}
					onChange={handleEditInputChange}
					onUpdate={handleUpdateTodo}
					onCancel={closeModal}
				/>
			)}
			{isModalOpen && !checkModalType() && (
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
