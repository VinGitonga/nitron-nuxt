import { HydratedDocument, model, Model, Schema } from "mongoose";
import { UserDocument } from "./user.model";

interface IAlbum {
	title: string;
	user?: UserDocument;
    createdAt: string;
	updatedAt: string
}

type AlbumModel = Model<IAlbum>;

const albumSchema = new Schema<IAlbum, AlbumModel>(
	{
		title: {
			type: String,
			required: true,
		},
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
	},
	{ timestamps: true }
);

export const Album = model<IAlbum, AlbumModel>("Album", albumSchema);
export type AlbumDocument = HydratedDocument<IAlbum>;
