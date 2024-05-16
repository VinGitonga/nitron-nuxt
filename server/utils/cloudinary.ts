import { v2 as _cloudinary } from "cloudinary";

const cloudinary = () => {
	const config = useRuntimeConfig();

	_cloudinary.config({
		cloud_name: config.cloudinary.cloudName,
		api_key: config.cloudinary.apiKey,
		api_secret: config.cloudinary.apiSecret,
	});

	return _cloudinary;
};

export const uploadToCloudinary = async (document: string) => {
	return new Promise((resolve, reject) => {
		cloudinary().uploader.upload(document, (error, result) => {
			if (error) {
				reject(error) as any;
			} else {
				resolve(result)
			}
		});
	});
};
