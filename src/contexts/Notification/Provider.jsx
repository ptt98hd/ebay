import Context from './Context';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Provider({ children }) {
	const notify = (message, type = 'info') => {
		toast(message, { type });
	};
	return (
		<Context.Provider value={{ notify }}>
			{children}
			<ToastContainer position='top-right' autoClose={5000} />
		</Context.Provider>
	);
}

export default Provider;
