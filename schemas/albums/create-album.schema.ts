import { z } from "zod";

export const CreateAlbumSchema = z.object({
	title: z.string({ message: "Title of the album is required" }).min(3, { message: "Title must be at least 3 characters" }),
});
