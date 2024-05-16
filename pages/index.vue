<script setup lang="ts">
const { data } = useAuth();

console.log(data.value);
</script>
<template>
	<LandingWrapper>
		<div class="mt-10">
			<div class="grid grid-cols-8 gap-5">
				<div class="col-auto md:col-span-5">
					<h1 class="text-[60px] font-bold">The perfect place to backup your memories and share them with your loved ones.</h1>
					<div class="mt-10">
						<h3 class="text-lg">We provide the best cloud storage for your photos and videos. Our platform is designed to help you store your memories and share them with your loved ones.</h3>
					</div>
					<div class="mt-6">
						<AuthButtons v-if="!data" />
						<NuxtLink v-else to="/home">
							<Button class="rounded-full"> Go to Dashboard </Button>
						</NuxtLink>
					</div>
				</div>
				<div class="col-auto md:col-span-3">
					<NuxtImg src="/images/vintage-photos.jpg" alt="" class="rounded-3xl h-[600px]" />
				</div>
			</div>
		</div>
	</LandingWrapper>
</template>
