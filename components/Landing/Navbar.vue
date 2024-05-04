<script setup lang="ts"></script>
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
			<Button class="rounded-full">Get Started</Button>
		</div>
	</div>
</template>
