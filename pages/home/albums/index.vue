<script setup lang="ts">
import type { AlbumDocument } from "~/server/models/album.schema";
import { Loader2 } from "lucide-vue-next";

const { getAllAlbums } = useAlbumUtils();

const albums = ref<AlbumDocument[] | null>(null);
const refresh = ref<VoidFunction | null>(null);

onBeforeMount(async () => {
	console.log("Fetching all albums...");
	try {
		console.log("Am I here?")
		const { data, refresh: mutate } = await getAllAlbums();

		if (data.value?.status === "success") {
			albums.value = data.value.data!;
			refresh.value = mutate;
		}
	} catch (err) {
		console.error(err);
	}
});

console.log(albums.value)
</script>
<template>
	<Title> Albums </Title>
	<AppWrapper>
		<div class="flex items-center justify-between">
			<div class="">
				<h1 class="font-bold text-xl">Albums</h1>
				<div class="w-full md:w-[75%]">
					<p>List of all albums. This page is just a demo to show how the API works. The data is fetched from the backend and displayed here.</p>
				</div>
			</div>
			<div class="flex items-center space-x-3">
				<ModalsNewAlbumModal :refresh="refresh!" />
			</div>
		</div>
		<div v-if="albums?.length" className="grid grid-cols-2 gap-7 mt-6">
			<AlbumCardItem v-for="(album, i) in albums" :key="i" :album="album" :idx="i" />
		</div>
		<div v-if="albums?.length === 0 || !albums" class="flex items-center justify-center h-96">
			<Loader2 class="w-24 h-24 animate-spin" />
		</div>
	</AppWrapper>
</template>
