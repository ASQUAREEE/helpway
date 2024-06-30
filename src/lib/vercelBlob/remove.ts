export const removeVercelBlob = async (
	fileUrl: string,
	saveKey: (blob: string | null) => void,
) => {
	try {
		const response = await fetch(`/api/vercelBlob/remove?url=${fileUrl}`, {
			method: 'DELETE',
		});

		if (response.ok) {
			saveKey(null);
		} else {
			console.error('Error uploading file:', response.statusText);
		}
	} catch (error) {
		console.error('Error uploading file:', error);
	}
};
