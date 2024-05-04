<script setup lang="ts">
import { cn } from "~/lib/utils";

type IProps = {
	text: string;
	href: string;
	iconName: string;
};
const props = defineProps<IProps>();
const route = useRoute();

const selected = computed<boolean>(() => {
	if (props.href && route.fullPath !== "/") {
		return route.fullPath === `/${props.href}`;
	}

	return false;
});
</script>
<template>
	<li>
		<NuxtLink :to="`/${href}`">
			<div :class="cn('flex items-center space-x-3 bg-gray-100 p-2 rounded-xl cursor-pointer hover:bg-[#ff9900]/40 transition-colors', selected && 'bg-[#ff9900]')">
				<Icon :name="iconName" size="24px" />
				<p className="text-lg font-medium">{{ text }}</p>
			</div>
		</NuxtLink>
	</li>
</template>
