// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	modules: ["@nuxtjs/tailwindcss", "shadcn-nuxt", "@nuxtjs/google-fonts", "nuxt-icon", "@nuxt/image", "@sidebase/nuxt-auth"],
	shadcn: {
		/**
		 * Prefix for all the imported component
		 */
		prefix: "",
		/**
		 * Directory that the component lives in.
		 * @default "./components/ui"
		 */
		componentDir: "./components/ui",
	},
	googleFonts: {
		families: {
			Inconsolata: "200..900",
		},
	},
	auth: {
		provider: {
			type: "authjs",
		},
	},
	runtimeConfig: {
		auth: {
			secret: process.env.AUTH_SECRET,
			origin: process.env.AUTH_ORIGIN,
		},
		db: {
			mongodbUri: process.env.MONGODB_URI,
		},
		cloudinary: {
			cloudName: process.env.CLOUDINARY_CLOUD_NAME,
			apiKey: process.env.CLOUDINARY_API_KEY,
			apiSecret: process.env.CLOUDINARY_API_SECRET,
		},
	},
	nitro: {
		plugins: ["~/server/plugins/mongodb"],
	},
});
