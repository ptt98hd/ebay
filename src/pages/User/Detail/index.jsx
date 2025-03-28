import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../../services/api';
import { Button, Col, Image, Row, Stack } from 'react-bootstrap';
import Contexts from '../../../contexts';

function Detail() {
	const { id: productId } = useParams();
	const [product, setProducts] = useState();
	const [loading, setLoading] = useState(true);
	const { addToCart } = useContext(Contexts.Global.Context);

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const product = (await api.get(`/products/${productId}`)).data;
				product.seller = (await api.get(`/sellers/${product.sellerId}`)).data;
				product.category = (
					await api.get(`/categories/${product.categoryId}`)
				).data;
				product.brand = (await api.get(`/brands/${product.brandId}`)).data;
				setProducts(product);
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		};
		fetchProduct();
	}, [productId]);

	if (loading) {
		return <h1>Loading</h1>;
	}

	if (!product) {
		return <h1>Product not found</h1>;
	}

	const handleAddToCart = () => {
		addToCart(product);
	};

	return (
		<Row className='g-5'>
			<Col>
				<Image
					src={product.img}
					alt={product.name}
					fluid
					className='w-100 border rounded ratio-1x1 p-2 bg-body-tertiary'
				/>
			</Col>
			<Col>
				<Stack direction='vertical' gap={3}>
					<h1>{product.name}</h1>
					<Stack
						direction='horizontal'
						gap={3}
						className='px-0 py-3 border-top border-bottom'
					>
						<Image
							src='https://placehold.co/50x50?text=s'
							fluid
							className='rounded-circle border'
						/>
						<div className='w-100'>
							<span className='fw-medium'>{product.seller.name}</span>
							<br />
							<span>{product.seller.description}</span>
						</div>
					</Stack>
					<span className='fs-3 fw-medium pb-3 border-bottom'>
						US ${product.price}
					</span>
					<Stack
						direction='vertical'
						gap={3}
						className='justify-content-between pb-3 border-bottom'
					>
						<span>
							<b>Category:</b> {product.category.name}
						</span>
						<span>
							<b>Brand:</b> {product.brand.name}
						</span>
					</Stack>
					<Button variant='primary' size='lg' className='rounded-pill'>
						Buy it now
					</Button>
					<Button
						variant='outline-primary'
						size='lg'
						className='rounded-pill'
						onClick={handleAddToCart}
					>
						Add to cart
					</Button>
					<Button variant='outline-primary' size='lg' className='rounded-pill'>
						Add to watchlist
					</Button>
				</Stack>
			</Col>
		</Row>
	);
}

export default Detail;
