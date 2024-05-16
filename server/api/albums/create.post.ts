import { z } from "zod";
import { CreateAlbumSchema } from "~/schemas/albums/create-album.schema";
import { Album } from "~/server/models/album.schema";
import { ApiResponseType } from "~/types/ApiResponse";

export default defineEventHandler(async (event): Promise<ApiResponseType> => {
	const body = (await readBody(event)) as z.infer<typeof CreateAlbumSchema>;

	validator.validateSchema(CreateAlbumSchema, body);

	const user = event.context.user;

	const albumInfo = {
		...body,
		user: user._id,
	};

	await Album.create(albumInfo);

	return {
		status: "success",
		msg: "Album Created",
	};
});
