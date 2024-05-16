import { ApiResponseType } from "~/types/ApiResponse";
import { Album, AlbumDocument } from "~/server/models/album.schema";
import { PipelineStage } from "mongoose";

export default defineEventHandler(async (event): Promise<ApiResponseType<AlbumDocument[]>> => {
	const pipeline: PipelineStage[] = [
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
			$sort: {
				createdAt: -1,
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
	const albums = await Album.aggregate(pipeline);

	return {
		status: "success",
		data: albums,
	};
});
