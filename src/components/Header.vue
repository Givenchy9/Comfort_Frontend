<template>
  <header class="p-10">
    <div id="header" class="content-center w-full h-[10%] grid grid-cols-5 border-2 rounded-lg border-black p-2">
      <!-- Favicon Section -->
      <div class="flex items-center pl-[15%]">
        <img src="/favicon.ico" alt="favicon" class="w-6 h-6 mr-2" />
      </div>

      <!-- Hover Dropdown Section -->
      <div class="content-center relative group">
        <span class="cursor-pointer">Woningen</span>
        <div class="absolute left-0 hidden group-hover:block bg-white mt-1">
          <button class="bg-green-500">
            <a class="pr-4" href="index.html">Hallo</a>
          </button>
        </div>
      </div>

      <!-- Search Section -->
      <div class="content-center border-black">
        <input type="text" placeholder="Search.." class="w-full border p-1" />
      </div>

      <!-- Settings Icon Section -->
      <div class="content-center justify-self-end">
        <i class="fa-solid fa-gear"></i>
      </div>

      <!-- Login Button Section -->
      <div class="content-center justify-self-end pr-[15%]">
        <button>Inloggen</button>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style scoped>
/* Add custom styles here if needed */
</style>
