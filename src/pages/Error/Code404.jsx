import React from 'react';
import { Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Code404() {
	return (
		<Stack
			direction='horizontal'
			gap={5}
			className='align-items-center justify-content-between bg-body-tertiary rounded-4 p-5 shadow-sm border'
		>
			<div className='container-fluid p-5 pe-0'>
				<h1>We looked everywhere.</h1>
				<p className='fs-5'>
					Looks like this page is missing. If you still need help, visit our{' '}
					<a href=''>help pages</a>.
				</p>
				<Link to='/' className='btn btn-dark rounded-pill px-3 py-2'>
					Go to homepage
				</Link>
			</div>
			<div className='container-fluid text-center p-5 ps-0'>
				<img
					src='http://i.ebayimg.com/00/s/MTUwMFgxMjAw/z/8ScAAOSw-ANlzRIW/$_1.PNG?set_id=2'
					alt='Page not found'
					className='img-fluid'
				/>
			</div>
		</Stack>
	);
}

export default Code404;
