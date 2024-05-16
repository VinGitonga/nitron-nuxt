import { z } from "zod";

export const CreateUserSchema = z
	.object({
		name: z.string({ message: "Name is required" }).min(3, "Name must be at least 3 characters long"),
		email: z.string({ message: "Email is required" }).email("Invalid email address"),
		password: z.string({ message: "Password is required" }).min(6, "Password must be at least 6 characters long"),
		confirmPassword: z.string({ message: "Confirm password is required" }).min(6, "Confirm password must be at least 6 characters long"),
		profilePicture: z.string().optional(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});
