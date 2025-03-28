import {
	createBrowserRouter,
	RouterProvider,
	Navigate,
} from 'react-router-dom';
import Layouts from '../layouts';
import Pages from '../pages';

const router = createBrowserRouter([
	{
		path: '/auth',
		element: <Layouts.Auth />,
		children: [
			{
				index: true,
				element: <Navigate to='signin' replace />,
			},
			{
				path: 'signin',
				element: <Pages.Auth.SignIn />,
			},
			{
				path: 'signup',
				element: <Pages.Auth.SignUp />,
			},
		],
	},
	{
		path: '/',
		element: <Layouts.User />,
		children: [
			{
				index: true,
				element: <Pages.User.Home />,
			},
			{
				path: 'shopping',
				element: <Pages.User.Shopping />,
			},
			{
				path: 'shopping/:id',
				element: <Pages.User.Detail />,
			},
			{
				path: 'cart',
				element: <Pages.User.Cart />,
			},
			{
				path: '*',
				element: <Pages.Error.Code404 />,
			},
		],
	},
	{
		path: '/seller',
		element: <h1>Seller Route</h1>,
		children: [],
	},
]);

function Router() {
	return <RouterProvider router={router} />;
}

export default Router;
