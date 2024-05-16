import { NuxtAuthHandler } from "#auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { User, UserDocument } from "~/server/models/user.model";

async function getUserById(id: string) {
	const user = await User.findById(id);

	return user?.toJSON();
}

export default NuxtAuthHandler({
	secret: useRuntimeConfig().auth.secret,
	pages: {
		signIn: "/auth/signin",
	},
	providers: [
		// @ts-expect-error to be fixed by Vite soon
		CredentialsProvider.default({
			name: "credentials",
			origin: useRuntimeConfig().auth.origin,
			async authorize(credentials: { email: string; password: string }) {
				const user = (await User.findOne({ email: credentials.email }).select("+password")) as UserDocument;

				if (!user) {
					throw new Error("Invalid credentials");
				}

				const isValid = await user.comparePassword(credentials.password);

				if (!isValid) {
					return new Error("Invalid credentials");
				}

				// Return the user object withouth the password
				return { ...user.toObject(), password: undefined };
			},
		}),
	],
	session: {
		strategy: "jwt",
	},
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token = {
					...token,
					...user,
				};
			}

			return token;
		},

		async session({ session, token }) {
			// @ts-expect-error
			const refreshedUser = await getUserById(token._id);

			session.user = {
				...token,
				...session.user,
				...refreshedUser,
			};

			return session;
		},
	},
});
