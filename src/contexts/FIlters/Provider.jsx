import { useState } from 'react';
import Context from './Context';

function Provider({ children }) {
	const [selectedBrand, setSelectedBrand] = useState('');

	const value = {};
	return <Context.Provider value={value}>{children}</Context.Provider>;
}

export default Provider;
