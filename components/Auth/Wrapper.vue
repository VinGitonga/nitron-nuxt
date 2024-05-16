<script setup lang="ts">
interface IProps {
	/**
	 * Page title
	 */
	title: string;
}

defineProps<IProps>();
</script>
<template>
	<div class="w-full h-screen flex flex-col items-center justify-center px-4 overflow-y-scroll">
		<div class="max-w-md w-full text-gray-600 space-y-5 my-6">
			<div class="flex flex-col items-center space-y-4 pb-8">
				<AppLogo />
				<h3 class="text-gray-800 text-2xl font-bold sm:text-3xl">
					{{ title }}
				</h3>
			</div>
			<slot />
		</div>
	</div>
</template>
