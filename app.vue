<script setup lang="ts">
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
	</div>
</template>
