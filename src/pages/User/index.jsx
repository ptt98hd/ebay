const Pages = {};

const files = import.meta.glob('./*/index.jsx', { eager: true });

for (const path in files) {
	const folderName = path.split('/')[1];
	Pages[folderName] = files[path].default;
}

export default Pages;
