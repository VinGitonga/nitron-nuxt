import type { z } from "zod";
import type { CreateUserSchema } from "~/schemas/users/create-user.schema";

export default () => {
	const createUser = async (userInfo: z.infer<typeof CreateUserSchema>) => {
		const resp = await useFetch("/api/users", {
			method: "POST",
			body: userInfo,
		});

		return resp.data;
	};

	return {
		createUser,
	};
};
