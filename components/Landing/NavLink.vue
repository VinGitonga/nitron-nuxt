<script setup lang="ts">
interface IProps {
	/**
	 * The title of Nav
	 */
	text: string;
}

defineProps<IProps>();
</script>
<template>
	<NuxtLink to="/">
		<li class="text-xl font-medium hover:text-[#ff9900] hover:underline hover:underline-offset-4 transition-colors duration-200">
			{{ text }}
		</li>
	</NuxtLink>
</template>
