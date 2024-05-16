import type { z } from "zod";
import type { CreateUserSchema } from "~/schemas/users/create-user.schema";
import type { UserDocument } from "~/server/models/user.model";
import type { ApiResponseType } from "~/types/ApiResponse";

export default () => {
	const createUser = async (userInfo: z.infer<typeof CreateUserSchema>) => {
		const resp = await useFetch("/api/users", {
			method: "POST",
			body: userInfo,
		});

		return resp.data;
	};

	const getAllUsers = async () => {
		const { data } = await useFetch<ApiResponseType<UserDocument[]>>("/api/users", {
			method: "GET",
		});

		return data;
	};

	return {
		createUser,
		getAllUsers,
	};
};
