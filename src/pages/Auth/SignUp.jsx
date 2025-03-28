import { useContext, useEffect, useState } from 'react';
import { Card, Form, Stack, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import validate from '../../utils/validate';
import Contexts from '../../contexts';

function SignIn() {
	const navigate = useNavigate();
	const [firstname, setFirstname] = useState('');
	const [lastname, setLastname] = useState('');
	const [phone, setPhone] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { user } = useContext(Contexts.Global.Context);

	useEffect(() => {
		if (user) {
			navigate('/');
		}
	}, [user, navigate]);

	const handleSignup = async () => {
		try {
			const isDuplicateEmail = await api.get(`/users?email=${email}`);
			const isDuplicatePhone = await api.get(`/users?phone=${phone}`);
			if (isDuplicateEmail.data.length > 0) {
				throw new Error('Email is already in use.');
			}
			if (isDuplicatePhone.data.length > 0) {
				throw new Error('Phone number is already in use.');
			}
			const response = await api.post('/users', {
				firstname,
				lastname,
				phone,
				email,
				password,
			});
			if (response.status >= 200 && response.status < 300) {
				navigate('/auth/signin');
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Stack className='align-items-center'>
			<Card className='w-100 px-0' style={{ maxWidth: '30rem' }} border='0'>
				<Card.Header className='bg-transparent border-0 text-center px-0'>
					<h1>Create an account</h1>
					<p>
						Already have an account? <Link to={'/auth/signin'}>Sign In</Link>
					</p>
				</Card.Header>
				<Card.Body className='px-0'>
					<Stack gap={3}>
						<Stack direction='horizontal' gap={3}>
							<Form.Group className='w-100'>
								<Form.FloatingLabel
									label='First name'
									controlId='signin-firstname'
								>
									<Form.Control
										type='text'
										placeholder='John'
										onChange={(event) => setFirstname(event.target.value)}
									/>
								</Form.FloatingLabel>
								<Form.Text className='text-danger px-2'>
									{validate.name(firstname)[0]}
								</Form.Text>
							</Form.Group>
							<Form.Group className='w-100'>
								<Form.FloatingLabel
									label='Last name'
									controlId='signin-lastname'
								>
									<Form.Control
										type='text'
										placeholder='Doe'
										onChange={(event) => setLastname(event.target.value)}
									/>
								</Form.FloatingLabel>
								<Form.Text className='text-danger px-2'>
									{validate.name(lastname)[0]}
								</Form.Text>
							</Form.Group>
						</Stack>
						<Form.Group>
							<Form.FloatingLabel label='Phone number' controlId='signin-email'>
								<Form.Control
									type='tel'
									placeholder='012345789'
									onChange={(event) => setPhone(event.target.value)}
								/>
							</Form.FloatingLabel>
							<Form.Text className='text-danger px-2'>
								{validate.phone(phone)[0]}
							</Form.Text>
						</Form.Group>
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
							<Form.Text className='text-danger px-2'>
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
							<Form.Text className='text-danger px-2'>
								{validate.password(password)[0]}
							</Form.Text>
						</Form.Group>
						<Button
							variant='success'
							size='lg'
							disabled={
								validate.name(firstname).length !== 0 ||
								validate.name(lastname).length !== 0 ||
								validate.phone(phone).length !== 0 ||
								validate.email(email).length !== 0 ||
								validate.password(password).length !== 0
							}
							onClick={handleSignup}
						>
							Sign Up
						</Button>
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
