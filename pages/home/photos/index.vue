<script setup></script>
<template>
	<AppWrapper>
		<Title>Photos</Title>
		<div class="columns-1 md:columns-2 xl:columns-3 gap-7">
			<PhotoCardItem v-for="(_, i) in [...Array.from({ length: 7 })]" :key="i" />
		</div>
	</AppWrapper>
</template>
