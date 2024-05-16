import { User, UserDocument } from "~/server/models/user.model";
import { ApiResponseType } from "~/types/ApiResponse";

export default defineEventHandler(async (event): Promise<ApiResponseType<UserDocument[]>> => {
	const users = await User.find({});

	return {
		status: "success",
		data: users as UserDocument[],
	};
});
