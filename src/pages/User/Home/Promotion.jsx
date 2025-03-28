import React from 'react';
import { Button, Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Promotion() {
	return (
		<Stack
			direction='horizontal'
			className='align-items-center justify-content-between bg-dark text-light rounded-4 p-5 shadow-sm border'
		>
			<div>
				<h4>Shop made easy</h4>
				<p className='mb-0'>
					Enjoy reliability, secure deliveries and hassle-free returns.
				</p>
			</div>
			<Button
				as={Link}
				variant='light'
				to={`/helps`}
				className='rounded-pill px-4 py-2'
			>
				Start Now
			</Button>
		</Stack>
	);
}

export default Promotion;
