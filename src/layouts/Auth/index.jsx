import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container, Stack } from 'react-bootstrap';
import Header from './Header';
import Footer from './Footer';

function Layout() {
	return (
		<Stack gap={5} className='min-vh-100'>
			<Header />
			<Container>
				<Outlet />
			</Container>
			<Footer />
		</Stack>
	);
}

export default Layout;
