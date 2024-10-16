<template>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <header class="pt-10">
    <div id="header" class="content-center ml-[5%] mr-[5%] bg-blue-400 w-[90%] h-[10%] grid grid-cols-5 border-2 rounded-lg border-black p-2">
      <div class="flex items-center pl-[15%]">
        <router-link to="/" class="inline-flex items-center">
            <button class="flex items-center">
                <img src="/favicon.ico" alt="favicon" class="w-6 h-6 mr-2" />
            </button>
        </router-link>
      </div>

      <div class="content-center relative group">
        <span class="cursor-pointer max-w-[8rem] overflow-hidden text-ellipsis whitespace-nowrap pr-[5%]">
          Woningen
        </span>
        <div class="  absolute left-0 hidden group-hover:block bg-white rounded-xl mt-1">
          <button class="bg-blue-400 border-black border-2 rounded-xl">
            <a class="p-2 max-w-44 block overflow-hidden text-ellipsis whitespace-nowrap pr-4" href="/">HOME</a>
          </button>
        </div>
      </div>



      <div class="content-center border-black">
        <input type="text" placeholder="Search.." class="w-full border p-1" />
      </div>

      <div class="content-center justify-self-end pr-[15%]">
        <div class="content-center relative group">
          <span class="p-12"> <i class="fa-solid fa-gear"></i> </span>
          <div class="ml-8 absolute left-0 hidden group-hover:block bg-white rounded-sm mt-1">
            <button class="bg-blue-400 border-black border-2">
              <a class="p-2 block overflow-hidden text-ellipsis whitespace-nowrap" href="/">Hallo</a>
            </button>
          </div>  
        </div>
      </div>

          <router-link to="/" justify-self-end class="inline-flex items-center">
            <button href="../views/HomeView.vue">Inloggen</button>
          </router-link>
      </div>

  </header>
</template>