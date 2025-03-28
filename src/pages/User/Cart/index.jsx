import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Col, Row, Table } from 'react-bootstrap';
import Contexts from '../../../contexts';
import api from '../../../services/api';
import { Link } from 'react-router-dom';

function Cart() {
	const { cart, deleteFromCart } = useContext(Contexts.Global.Context);
	const [products, setProducts] = useState({});

	const fetchProduct = async (id) => {
		try {
			const response = await api.get(`/products/${id}`);
			return response.data;
		} catch (error) {
			console.error(`Error fetching product with id ${id}:`, error);
			return null;
		}
	};

	useEffect(() => {
		const fetchAllProducts = async () => {
			const productDetails = {};
			for (const item of cart) {
				const product = await fetchProduct(item.productId);
				if (product) {
					productDetails[item.productId] = product;
				}
			}
			setProducts(productDetails);
		};
		if (cart.length > 0) {
			fetchAllProducts();
		}
	}, [cart]);

	const handleDeleteFromCart = (event) => {
		deleteFromCart(event.target.value);
	};

	return (
		<Row className='g-3'>
			<Col xs='12' md='8'>
				<Card>
					<Card.Header className='fw-medium'>Cart Items</Card.Header>
					<Card.Body>
						<Table striped bordered hover className='m-0'>
							<thead>
								<tr>
									<th>ID</th>
									<th>Name</th>
									<th>Price</th>
									<th>Quantity</th>
									<th>SubTotal</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								{cart.map((item) => {
									const product = products[item.productId];
									if (!product) return;
									return (
										<tr key={item.productId}>
											<td>{product.id}</td>
											<td>{product.name}</td>
											<td>${product.price}</td>
											<td>{item.quantity}</td>
											<td>${item.quantity * product.price}</td>
											<td className='d-flex gap-2 object-fit-contain'>
												<Button
													variant='primary'
													as={Link}
													to={`/shopping/${product.id}`}
												>
													<i className='bi bi-info-square' />
												</Button>
												<Button
													variant='danger'
													value={product.id}
													onClick={handleDeleteFromCart}
												>
													<i className='bi bi-trash' />
												</Button>
											</td>
										</tr>
									);
								})}
							</tbody>
						</Table>
					</Card.Body>
				</Card>
			</Col>
			<Col xs='12' md='4'>
				<Card>
					<Card.Header className='fw-medium'>Total</Card.Header>
					<Card.Body></Card.Body>
				</Card>
			</Col>
		</Row>
	);
}

export default Cart;
