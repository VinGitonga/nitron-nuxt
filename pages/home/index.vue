<script setup lang="ts">
import type { UserDocument } from "~/server/models/user.model";
import { Loader2 } from "lucide-vue-next";

const { getAllUsers } = useUserUtils();

const data = await getAllUsers();

const users = ref<UserDocument[]>(data?.value?.status === "success" ? (data.value.data as UserDocument[]) : []);
</script>
<template>
	<AppWrapper>
		<Title> Home </Title>
		<div class="">
			<h1 class="font-bold text-xl">Home</h1>
			<p>List of all users and their albums. This page is just a demo to show how the API works. The data is fetched from the backend and displayed here.</p>
		</div>
		<div v-if="users.length" class="grid grid-cols-1 md:grid-cols-3 gap-x-5 gap-y-10 mt-6 place-items-center md:place-items-start">
			<UserCardItem v-for="(user, i) in users" :key="i" :user="user" :idx="i" />
		</div>
		<div v-if="users.length === 0 || !users" class="flex items-center justify-center h-96">
			<Loader2 class="w-24 h-24 animate-spin" />
		</div>
	</AppWrapper>
</template>
