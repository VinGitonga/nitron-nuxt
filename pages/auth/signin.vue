<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { toast } from "~/components/ui/toast";
import { SignInUserSchema } from "~/schemas/users/signin-user.schema";
import { Loader2 } from "lucide-vue-next";

const formSchema = toTypedSchema(SignInUserSchema);
const loading = ref<boolean>(false);

const { signIn } = useAuth();

const { handleSubmit, resetForm } = useForm({
	validationSchema: formSchema,
	initialValues: {
		email: "",
		password: "",
	},
});

const onSubmit = handleSubmit(async (values) => {
	loading.value = true;
	try {
		const resp = (await signIn("credentials", {
			email: values.email,
			password: values.password,
			redirect: false,
		})) as any;


		if (resp.error) {
			toast({
				title: "Error",
				description: resp.error,
				variant: "destructive",
			});
		} else {
			toast({
				title: "Success",
				description: "You have successfully signed in",
			});
			resetForm();
			navigateTo("/home");
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
</script>
<template>
	<AuthWrapper title="Log in to your account">
		<form @submit="onSubmit">
			<div class="space-y-4">
				<AppInput name="email" label="Email" placeholder="john.doe@gmail.com" />
				<AppInput name="password" type="password" label="Password" placeholder="*********" />
				<div class="mt-4"></div>
				<NuxtLink to="/auth/forgot-password" class="text-indigo-600 hover:text-indigo-500 hover:underline hover:underline-offset-4">Forgot Password</NuxtLink>
				<div class="mt-4"></div>
				<Button class="w-full" type="submit" :disabled="loading">
					<Loader2 v-if="loading" class="w-5 h-5 mr-2 animate-spin" />
					{{ loading ? "Authenticating" : "Sign In" }}
				</Button>
				<div class="mt-4">
					Don't have an account?
					<NuxtLink to="/auth/signup" class="text-indigo-600 hover:text-indigo-500 hover:underline hover:underline-offset-4">Sign Up</NuxtLink>
				</div>
			</div>
		</form>
	</AuthWrapper>
</template>
