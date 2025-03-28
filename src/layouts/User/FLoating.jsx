import { useState, useEffect } from 'react';
import { Button, Modal, Stack } from 'react-bootstrap';
import './floating.css';
import { Link, useLocation } from 'react-router-dom';

function Floating() {
	const [isVisible, setIsVisible] = useState(false);
	const [showHelps, setShowHelps] = useState(false);
	const location = useLocation();

	const toggleVisibility = () => {
		setIsVisible(window.scrollY > 300);
	};

	useEffect(() => {
		window.addEventListener('scroll', toggleVisibility);
		return () => {
			window.removeEventListener('scroll', toggleVisibility);
		};
	});

	useEffect(() => {
		setShowHelps(false);
	}, [location]);

	return (
		<>
			<Stack
				direction='vertical'
				gap={3}
				className='position-fixed bottom-0 end-0 p-4'
			>
				{isVisible && (
					<Button
						variant='light'
						className='rounded-circle border shadow'
						style={{ width: '3rem', height: '3rem' }}
						onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
					>
						<i className='bi bi-chevron-up' />
					</Button>
				)}
				<Button
					variant='light'
					className='rounded-circle border shadow'
					style={{ width: '3rem', height: '3rem' }}
					onClick={() => setShowHelps(true)}
				>
					<i className='bi bi-question' />
				</Button>
			</Stack>
			<Modal
				show={showHelps}
				onHide={() => setShowHelps(false)}
				centered={false}
				dialogAs={Modal.Dialog}
				dialogClassName='position-fixed bottom-0 end-0 m-4 shadow custom-dialog'
			>
				<Modal.Header className='modal-header px-4'>
					<Modal.Title className='modal-title fs-5' id='exampleModalLabel'>
						Helps
					</Modal.Title>
					<Button
						variant='light'
						className='btn-close'
						onClick={() => setShowHelps(false)}
					/>
				</Modal.Header>
				<Modal.Body className='modal-body px-4'>
					<h4 className='mb-3'>How can we help you?</h4>
					<p>
						Find answers to your buying, selling, and account questions, or
						contact us for more help.
					</p>
					<Button
						as={Link}
						to='/helps'
						variant='primary'
						className='rounded-pill w-100 mb-4'
					>
						Visit Help & Contact
					</Button>
					<h4 className='mb-3'>Report content</h4>
					<p>
						If you find content that may not comply with our policies or
						applicable law, you can submit a report to help eBay maintain a safe
						environment for all. <br />
						<Link to='/helps'>Learn more</Link>
					</p>
					<Button as={Link} to='/report' className='rounded-pill w-100 mb-4'>
						Submit report
					</Button>
					<h4 className='mb-3'>Let us know</h4>
					<div className='vstack gap-2'>
						<Link to='/feedback' className='text-decoration-none fw-bold fs-5'>
							Send feedback <i className='bi bi-arrow-right' />
						</Link>
						<Link to='/report' className='text-decoration-none fw-bold fs-5'>
							Report a technical problem <i className='bi bi-arrow-right' />
						</Link>
					</div>
				</Modal.Body>
			</Modal>
		</>
	);
}

export default Floating;
