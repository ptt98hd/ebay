import { useEffect, useState } from 'react';
import Context from './Context';
import api from '../../services/api';
import { useNotification } from '../../services/hooks/useNotification';

function Provider({ children }) {
	const notify = useNotification();
	const [user, setUser] = useState(null);
	const [cart, setCart] = useState([]);
	const uid = sessionStorage.getItem('uid') || localStorage.getItem('uid');

	useEffect(() => {
		const fetching = async () => {
			if (uid) {
				const user = (await api.get(`/users/${uid}`)).data || null;
				const cart = (await api.get(`/carts/${uid}`)).data || [];
				if (user) setUser(user);
				if (cart && cart.items) setCart(cart.items);
			}
		};
		fetching();
	}, [uid]);

	const addToCart = async (product) => {
		try {
			const existingItem = cart.find((item) => item.productId === product.id);
			let updatedCart;
			if (existingItem) {
				updatedCart = cart.map((item) =>
					item.productId === product.id
						? { ...item, quantity: item.quantity + 1 }
						: item
				);
			} else {
				updatedCart = [...cart, { productId: product.id, quantity: 1 }];
			}
			setCart(updatedCart);
			await api.patch(`/carts/${uid}`, { items: updatedCart });
			notify('Product added to cart!', 'success');
		} catch (error) {
			console.error('Error adding product to cart:', error);
			alert('Failed to add product to cart. Please try again.');
		}
	};

	const deleteFromCart = async (productId) => {
		if (!uid) {
			alert('You must be logged in to remove items from the cart.');
			return;
		}

		try {
			const updatedCart = (cart || []).filter(
				(item) => String(item.productId) !== String(productId)
			);
			await api.patch(`/carts/${uid}`, { items: updatedCart });
			setCart(updatedCart);
			if (updatedCart.length === 0) {
				notify('Your cart is now empty.', 'info');
			} else {
				notify('Product removed from cart!', 'success');
			}
		} catch (error) {
			if (error.response && error.response.status === 404) {
				alert('Cart not found. Please refresh the page.');
			} else {
				alert('Failed to remove product from cart. Please try again.');
			}
			console.error('Error removing product from cart:', error);
		}
	};

	return (
		<Context.Provider
			value={{ user, setUser, cart, setCart, addToCart, deleteFromCart }}
		>
			{children}
		</Context.Provider>
	);
}

export default Provider;
