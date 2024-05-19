<script setup lang="ts">
import type { AlbumDocument } from "~/server/models/album.schema";

const { getAlbumById } = useAlbumUtils();
const albumInfo = ref<AlbumDocument | null>(null);

watch(
	() => useRoute().fullPath,
	(id) => {
		console.log(id);
		fetchAlbum();
	},
	{ immediate: true }
);

function getAlbumIdFromRoute() {
	return useRoute().params.id as string;
}

async function fetchAlbum() {
	console.log("Fetching album...");
	try {
		console.log("Am I here?");
		const { data } = await getAlbumById(getAlbumIdFromRoute());

		console.log(data);

		if (data.value?.status === "success") {
			albumInfo.value = data.value.data!;
		}
	} catch (err) {
		console.error(err);
	}
}

onBeforeMount(() => {
	fetchAlbum();
});

console.log(albumInfo.value);
</script>
<template>
	<div></div>
</template>
