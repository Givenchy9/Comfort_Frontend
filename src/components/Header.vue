<template>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <header class="pt-10">
    <div id="header" class="content-center ml-[5%] mr-[5%] w-[90%] h-[10%] grid grid-cols-4 border-2 rounded-lg border-black p-2">
      <div class="flex items-center pl-[15%]">
        <router-link to="/" class="inline-flex items-center">
            <button class="flex items-center">
                <img src="/favicon.ico" alt="favicon" class="w-6 h-6 mr-2" />
            </button>
        </router-link>
      </div>

      <div class="content-center relative group">
        <span class="cursor-pointer max-w-[8rem] overflow-hidden text-ellipsis whitespace-nowrap">
          Woningen
        </span>
        <div class="absolute left-0 hidden group-hover:block bg-white mt-1">
          <button class="bg-green-500">
            <a class="max-w-44 block overflow-hidden text-ellipsis whitespace-nowrap pr-4" href="index.html">HalloHalloHalloHalloHalloHalloHalloHalloHallo</a>
          </button>
        </div>
      </div>



      <div class="content-center border-black">
        <input type="text" placeholder="Search.." class="w-full border p-1" />
      </div>

      <div class="content-center justify-self-end pr-[15%]">
            <span class="p-12"> <i class="fa-solid fa-gear"></i> </span>
        <router-link to="/" class="inline-flex items-center">
        <button href="../views/HomeView.vue">Inloggen</button>
        </router-link>
      </div>
    </div>
  </header>
</template>
 
<script>


</script>