<template>
  <div class="page-container w-full">
    <div class="content">
    </div>

    <footer class="bg-blue-200 rounded-lg shadow dark:bg-gray-800">
      <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2024 <a href="https://flowbite.com/" class="hover:underline">Teun, Leon, Wesley & Givenchy™</a>/ All Rights Reserved.
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
          </li>
        </ul>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isEditing = ref(false);

const toggleEditorMode = () => {
  isEditing.value = !isEditing.value;
  if (!isEditing.value) {
    saveNewsItems();
  }
};

const saveNewsItems = () => {
  console.log('Saving news items...');
};
</script>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  bottom: 0;
  position: fixed;
   left: 0;
}

.content {
  flex-grow: 1;
}

footer {
  left: 0;
  right: 0;
  z-index: 10;
}

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
