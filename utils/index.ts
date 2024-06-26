export function getInitials(name: string) {
	const splitName = name.trim().split(" ");

	if (splitName.length === 1) {
		return splitName[0][0].toUpperCase();
	} else {
		return (splitName[0][0] + splitName[splitName.length - 1][0]).toUpperCase();
	}
}

export function getFileExtension(filename: string) {
	return filename.split(".").pop();
}

export function getUsername(name: string) {
	return name.replace(/\s/g, "").toLowerCase();
}