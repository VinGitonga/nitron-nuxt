<script setup lang="ts">
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import * as z from "zod";
const open = ref<boolean>(false);

const formSchema = toTypedSchema(
	z.object({
		title: z.string({ message: "Title is required" }).min(3, { message: "Title must be at least 3 characters" }),
	})
);

const { handleSubmit } = useForm({
	validationSchema: formSchema,
});

const onSubmit = async () => {};
</script>
<template>
	<Dialog v-model:open="open">
		<DialogTrigger as-child>
			<Button class="rounded-full">Add Album</Button>
		</DialogTrigger>
		<DialogContent class="sm:max-w-[425px] font-inconsolata">
			<form @submit="handleSubmit(onSubmit)">
				<DialogHeader>
					<DialogTitle>Add Album</DialogTitle>
					<DialogDescription>Enter the title of the album</DialogDescription>
				</DialogHeader>
				<div class="py-4">
					<AppInput name="title" label="Title" placeholder="e.g. Vintage Cars" />
				</div>
				<DialogFooter>
					<Button type="submit"> Save Changes </Button>
				</DialogFooter>
			</form>
		</DialogContent>
	</Dialog>
</template>
