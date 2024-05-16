<script setup lang="ts">
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { toast } from "@/components/ui/toast";
import { CreateAlbumSchema } from "~/schemas/albums/create-album.schema";
import { Loader2 } from "lucide-vue-next";

interface IProps {
	refresh?: VoidFunction;
}

const props = defineProps<IProps>();

const open = ref<boolean>(false);
const loading = ref<boolean>(false);

const formSchema = toTypedSchema(CreateAlbumSchema);

const { handleSubmit, resetForm } = useForm({
	validationSchema: formSchema,
	initialValues: {
		title: "",
	},
});

const { createAlbum } = useAlbumUtils();

const onSubmit = handleSubmit(async (values) => {
	loading.value = true;

	try {
		const resp = await createAlbum(values);

		if (resp?.value?.status === "success") {
			toast({
				title: "Album Created",
			});

			resetForm();
			props?.refresh?.();
			open.value = false;
		} else {
			toast({
				title: "Error",
				description: "Unable to create album.",
				variant: "destructive",
			});
		}
	} catch (err) {
		console.log(err)
		toast({
			title: "Error",
			description: "Unable to create album.",
			variant: "destructive",
		});
	} finally {
		loading.value = false;
	}
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
					<Button type="submit" :disabled="loading">
						<Loader2 v-if="loading" class="animate-spin w-5 h-5 mr-2"/>
						{{ loading ? "Saving" : "Save" }}
					</Button>
				</DialogFooter>
			</form>
		</DialogContent>
	</Dialog>
</template>
