import {} from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Image } from 'react-bootstrap';

function Header() {
	return (
		<Navbar expanded className='bg-body-tertiary border-bottom'>
			<Container>
				<Navbar.Brand as={Link} to={'/'}>
					<Image src='/ebay.svg' alt='eBay' style={{ height: '2rem' }} />
				</Navbar.Brand>
			</Container>
		</Navbar>
	);
}

export default Header;
