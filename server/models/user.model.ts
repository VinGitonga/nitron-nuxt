import { HydratedDocument, Model, model, Schema } from "mongoose";
import { generateHashedPassword } from "../utils/hash";
import bcrypt from "bcryptjs";

interface IUser {
	name: string;
	email: string;
	password: string;
	profileImage?: string;
}

interface UserMethods {
	comparePassword(password: string): Promise<boolean>;
}

type UserModel = Model<IUser>;

const userSchema = new Schema<IUser, UserModel, UserMethods>(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			unique: true,
			required: true,
		},
		password: {
			type: String,
			required: true,
			select: false,
		},
		profileImage: {
			type: String,
			required: false,
		},
	},
	{ timestamps: true }
);

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		return next();
	}

	this.password = await generateHashedPassword(this.password);
});

userSchema.methods.comparePassword = async function (password: string) {
	return await bcrypt.compare(password, this.password);
};

export const User = model<IUser, UserModel>("User", userSchema);
export type UserDocument = HydratedDocument<IUser, UserMethods>;
