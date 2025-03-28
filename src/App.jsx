import Router from './routes';
import Contexts from './contexts';

function App() {
	return (
		<Contexts.Notification.Provider>
			<Contexts.Global.Provider>
				<Router />
			</Contexts.Global.Provider>
		</Contexts.Notification.Provider>
	);
}

export default App;
