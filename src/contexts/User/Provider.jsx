import { useEffect, useState } from 'react';
import Context from './Context';
import api from '../../services/api';

function Provider({ children }) {
	const [categories, setCategories] = useState([]);
	const [brands, setBrands] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState('');
	const [selectedBrand, setSelectedBrand] = useState('');
	const [searchQuery, setSearchQuery] = useState('');
	const [maxPrice, setMaxPrice] = useState(5000);

	useEffect(() => {
		const fetchCategories = async () => {
			const response = await api.get('/categories');
			setCategories(response.data);
		};
		const fetchBrands = async () => {
			const response = await api.get('/brands');
			setBrands(response.data);
		};
		fetchCategories();
		fetchBrands();
	}, []);

	const value = {
		categories,
		setCategories,
		selectedBrand,
		setSelectedBrand,
		brands,
		setBrands,
		maxPrice,
		setMaxPrice,
		selectedCategory,
		setSelectedCategory,
		searchQuery,
		setSearchQuery,
	};

	return <Context.Provider value={value}>{children}</Context.Provider>;
}

export default Provider;
