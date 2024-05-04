<script setup></script>
<template>
	<div class="flex h-screen">
		<div class="">
			<AppSidebar />
		</div>
		<div class="flex flex-col flex-1">
			<div class="hidden border-b">
				<div class="px-2 py-2">
					<div class="flex items-center justify-between">
						<!-- Dialog for Mobile -->
						<!-- <AppLogo /> -->
					</div>
				</div>
			</div>
			<div class="flex flex-col flex-1 overflow-y-auto pt-[20px] px-[5px] md:px-[30px] py-[20px]">
				<slot />
			</div>
		</div>
	</div>
</template>
