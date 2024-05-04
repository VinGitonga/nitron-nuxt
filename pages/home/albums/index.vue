<script setup lang="ts"></script>
<template>
	<Title> Albums </Title>
	<AppWrapper>
		<div class="flex items-center justify-between">
			<div class="">
				<h1 class="font-bold text-xl">Albums</h1>
				<div class="w-full md:w-[75%]">
					<p>List of all albums. This page is just a demo to show how the API works. The data is fetched from the backend and displayed here.</p>
				</div>
			</div>
			<ModalsNewAlbumModal />
		</div>
		<div className="grid grid-cols-2 gap-7 mt-6">
			<AlbumCardItem v-for="(_, i) in [...Array.from({ length: 7 })]" :key="i"/>
		</div>
	</AppWrapper>
</template>
