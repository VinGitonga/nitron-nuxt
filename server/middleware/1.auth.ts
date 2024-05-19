import { getServerSession } from "#auth";
import UrlPattern from "url-pattern";

export default defineEventHandler(async (event) => {
	// non protected routes including wildcard and also the client side routes
	const nonProtectedRoutes = ["/api/auth/*", "/api/users"];

	const isApiRoute = event.node.req.url!.startsWith("/api");

	if (!isApiRoute) {
		return;
	}

	const isNonProtectedRoute = nonProtectedRoutes.some((route) => {
		const pattern = new UrlPattern(route);
		return pattern.match(event.node.req.url!);
	});

	if (isNonProtectedRoute) {
		return;
	}

	// check if user is authenticated
	const session = await getServerSession(event);

	if (!session) {
		throw createError({
			statusCode: 401,
			message: "Unauthorized",
		});
	}

	event.context.user = session.user as any;
});
