const validate = {
	email: (email) => {
		const errors = [];
		if (!email) {
			errors.push('Email is required.');
		} else {
			if (!/^[^\s@]+/.test(email)) {
				errors.push('Email must have text before the "@" symbol.');
			}
			if (!/@[^\s@]+/.test(email)) {
				errors.push('Email must have text after the "@" symbol.');
			}
			if (!/\.[^\s@]+$/.test(email)) {
				errors.push('Email must have a valid domain (e.g., ".com").');
			}
		}
		return errors;
	},
	password: (password) => {
		const errors = [];
		if (!password) {
			errors.push('Password is required.');
		} else {
			if (!/.{8,}/.test(password)) {
				errors.push('Password must be at least 8 characters long.');
			}
			if (!/(?=.*[a-z])/.test(password)) {
				errors.push('Password must contain at least one lowercase letter.');
			}
			if (!/(?=.*[A-Z])/.test(password)) {
				errors.push('Password must contain at least one uppercase letter.');
			}
			if (!/(?=.*\d)/.test(password)) {
				errors.push('Password must contain at least one number.');
			}
			if (!/(?=.*[@$!%*?&])/.test(password)) {
				errors.push(
					'Password must contain at least one special character (@, $, !, %, *, ?, &).'
				);
			}
		}
		return errors;
	},
	name: (name) => {
		const errors = [];
		if (!name) {
			errors.push('Name is required.');
		} else if (!/^[\p{L}\s]+$/u.test(name)) {
			errors.push('Name only contain letters & spaces.');
		}
		return errors;
	},
	phone: (phone) => {
		const errors = [];
		if (!phone) {
			errors.push('Phone number is required.');
		} else {
			if (!/^\d+$/.test(phone)) {
				errors.push('Phone number must only contain digits.');
			}
			if (phone.length < 10 || phone.length > 15) {
				errors.push('Phone number must be between 10 and 15 digits long.');
			}
		}
		return errors;
	},
};

export default validate;
