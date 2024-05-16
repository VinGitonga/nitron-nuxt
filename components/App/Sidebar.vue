<script setup>
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
const { data, signOut } = useAuth();

const account = computed(() => data?.value);

const imgUrl = computed(() => `https://api.dicebear.com/8.x/adventurer/svg?seed=${getUsername(account?.value?.user?.name)}`);

const logout = async () => {
	await signOut({
		callbackUrl: "/auth/signin",
	});
};
</script>
<template>
	<aside class="h-screen">
		<nav class="h-full flex flex-col bg-white w-[calc(15rem)] md:border-r overflow-y-scroll">
			<div class="md:px-4 py-8 md:py-5 h-full">
				<div class="flex flex-col h-full justify-between flex-1">
					<div class="">
						<AppLogo />
						<div class="mt-6">
							<div class="relative text-gray-500 focus-within:text-gray-900">
								<div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
									<Icon name="ic:round-search" size="24px" />
								</div>
								<input
									type="text"
									id="default-search"
									class="block w-full max-w-xs pr-4 pl-12 py-2 text-sm font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none leading-relaxed"
									placeholder="Search ... " />
							</div>
						</div>
						<div class="mt-4">
							<ul class="space-y-4">
								<SidebarItem text="Home" href="home" icon-name="ic:round-home" />
								<SidebarItem text="Albums" href="home/albums" icon-name="mdi:library-shelves" />
								<SidebarItem text="Photos" href="home/photos" icon-name="mdi:folder-multiple-image" />
							</ul>
						</div>
					</div>
					<div class="">
						<div class="flex items-center justify-between border px-1 py-2 rounded-2xl">
							<div class="flex items-center space-x-1">
								<Avatar class="w-10 h-10 rounded-full">
									<AvatarImage :src="imgUrl" />
									<AvatarFallback class="text-black">{{ getInitials(account?.user?.name) }}</AvatarFallback>
								</Avatar>
								<p class="truncate capitalize">
									{{ account?.user?.name }}
								</p>
							</div>
							<Button size="icon" class="rounded-full" variant="ghost" @click="logout" >
								<Icon name="mdi:logout" size="24px" />
							</Button>
						</div>
					</div>
				</div>
			</div>
		</nav>
	</aside>
</template>
