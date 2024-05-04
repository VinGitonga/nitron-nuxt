<script setup lang="ts"></script>
<template>
	<AppWrapper>
		<Title> Home </Title>
		<div class="">
			<h1 class="font-bold text-xl">Home</h1>
			<p>List of all users and their albums. This page is just a demo to show how the API works. The data is fetched from the backend and displayed here.</p>
		</div>
		<div class="grid grid-cols-1 md:grid-cols-3 gap-x-5 gap-y-10 mt-6 place-items-center md:place-items-start">
			<UserCardItem v-for="(_, i) in [...Array.from({ length: 10 })]" :key="i" />
		</div>
	</AppWrapper>
</template>
