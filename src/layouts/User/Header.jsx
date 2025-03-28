import { useContext } from 'react';
import {
	Navbar,
	Nav,
	Container,
	Image,
	Button,
	Form,
	InputGroup,
	Breadcrumb,
} from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Contexts from '../../contexts';
import './header.css';

function Header() {
	const navigate = useNavigate();
	const location = useLocation();
	const { user, setUser } = useContext(Contexts.Global.Context);
	const { categories, setSelectedCategory, setSearchQuery } = useContext(
		Contexts.User.Context
	);

	const breadcrumbs = () => {
		const pathnames = location.pathname.split('/').filter((x) => x);
		return pathnames.map((value, index) => {
			const to = `/${pathnames.slice(0, index + 1).join('/')}`;
			return (
				<Breadcrumb.Item key={to} linkAs={Link} linkProps={{ to }}>
					{value.charAt(0).toUpperCase() + value.slice(1)}{' '}
				</Breadcrumb.Item>
			);
		});
	};

	const handleSearch = (event) => {
		event.preventDefault();
		const searchQuery = document.getElementById('search-query').value;
		const selectedCategory = document.getElementById('selected-category').value;
		setSearchQuery(searchQuery);
		setSelectedCategory(selectedCategory);
		navigate(`/shopping`);
	};

	const handleSignout = () => {
		localStorage.removeItem('uid');
		sessionStorage.removeItem('uid');
		setUser(null);
		navigate('/');
	};

	return (
		<header className='bg-body-tertiary shadow-sm sticky-top'>
			<Navbar expanded className='border-bottom p-0 py-1'>
				<Container className='justify-content-between'>
					<Nav className='p-0 gap-3'>
						{user ? (
							<Nav.Item>
								<Nav.Link className='p-0' onClick={handleSignout}>
									Sign Out
								</Nav.Link>
							</Nav.Item>
						) : (
							<Nav.Item>
								<Nav.Link as={Link} to='/auth/signin' className='p-0'>
									Sign In
								</Nav.Link>
							</Nav.Item>
						)}
						<Nav.Item>
							<Nav.Link as={Link} to='/auth/signin' className='p-0'>
								Brand Outlet
							</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link as={Link} to='/auth/signin' className='p-0'>
								Gift Cards
							</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link as={Link} to='/helps' className='p-0'>
								Helps & Contact
							</Nav.Link>
						</Nav.Item>
					</Nav>
					<Nav className='p-0 gap-3'>
						<Nav.Item>
							<Nav.Link as={Link} to='/address' className='p-0'>
								Ship To
							</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link as={Link} to='/seller' className='p-0'>
								Sell
							</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link as={Link} to='/watchlist' className='p-0'>
								Watchlist
							</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link as={Link} to='/auth/signin' className='p-0'>
								My eBay
							</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link as={Link} to='/auth/signin' className='p-0'>
								<i className='bi bi-bell' />
							</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link as={Link} to='/cart' className='p-0'>
								<i className='bi bi-cart' />
							</Nav.Link>
						</Nav.Item>
					</Nav>
				</Container>
			</Navbar>
			<Navbar expanded className='border-bottom'>
				<Container className='justify-content-between gap-3'>
					<Navbar.Brand as={Link} to={`/`} className='mx-0'>
						<Image src='/ebay.svg' alt='eBay' style={{ height: '2rem' }} />
					</Navbar.Brand>
					<InputGroup className='w-100'>
						<InputGroup.Text className='rounded-start-pill ps-3'>
							<i className='bi bi-search' />
						</InputGroup.Text>
						<Form.Control
							type='text'
							placeholder='Search for anything'
							className='rounded-0'
							id='search-query'
							onKeyDown={(event) => {
								if (event.key === 'Enter') {
									handleSearch(event);
								}
							}}
						/>
						<InputGroup.Text className='p-0 rounded-end-pill'>
							<Form.Select
								className='border-0 bg-transparent shadow-none'
								id='selected-category'
							>
								<option value={''}>All Category</option>
								{categories.map((category) => {
									return (
										<option key={`category-${category.id}`} value={category.id}>
											{category.name}
										</option>
									);
								})}
							</Form.Select>
						</InputGroup.Text>
					</InputGroup>
					<Button className='rounded-pill px-4' onClick={handleSearch}>
						Search
					</Button>
				</Container>
			</Navbar>
			<Breadcrumb className='border-bottom'>
				<Container className='my-1 d-flex'>
					<Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>
						Home
					</Breadcrumb.Item>
					{breadcrumbs()}
				</Container>
			</Breadcrumb>
		</header>
	);
}

export default Header;
