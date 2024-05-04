<script setup>
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SquareLibraryIcon } from "lucide-vue-next";
</script>
<template>
	<div class="max-w-xs border border-solid border-gray-200 rounded-2xl transition-all duration-500">
		<div class="block overflow-hidden">
			<NuxtImg src="https://source.unsplash.com/random" class="rounded-t-2xl" />
		</div>
		<div class="-mt-10 ml-5">
			<Avatar class="w-20 h-20 rounded-full border">
				<AvatarImage src="https://api.dicebear.com/8.x/adventurer/svg?seed" />
				<AvatarFallback class="text-black">{{ getInitials("Sean Vincent") }}</AvatarFallback>
			</Avatar>
		</div>
		<div class="p-4 space-y-3">
			<h4 class="text-base font-semibold text-gray-900 capitalize transition-all duration-500">Sean Vincent</h4>
			<p class="text-sm font-normal text-gray-500 transition-all duration-500 leading-5">seanvincent996@gmail.com</p>
			<div class="flex items-center space-x-2 mb-5">
				<SquareLibraryIcon />
				<p class="text-sm font-normal text-gray-500 transition-all duration-500 leading-5">6 Albums</p>
			</div>
			<button class="bg-indigo-600 shadow-sm rounded-full py-2 px-5 text-xs text-white font-semibold">View Profile</button>
		</div>
	</div>
</template>
