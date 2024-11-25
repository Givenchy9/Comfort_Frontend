<template>
  <div class="grid grid-cols-4">
    <div class="col-span-1 h-96 p-2">
      <div class="rounded-xl h-full border-r pr-8 mt-20">
        <div class="grid grid-col-2 gap-2">
          <h1 class="text-gray-700 text-center text-2xl py-2 dark:text-white">Settings</h1>
          <RouterLink
            to="/settings/profile"
            active-class="text-white"
            class="py-2 px-4 rounded-full bg-gray-200 font-bold text-center hover:bg-black/40 dark:bg-gray-400 duration-200 hover:text-white"
          >
            Profile</RouterLink
          >
          <RouterLink
            to="/settings/update_account"
            active-class="text-white"
            class="py-2 px-4 rounded-full bg-gray-200 font-bold text-center hover:bg-black/40 dark:bg-gray-400 duration-200 hover:text-white"
          >
            Verander Account</RouterLink
          >

          <RouterLink
            to="/settings/become_complete"
            active-class="text-white"
            class="py-2 px-4 rounded-full bg-gray-200 font-bold text-center hover:bg-black/40 dark:bg-gray-400 duration-200 hover:text-white"
          >
            Complete</RouterLink
          >
        </div>
      </div>
    </div>
    <div class="col-span-3 p-2">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import Footer from '@/components/Footer.vue'
import header3 from '@/components/header3.vue'
</script>

<style scoped>
.favorites-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.favorites-content {
  flex-grow: 1;
}
</style>
