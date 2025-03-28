const Seller = {};

const files = import.meta.glob('./!(index).jsx', { eager: true });

for (const path in files) {
	const moduleName = path.match(/\.\/(.*)\.jsx$/)[1];
	Seller[moduleName] = files[path].default;
}

export default Seller;
