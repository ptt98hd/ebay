import React, { useContext } from 'react';
import { Card, Form } from 'react-bootstrap';
import Contexts from '../../../contexts';
import { useLocation } from 'react-router-dom';

function Sidebar() {
	const { categories, brands } = useContext(Contexts.User.Context);
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const categoryId = queryParams.get('category');

	return (
		<Card>
			<Card.Header>
				<i className='bi bi-funnel-fill me-2' />
				<span className='fw-medium'>Filters</span>
			</Card.Header>
			<Card.Body>
				<Form.Group className='mb-3'>
					<Form.Label>Category</Form.Label>
					<Form.Select>
						<option value='0' selected={0 == categoryId}>
							All Category
						</option>
						{categories.map((category, index) => (
							<option
								key={index}
								value={category.id}
								selected={category.id == categoryId}
							>
								{category.name}
							</option>
						))}
					</Form.Select>
				</Form.Group>
				{/* Brands */}
				<Form.Group className='mb-3'>
					<Form.Label>Brand</Form.Label>
					<Form.Select>
						<option value={''}>All Brands</option>
						{brands.map((brand) => {
							return (
								<option value={brand.id} key={brand.id}>
									{brand.name}
								</option>
							);
						})}
					</Form.Select>
				</Form.Group>
				<Form.Group className='mb-3'>
					<Form.Label>Price</Form.Label>
					<Form.Range />
				</Form.Group>
				<Form.Group className='mb-3'>
					<Form.Check type='checkbox' label='In Stock' />
				</Form.Group>
				<Form.Group className='mb-3'>
					<Form.Check type='checkbox' label='On Sale' />
				</Form.Group>
			</Card.Body>
		</Card>
	);
}

export default Sidebar;
