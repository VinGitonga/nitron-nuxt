import type { z } from "zod";
import type { CreateAlbumSchema } from "~/schemas/albums/create-album.schema";
import type { AlbumDocument } from "~/server/models/album.schema";
import type { ApiResponseType } from "~/types/ApiResponse";

export default () => {
	const createAlbum = async (albumInfo: z.infer<typeof CreateAlbumSchema>) => {
		const resp = $fetch("/api/albums/create", {
			method: "POST",
			body: albumInfo,
		});

		return resp;
	};

	const getAllAlbums = async () => {
		const { data, refresh } = useAsyncData("get-all-albums", async () => {
			const resp = await $fetch<ApiResponseType<AlbumDocument[]>>("/api/albums/get/all");

			return resp;
		});

		console.log(data)

		return { data, refresh };
	};

	return { createAlbum, getAllAlbums };
};
