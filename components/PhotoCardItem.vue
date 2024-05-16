<script setup lang="ts">
import { PenLineIcon } from "lucide-vue-next";
</script>
<template>
	<div class="break-inside-avoid mb-8">
		<div class="relative group">
			<NuxtImg src="https://source.unsplash.com/random" class="h-auto max-w-full rounded-lg" />
			<div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity opacity-0 group-hover:opacity-100 rounded-lg">
				<div class="flex flex-col justify-between h-full p-2">
					<div class="">
						<p class="text-white">Redrum 2024</p>
					</div>
					<div class="flex items-center justify-between">
						<p class="text-white">Text London</p>
						<Button size="icon" variant="ghost" class="rounded-full hover:bg-gray-500" >
                            <PenLineIcon class="text-gray-200" />
                        </Button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
