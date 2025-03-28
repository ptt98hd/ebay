const Error = {};

const files = import.meta.glob('./!(index).jsx', { eager: true });

for (const path in files) {
	const moduleName = path.match(/\.\/(.*)\.jsx$/)[1];
	Error[moduleName] = files[path].default;
}

export default Error;
