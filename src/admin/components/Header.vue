<template>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
      <header class="pt-10">
        <div id="header" class="content-center ml-[5%] mr-[5%] bg-red-400 w-[90%] h-[10%] grid grid-cols-3 border-2 rounded-lg border-black p-2">
          <div class="flex items-center pl-[15%]">
            <router-link to="/" class="inline-flex items-center">
                <button class="flex items-center">
                    <span class="text-white"> Admin </span>
                </button>
            </router-link>
          </div>
    
          <div class="content-center relative group">
            <span class="cursor-pointer max-w-[8rem] overflow-hidden text-ellipsis whitespace-nowrap pr-[5%]">
              Woningen
            </span>
            <div class="  absolute left-0 hidden group-hover:block bg-white rounded-xl">
              <button class="bg-red-400 border-black border-2 rounded-xl">
                <a class="p-2 max-w-44 block overflow-hidden text-ellipsis whitespace-nowrap pr-4" href="index.html">HOME</a>
              </button>
            </div>
        </div>
    
              <router-link to="/" justify-self-end class="inline-flex items-center">
                <button href="../views/HomeView.vue">Uitloggen</button>
              </router-link>
          </div>
    
      </header>
    </template>