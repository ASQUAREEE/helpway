import { upload } from '@vercel/blob/client';

export const uploadToVercelBlob = async (file: File, setUrl: (blob: string | null) => void) => {
	try {
		const newBlob = await upload(file.name, file, {
			access: 'public',
			handleUploadUrl: '/api/vercelBlob/upload',
		});

		if (newBlob) setUrl(newBlob.url);
	} catch (error) {
		console.error('Error uploading file:', error);
	}
};
