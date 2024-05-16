<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { toast } from "~/components/ui/toast";
import { CreateUserSchema } from "~/schemas/users/create-user.schema";
import { PenLineIcon, Loader2 } from "lucide-vue-next";

const formSchema = toTypedSchema(CreateUserSchema);
const { createUser } = useUserUtils();
const loading = ref<boolean>(false);

const { resetForm, handleSubmit, setFieldValue, values } = useForm({
	validationSchema: formSchema,
	initialValues: {
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
		profilePicture: undefined,
	},
});

const profileImageRefDiv = ref<HTMLDivElement | null>(null);

const onSubmit = handleSubmit(async (values) => {
	loading.value = true;
	try {
		const resp = await createUser(values);

		if (resp?.value?.status === "success") {
			toast({
				title: "Account Created",
				description: "Your account has been created successfully",
			});
			resetForm();
			navigateTo("/auth/signin");
		} else {
			toast({
				title: "Error",
				description: resp?.value?.msg ?? "An error occurred",
				variant: "destructive",
			});
		}
	} catch (err: any) {
		toast({
			title: "Error",
			description: err?.response?.data?.msg ?? err?.message ?? "An error occurred",
			variant: "destructive",
		});
	} finally {
		loading.value = false;
	}
});

function handleUploadBtnClick() {
	profileImageRefDiv.value?.click();
}

function handleImageChange(event: Event) {
	const target = event.target as HTMLInputElement;
	if (target.files && target.files.length > 0) {
		const file = target.files[0];
		const reader = new FileReader();
		reader.onload = (e) => {
			const target = e.target as FileReader;
			setFieldValue("profilePicture", target.result as string);
		};
		reader.readAsDataURL(file);
	}
}

const avatarUrl = computed(() => values.profilePicture ?? "https://api.dicebear.com/8.x/adventurer/svg?seed=seanvincent");
</script>
<template>
	<AuthWrapper title="Create an Account">
		<form @submit="onSubmit">
			<div class="space-y-4">
				<div class="flex item-center justify-center">
					<div class="relative">
						<Avatar size="lg" class="rounded-full">
							<AvatarImage :src="avatarUrl" />
							<AvatarFallback class="text-black">{{ getInitials("Sean Vincent") }}</AvatarFallback>
						</Avatar>
						<div class="absolute bottom-2 -right-1">
							<Button size="icon" class="rounded-full" @click="handleUploadBtnClick" type="button">
								<PenLineIcon class="text-gray-200 w-4 h-4" />
							</Button>
						</div>
						<input ref="profileImageRefDiv" type="file" class="hidden" @change="handleImageChange" />
					</div>
				</div>
				<AppInput name="name" label="Name" placeholder="Joe Doe" />
				<AppInput name="email" label="Email" placeholder="joe.doe@gmail.com" />
				<AppInput name="password" label="Password" placeholder="*********" />
				<AppInput name="confirmPassword" label="Confirm Password" placeholder="*********" />
				<div class="mt-4"></div>
				<Button class="w-full" :disabled="loading">
					<Loader2 v-if="loading" class="w-5 h-5 mr-2 animate-spin" />
					{{ loading ? "Creating Account..." : "Sign Up" }}
				</Button>
				<div class="mt-4">
					Already have an account?
					<NuxtLink to="/auth/signin" class="text-indigo-600 hover:text-indigo-500 hover:underline hover:underline-offset-4">Sign In</NuxtLink>
				</div>
			</div>
		</form>
	</AuthWrapper>
</template>
