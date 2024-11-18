<template>
    <footer class="bg-blue-200 rounded-lg shadow dark:bg-gray-800 bottom-0 w-full">
      <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023 <a href="https://flowbite.com/" class="hover:underline">Flowbite™</a>. All Rights Reserved.
        </span>
        <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <a href="#" class="hover:underline me-4 md:me-6"></a>
          </li>
          <li>
            <a href="#" class="hover:underline me-4 md:me-6"></a>
          </li>
          <li>
            <a href="#" class="hover:underline me-4 md:me-6">Licensing</a>
          </li>
          <li>
            <!-- Editor Mode Button -->
            <!-- <button
              @click="toggleEditorMode"
              :class="['editor-button', { 'editor-active': isEditing }]"
            >
              {{ isEditing ? 'Exit Editor Mode (ONLY FOR ADMIN)' : 'Enter Editor Mode (ONLY FOR ADMIN)' }}
            </button> -->
          </li>
        </ul>
      </div>
    </footer>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  // Define reactive state for editor mode
  const isEditing = ref(false);
  
  // Function to toggle editor mode
  const toggleEditorMode = () => {
    isEditing.value = !isEditing.value;
    if (!isEditing.value) {
      saveNewsItems();
    }
  };
  
  // Placeholder for the save function (replace with actual implementation)
  const saveNewsItems = () => {
    console.log('Saving news items...');
  };
  </script>
  
  <style scoped>
  /* Ensure footer is fixed at the bottom */
  footer {
    left: 0;
    right: 0;
    z-index: 10;
  }
  
  /* Editor Button */
  .editor-button {
    bottom: 60px;
    right: 20px;
    padding: 10px 20px;
    font-size: 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    z-index: 1000;
    transition: background-color 0.3s;
  }
  
  .editor-active {
    background-color: red;
  }
  
  .editor-button:hover {
    background-color: #0056b3;
  }
  
  .editor-active:hover {
    background-color: darkred;
  }
  </style>
  