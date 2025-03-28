import React, { useContext, useEffect, useState } from 'react';
import api from '../../../services/api';
import { Row, Col, Card, Stack, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Contexts from '../../../contexts';

function Products() {
	const { categories, selectedCategory, searchQuery } = useContext(
		Contexts.User.Context
	);
	const [products, setProducts] = useState([]);
	const [brands, setBrands] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		try {
			const fetching = async () => {
				const brands = (await api.get(`/brands`)).data;
				setBrands(brands);
			};
			fetching();
		} catch (error) {
			console.log(error);
		}
	}, []);

	useEffect(() => {
		try {
			const fetching = async () => {
				const products = (await api.get(`/products`)).data;
				let filtered = products;
				if (selectedCategory) {
					filtered = filtered.filter(
						(product) => product.categoryId == selectedCategory
					);
				}
				if (searchQuery) {
					filtered = filtered.filter((product) =>
						product.name.includes(searchQuery)
					);
				}
				setProducts(filtered);
			};
			fetching();
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	}, [selectedCategory, searchQuery, categories]);

	if (loading) {
		return (
			<Stack
				direction='horizontal'
				gap={3}
				className='align-items-center h-100'
			>
				<div className='m-auto'>
					<Spinner animation='grow' variant='primary' />
					<Spinner animation='grow' variant='primary' />
					<Spinner animation='grow' variant='primary' />
				</div>
			</Stack>
		);
	}

	return (
		<Row xs={1} md={2} lg={3} className='g-4'>
			{products.map((product) => {
				return (
					<Col key={`product-${product.id}`}>
						<Card
							as={Link}
							to={`/shopping/${product.id}`}
							className='text-decoration-none'
						>
							<Card.Img
								variant='top'
								src={product.img}
								className=' border-bottom'
							/>
							<Card.Body>
								<Card.Title>{product.name}</Card.Title>
								<Card.Text>${product.price}</Card.Text>
							</Card.Body>
							<Card.Footer className='d-flex gap-3 justify-content-between'>
								<span>
									{brands.find((brand) => brand.id == product.brandId).name}
								</span>
								<span>
									{/* {categories.find(
										(category) => category.id == product.categoryId
									)} */}
								</span>
							</Card.Footer>
						</Card>
					</Col>
				);
			})}
		</Row>
	);
}

export default Products;
