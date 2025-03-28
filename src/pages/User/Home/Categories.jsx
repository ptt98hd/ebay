import { useContext } from 'react';
import { Col, Row, Stack, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Contexts from '../../../contexts';

function Categories() {
	const { categories, setSelectedCategory } = useContext(Contexts.User.Context);

	return (
		<section>
			<h3 className='mb-4'>Explore Popular Categories</h3>
			<Row className='row-cols-3 row-cols-lg-6 g-4'>
				{categories.map((category) => {
					return (
						<Col key={`category-${category.id}`}>
							<Stack
								as={Link}
								to={`/shopping`}
								direction='vertical'
								gap={3}
								className='text-decoration-none text-body'
								onClick={() => setSelectedCategory(category.id)}
							>
								<Image
									src={category.img}
									alt={category.name}
									fluid
									className='rounded-circle ratio-1x1 bg-body-tertiary p-4 border shadow-sm'
								/>
								<p className='text-center text-truncate fw-semibold'>
									{category.name}
								</p>
							</Stack>
						</Col>
					);
				})}
			</Row>
		</section>
	);
}

export default Categories;
