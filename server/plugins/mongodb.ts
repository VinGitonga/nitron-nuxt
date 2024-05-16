import mongoose from "mongoose";
import { Nitro } from "nitropack";

export default async (_nitroApp: Nitro) => {
	const mongdbUri = useRuntimeConfig().db.mongodbUri;

	try {
		await mongoose.connect(mongdbUri, {});
		console.log("Connected to MongoDB");
	} catch (err) {
		console.error("Error connecting to MongoDB", err);
	}
};
