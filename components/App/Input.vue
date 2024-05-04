<script setup lang="ts">
interface AppInputProps {
	name: string;
	label: string;
	type?: string;
	placeholder?: string;
	class?: string;
	helperText?: string;
}
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "~/components/ui/input";

const props = withDefaults(defineProps<AppInputProps>(), {
	type: "text",
});
</script>
<template>
	<FormField v-slot="{ componentField }" :name="props.name">
		<FormItem>
			<FormLabel>
				{{ props.label }}
			</FormLabel>
			<FormControl>
				<Input :type="props.type" :placeholder="props.placeholder" v-bind="componentField" :class="props.class" />
			</FormControl>
			<FormDescription v-if="props.helperText">
				{{ props.helperText }}
			</FormDescription>
			<FormMessage />
		</FormItem>
	</FormField>
</template>
