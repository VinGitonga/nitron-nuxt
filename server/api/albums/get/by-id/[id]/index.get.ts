import mongoose, { PipelineStage } from "mongoose";
import { Album, AlbumDocument } from "~/server/models/album.schema";
import { ApiResponseType } from "~/types/ApiResponse";

export default defineEventHandler(async (event): Promise<ApiResponseType<AlbumDocument>> => {
	const albumId = getRouterParam(event, "id");

	const pipeline: PipelineStage[] = [
		{
			$match: {
				_id: new mongoose.Types.ObjectId(albumId),
			},
		},
		{
			$lookup: {
				from: "photos",
				localField: "_id",
				foreignField: "album",
				as: "photos",
			},
		},
		{
			$lookup: {
				from: "users",
				localField: "user",
				foreignField: "_id",
				as: "user",
			},
		},
		{
			$addFields: {
				user: { $arrayElemAt: ["$user", 0] },
			},
		},
		{
			$project: {
				_id: 1,
				title: 1,
				user: 1,
				photoCount: { $size: "$photos" },
				createdAt: 1,
				updatedAt: 1,
			},
		},
	];

	const album = await Album.aggregate(pipeline);

	if (!album) {
		throw createError<ApiResponseType<any>>({
			statusCode: 404,
			message: "Album not found",
			data: {
				status: "error",
				msg: "Album not found",
			},
		});
	}

	return {
		status: "success",
		data: album?.[0],
	};
});
