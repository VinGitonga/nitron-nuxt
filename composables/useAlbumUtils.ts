import type { z } from "zod";
import type { CreateAlbumSchema } from "~/schemas/albums/create-album.schema";
import type { AlbumDocument } from "~/server/models/album.schema";
import type { ApiResponseType } from "~/types/ApiResponse";

export default () => {
	const createAlbum = async (albumInfo: z.infer<typeof CreateAlbumSchema>) => {
		const { data } = useFetch("/api/albums/create", {
			method: "POST",
			body: albumInfo,
		});

		return data;
	};

	const getAllAlbums = async () => {
		const { data, refresh } = useFetch<ApiResponseType<AlbumDocument[]>>("/api/albums/get/all", {
			method: "get",
		});

		return { data, refresh };
	};

	return { createAlbum, getAllAlbums };
};
