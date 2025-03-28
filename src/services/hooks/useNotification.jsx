import { useContext } from 'react';
import Contexts from '../../contexts';

export const useNotification = () => {
	const { notify } = useContext(Contexts.Notification.Context);

	return (message, status = 'info') => {
		notify(message, status);
	};
};
