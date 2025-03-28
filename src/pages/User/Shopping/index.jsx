import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Sidebar from './Sidebar';
import Products from './Products';

function Shopping() {
	return (
		<Row>
			<Col xs={'12'} md='4' lg='3' className=''>
				<Sidebar />
			</Col>
			<Col>
				<Products />
			</Col>
		</Row>
	);
}

export default Shopping;
