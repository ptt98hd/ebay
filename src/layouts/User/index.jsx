import React from 'react';
import { Container, Stack } from 'react-bootstrap';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import Floating from './Floating';
import Contexts from '../../contexts';

function Layout() {
	return (
		<Contexts.User.Provider>
			<Stack gap={5} direction='vertical' className='min-vh-100'>
				<Header />
				<Container>
					<Outlet />
				</Container>
				<Footer />
				<Floating />
			</Stack>
		</Contexts.User.Provider>
	);
}

export default Layout;
