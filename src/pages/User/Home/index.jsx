import React from 'react';
import Banners from './Banners';
import { Stack } from 'react-bootstrap';
import Promotion from './Promotion';
import Categories from './Categories';

function Home() {
	return (
		<Stack gap={5}>
			<Banners />
			<Categories />
			<Promotion />
		</Stack>
	);
}

export default Home;
