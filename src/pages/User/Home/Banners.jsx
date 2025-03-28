import { useState, useEffect } from 'react';
import api from '../../../services/api';
import { Button, Carousel, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Banners() {
	const [banners, setBanners] = useState([]);

	useEffect(() => {
		const fetchBanners = async () => {
			const response = await api.get('/banners');
			setBanners(response.data);
		};
		fetchBanners();
	});

	return (
		<Carousel
			slide
			interval={2000}
			pause='hover'
			touch
			className='rounded-4 overflow-hidden border'
		>
			{banners.map((banner) => {
				return (
					<Carousel.Item key={`banner-${banner.id}`}>
						<Image
							src={banner.img}
							alt={banner.title}
							className='d-block w-100 object-fit-cover'
							style={{ height: '24rem' }}
						/>
						<Carousel.Caption className='mb-3'>
							<h2>{banner.title}</h2>
							<p>{banner.description}</p>
							<Button
								as={Link}
								to={banner.href}
								variant='light'
								className='rounded-pill px-4 shadow'
							>
								{banner.action}
							</Button>
						</Carousel.Caption>
					</Carousel.Item>
				);
			})}
		</Carousel>
	);
}

export default Banners;
