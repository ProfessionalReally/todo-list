import { Header } from '../components/header';
import { CircleAlert, House, RotateCcw } from 'lucide-react';
import { Icon } from '../components/ui/icon';
import '../styles/pages/error-load-page.style.scss';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';

const ErrorLoadPage = () => {
	const navigate = useNavigate();

	return (
		<div className={'error-load-page'}>
			<Header />
			<div className={'error-load-page__content'}>
				<Icon Icon={CircleAlert} size={50} />
				<h1 className={'error-load-page__title'}>
					Something went wrong...
				</h1>
				<p className={'error-load-page__text'}>
					We were unable to upload the data. Please try again later.
				</p>
				<div className={'error-load-page__buttons'}>
					<Button
						onClick={() => {
							navigate(-1);
						}}
						className={'error-load-page__button--retry'}
					>
						<Icon Icon={RotateCcw} />
						Retry
					</Button>
					<Button
						onClick={() => {
							navigate('/');
						}}
						className={'error-load-page__button--home'}
					>
						<Icon Icon={House} />
						Go To Mainpage
					</Button>
				</div>
			</div>
		</div>
	);
};

export default ErrorLoadPage;
