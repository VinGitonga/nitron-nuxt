<script setup lang="ts">
import Toaster from '@/components/ui/toast/Toaster.vue'
useHead({
	meta: [
		{
			name: "description",
			content: "A simple application for managing pictures and albums.",
		},
	],
	titleTemplate: (titleChunk) => {
		return titleChunk ? `${titleChunk} - Nitron` : "Nitron";
	},
});
</script>
<template>
	<div class="font-inconsolata">
		<NuxtPage />
		<Toaster />
	</div>
</template>
