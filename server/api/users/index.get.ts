import { User } from "~/server/models/user.model";
import { ApiResponseType } from "~/types/ApiResponse";

export default defineEventHandler(async (event): Promise<ApiResponseType<any[]>> => {
	const users = await User.find({});

	return {
		status: "success",
		data: users,
	};
});
