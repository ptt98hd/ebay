import { useContext, useEffect, useState } from 'react';
import { Card, Form, Stack, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import validate from '../../utils/validate';
import { useNotification } from '../../services/hooks/useNotification';
import Contexts from '../../contexts';

function SignIn() {
	const navigate = useNavigate();
	const notify = useNotification();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [staySignin, setStaySignin] = useState(false);
	const { user, setUser } = useContext(Contexts.Global.Context);

	useEffect(() => {
		if (user) {
			navigate('/');
		}
	}, [user, navigate]);

	const handleSignin = async () => {
		try {
			const response = await api.get(
				`/users?email=${email}&password=${password}`
			);
			if (response && response.data && response.data[0]) {
				const data = response.data[0];
				const uid = data.id;
				staySignin
					? localStorage.setItem('uid', uid)
					: sessionStorage.setItem('uid', uid);
				setUser(data);
				notify('Sign in successful', 'success');
				navigate('/');
			} else {
				throw new Error('Email or password is incorrect.');
			}
		} catch (error) {
			console.log(error);
			notify('Sign in false', 'error');
		}
	};

	return (
		<Stack className='align-items-center'>
			<Card className='w-100 px-0' style={{ maxWidth: '30rem' }} border='0'>
				<Card.Header className='bg-transparent border-0 text-center px-0'>
					<h1>Sign in to your account</h1>
					<p>
						New to eBay? <Link to={'/auth/signup'}>Sign Up</Link>
					</p>
				</Card.Header>
				<Card.Body className='px-0'>
					<Stack gap={3}>
						<Form.Group>
							<Form.FloatingLabel
								label='Email address'
								controlId='signin-email'
							>
								<Form.Control
									type='email'
									placeholder='example@email.com'
									onChange={(event) => setEmail(event.target.value)}
								/>
							</Form.FloatingLabel>
							<Form.Text className='text-danger'>
								{validate.email(email)[0]}
							</Form.Text>
						</Form.Group>
						<Form.Group>
							<Form.FloatingLabel label='Password' controlId='signin-password'>
								<Form.Control
									type='password'
									placeholder='P@ssW0rd'
									onChange={(event) => setPassword(event.target.value)}
								/>
							</Form.FloatingLabel>
						</Form.Group>
						<Button
							variant='success'
							size='lg'
							disabled={validate.email(email).length !== 0}
							onClick={handleSignin}
						>
							Sign In
						</Button>
						<Form.Check
							type='checkbox'
							label='Stay signed in'
							id='signin-save'
							className='mx-auto'
							onChange={(event) => setStaySignin(event.target.checked)}
						/>
						<div className='position-relative'>
							<hr />
							<span className='position-absolute top-50 start-50 translate-middle bg-white p-2'>
								or continue with
							</span>
						</div>
						<Stack
							direction='horizontal'
							gap={3}
							className='justify-content-between flex-column flex-sm-row'
						>
							<Button size='lg' variant='danger' className='w-100'>
								Google
							</Button>
							<Button size='lg' variant='primary' className='w-100'>
								Facebook
							</Button>
							<Button size='lg' variant='dark' className='w-100'>
								Apple
							</Button>
						</Stack>
					</Stack>
				</Card.Body>
			</Card>
		</Stack>
	);
}

export default SignIn;
