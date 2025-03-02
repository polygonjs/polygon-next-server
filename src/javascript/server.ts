import express from 'express';
import path from 'path';
import fs from 'fs/promises';
import cors from 'cors';

const app = express();
app.use(
	express.json(),
	cors()
	/*{
		origin: ['http://localhost:5173'],
		methods: ['GET'],
		optionsSuccessStatus: 200,
	}*/
);
const PORT = process.env.PORT || 3000;
// Change this to your desired assets directory
const ASSETS_DIR = path.join(__dirname, '../../../polygon-next-assets/');

app.get('/assets/*', async (req, res) => {
	try {
		// Extract the file path from the URL
		const filePath = req.path.replace('/assets/', '');
		// Resolve the full path (joining with the assets directory)
		const fullPath = path.join(ASSETS_DIR, filePath);
		console.log(`ASSET: ${filePath} -> ${fullPath}`);

		// Check if file exists and read it
		const file = await fs.readFile(fullPath);

		// Set content-type header based on file extension
		const ext = path.extname(filePath).toLowerCase();
		const contentType =
			{
				'.jpg': 'image/jpeg',
				'.jpeg': 'image/jpeg',
				'.png': 'image/png',
				'.gif': 'image/gif',
				'.pdf': 'application/pdf',
				'.txt': 'text/plain',
				// Add more mime types as needed
			}[ext] || 'application/octet-stream';

		res.setHeader('Content-Type', contentType);
		res.send(file);
	} catch (error) {
		console.error('Error serving asset:', error);
		res.status(404).send('Asset not found');
	}
});

app.post('/save.json', async (req, res) => {
	const {filePath, content} = req.body as SaveRequestData;

	await fs.writeFile(filePath, content);

	const date = nowFormatted();
	const message = `File saved:\n${filePath}\non ${date}`;
	const responseData: SaveResponseData = {
		success: true,
		message,
	};
	res.json(responseData);
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

interface SaveRequestData {
	filePath: string;
	content: string;
}
interface SaveResponseData {
	success: boolean;
	message: string;
}

export function nowFormatted() {
	const now = new Date();
	const formattedDate = now.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
		timeZoneName: 'short',
	});
	return formattedDate;
}
