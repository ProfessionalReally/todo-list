import { MainPage } from './pages/main-page';
import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { Spinner } from './components/ui/spinner';

const TodoPage = lazy(() => import('./pages/todo-page'));
const ErrorLoadPage = lazy(() => import('./pages/error-load-page'));
const Error404Page = lazy(() => import('./pages/error-404-page'));

export default function App() {
	return (
		<Suspense fallback={<Spinner />}>
			<Routes>
				<Route path='/' element={<MainPage />} />
				<Route path='/todo/:id' element={<TodoPage />} />
				<Route path='/load-error' element={<ErrorLoadPage />} />
				<Route path='/404' element={<Error404Page />} />
				<Route path='*' element={<Error404Page />} />
			</Routes>
		</Suspense>
	);
}
