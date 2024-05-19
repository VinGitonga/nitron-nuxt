<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { AlbumDocument } from "~/server/models/album.schema";

interface IProps {
	album: AlbumDocument;
	idx?: number;
}

const props = defineProps<IProps>();

const avatarUrl = `https://source.unsplash.com/random?random&${props.idx}`;
const userAvatarUrl = `https://api.dicebear.com/8.x/adventurer/svg?${getUsername(props.album.user?.name ?? "Sean Vincent")}`;
const albumUrlPath = `/home/albums/profile/${props.album._id}`;
</script>
<template>
	<div class="max-w-lg border border-solid border-gray-200 rounded-2xl transition-all duration-500">
		<div class="block overflow-hidden">
			<NuxtLink to="/">
				<NuxtImg :src="avatarUrl" alt="Album Img" class="w-full rounded-t-2xl max-h-80" />
			</NuxtLink>
		</div>
		<div class="px-4 py-4">
			<NuxtLink :to="albumUrlPath">
				<h2 class="text-lg font-semibold hover:underline">
					{{ album.title }}
				</h2>
			</NuxtLink>
			<div class="mt-5 flex items-center justify-between">
				<div class="flex items-center space-x-2">
					<Avatar class="w-20 h-20 rounded-full border">
						<AvatarImage :src="userAvatarUrl" />
						<AvatarFallback class="text-black">{{ getInitials(album.user?.name ?? "Sean Vincent") }}</AvatarFallback>
					</Avatar>
					<NuxtLink to="/">
						<p class="text-base font-bold transition-all duration-500 leading-5 hover:underline">
							{{ album.user?.name }}
						</p>
					</NuxtLink>
					<p class="font-normal text-sm text-gray-500">
						{{
							new Date(album.createdAt).toLocaleDateString("en-US", {
								year: "numeric",
								month: "short",
								day: "numeric",
							})
						}}
					</p>
				</div>
				<Badge>
					{{ album?.photoCount }}
					Photos</Badge
				>
			</div>
		</div>
	</div>
</template>
