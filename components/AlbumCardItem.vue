<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from '@/components/ui/badge'

</script>
<template>
	<div class="max-w-lg border border-solid border-gray-200 rounded-2xl transition-all duration-500">
		<div class="block overflow-hidden">
			<NuxtLink to="/">
				<NuxtImg src="https://source.unsplash.com/random" alt="Album Img" class="w-full rounded-t-2xl max-h-80" />
			</NuxtLink>
		</div>
		<div className="px-4 py-4">
			<NuxtLink>
				<h2 class="text-lg font-semibold hover:underline">Redrum</h2>
			</NuxtLink>
			<div className="mt-5 flex items-center justify-between">
				<div className="flex items-center space-x-2">
					<Avatar class="w-20 h-20 rounded-full border">
						<AvatarImage src="https://api.dicebear.com/8.x/adventurer/svg?seed" />
						<AvatarFallback class="text-black">{{ getInitials("Sean Vincent") }}</AvatarFallback>
					</Avatar>
					<NuxtLink to="/">
						<p class="text-base font-bold transition-all duration-500 leading-5 hover:underline">@sean</p>
					</NuxtLink>
					<p className="font-normal text-sm text-gray-500">Apr 28, 2024</p>
				</div>
                <Badge>2 Photos</Badge>
			</div>
		</div>
	</div>
</template>
