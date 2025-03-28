import React, { useContext } from 'react';
import { Card, Form } from 'react-bootstrap';
import Contexts from '../../../contexts';
import { useLocation } from 'react-router-dom';

function Sidebar() {
	const {
		categories,
		brands,
		setSelectedCategory,
		setSelectedBrand,
		maxPrice,
		setMaxPrice,
	} = useContext(Contexts.User.Context);
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
					<Form.Select
						onChange={(event) => {
							setSelectedCategory(event.target.value);
						}}
					>
						<option value='' selected={0 == categoryId}>
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
					<Form.Select
						onChange={(event) => {
							setSelectedBrand(event.target.value);
						}}
					>
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
					<Form.Label>Price: {maxPrice}</Form.Label>
					<Form.Range
						min={0}
						max={5000}
						value={maxPrice}
						step={50}
						onChange={(event) => {
							setMaxPrice(event.target.value);
						}}
					/>
				</Form.Group>
			</Card.Body>
		</Card>
	);
}

export default Sidebar;
