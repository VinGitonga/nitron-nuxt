<script setup lang="ts">
const { data } = useAuth();
</script>
<template>
	<div class="py-2">
		<div class="flex items-center justify-between">
			<AppLogo />
			<ul class="hidden md:flex items-center space-x-8">
				<LandingNavLink text="Home" />
				<LandingNavLink text="About Us" />
				<LandingNavLink text="Blog" />
				<LandingNavLink text="Contact Us" />
			</ul>
			<div>
				<AuthButtons v-if="!data" />
				<NuxtLink v-else to="/home">
					<Button class="rounded-full"> Go to Dashboard </Button>
				</NuxtLink>
			</div>
		</div>
	</div>
</template>
