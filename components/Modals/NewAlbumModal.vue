<script setup lang="ts">
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import * as z from "zod";
import { toast } from "@/components/ui/toast";

const open = ref<boolean>(false);

const formSchema = toTypedSchema(
	z.object({
		title: z.string({ message: "Title is required" }).min(3, { message: "Title must be at least 3 characters" }),
	})
);

const { handleSubmit, resetForm } = useForm({
	validationSchema: formSchema,
});

const onSubmit = handleSubmit((values) => {
	toast({
		title: "You submitted the following values:",
		description: h("pre", { class: "mt-2 w-[340px] rounded-md bg-slate-950 p-4" }, h("code", { class: "text-white" }, JSON.stringify(values, null, 2))),
	});
	resetForm()
	open.value = false
});
</script>
<template>
	<Dialog v-model:open="open">
		<DialogTrigger as-child>
			<Button class="rounded-full">Add Album</Button>
		</DialogTrigger>
		<DialogContent class="sm:max-w-[425px] font-inconsolata">
			<form @submit="onSubmit">
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
