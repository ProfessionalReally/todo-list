import { createRoot } from 'react-dom/client';
import './styles/index.scss';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { TodoViewProvider } from './context/todo-view-context';

createRoot(document.getElementById('root')!).render(
	<TodoViewProvider>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</TodoViewProvider>,
);
