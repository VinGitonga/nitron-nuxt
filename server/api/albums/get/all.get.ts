import { ApiResponseType } from "~/types/ApiResponse";
import { Album, AlbumDocument } from "~/server/models/album.schema";

export default defineEventHandler(async (event): Promise<ApiResponseType<AlbumDocument[]>> => {
	const albums = await Album.find({});

	return {
		status: "success",
		data: albums,
	};
});
