import { Button } from '@src/components/ui/button';
import { Header } from '@src/components/header';
import { useNavigate } from 'react-router-dom';
import '@src/styles/pages/error-404-page.style.scss';
import { Icon } from '@src/components/ui/icon';
import { ArrowLeft, House } from 'lucide-react';

const Error404Page = () => {
	const navigate = useNavigate();

	return (
		<div className={'error-page'}>
			<Header />
			<div className={'error-page__content'}>
				<h1 className={'error-page__title'}>404 Page Not Found</h1>
				<p className={'error-page__text'}>
					Sorry, the page you are looking for does not exist.
				</p>
				<div className={'error-page__buttons'}>
					<Button
						onClick={() => {
							navigate(-1);
						}}
						className={'error-page__button--back'}
					>
						<Icon Icon={ArrowLeft} />
						Go To Back Page
					</Button>
					<Button
						onClick={() => {
							navigate('/');
						}}
						className={'error-page__button--home'}
					>
						<Icon Icon={House} />
						Go To Mainpage
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Error404Page;
