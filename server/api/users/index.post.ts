import { UploadApiResponse } from "cloudinary";
import { z } from "zod";
import { CreateUserSchema } from "~/schemas/users/create-user.schema";
import { User, UserDocument } from "~/server/models/user.model";
import { uploadToCloudinary } from "~/server/utils/cloudinary";
import { ApiResponseType, IApiResponseType } from "~/types/ApiResponse";

export default defineEventHandler(async (event): Promise<ApiResponseType<UserDocument>> => {
	const body = (await readBody(event)) as z.infer<typeof CreateUserSchema>;

	// Validate the request body
	validator.validateSchema(CreateUserSchema, body);

	// confirm user with that email doesn't already exists
	const exists = await User.findOne({ email: body.email });

	if (exists) {
		throw createError<IApiResponseType>({
			statusCode: 400,
			message: "User already exists",
			data: {
				status: "error",
				msg: "User with that email already exists",
			},
		});
	}

	// remove profileImage from the body
	const { profilePicture, confirmPassword: _, ...rest } = body;

	// Create the user
	const newUser = await User.create(rest);

	// if there is a profile image, upload it to cloudinary
	if (profilePicture) {
		try {
			// upload the image to cloudinary
			const result = (await uploadToCloudinary(profilePicture)) as UploadApiResponse;

			// update the user with the profile image
			await User.findByIdAndUpdate(newUser._id, { profilePicture: result.secure_url });
		} catch (err) {
			console.error(err);
		}
	}

	// Return the new user
	return {
		status: "success",
		msg: "User created successfully",
	};
});
