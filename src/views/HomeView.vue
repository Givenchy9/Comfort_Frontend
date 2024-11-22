<template>

  <!-- Search Section for Rental Properties -->
  <div class="search-section">
    <div class="search-form">
      <input type="text" placeholder="Locatie" v-model="location" class="search-input" />
      <input type="number" placeholder="Huurprijs" v-model="price" class="search-input" />
      <input type="text" placeholder="Ik zoek een ..." v-model="propertyType" class="search-input" />
      <button @click="search" class="search-button">Zoek</button>
    </div>
  </div>

  <!-- News Section -->
  <div class="news-section">
    <h2>Nieuws</h2>

    <!-- Loop through news items to display each -->
    <div class="news-items">
      <div class="news-item" v-for="item in newsItems" :key="item.id">
        <!-- Title Editable in Editor Mode -->
        <div class="editable-title">
          <h3 v-if="!isEditing">{{ item.title }}</h3>
          <input v-if="isEditing" v-model="item.title" class="editor-input" />
        </div>

        <!-- News Content -->
        <img :src="item.image" alt="News Image" />
        <p v-if="!isEditing">{{ item.text }}</p>
        <textarea v-if="isEditing" v-model="item.text" class="editor-textarea"></textarea>
      </div>
    </div>
  </div>

  <!-- Editor Mode Button -->
  <button @click="toggleEditorMode" :class="['editor-button', { 'editor-active': isEditing }]">
    {{ isEditing ? 'Exit Editor Mode (ONLY FOR ADMIN)' : 'Enter Editor Mode (ONLY FOR ADMIN)' }}
  </button>
  <!-- Logout Button -->
  <!-- <button @click="handleLogout" class="logout-button">
    Logout
  </button> -->
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { AuthService } from '../services/authService';
import Darkmode from '@/components/Darkmode.vue';
import Header from '@/components/Header.vue';


// LocalStorage key for news items
const LOCAL_STORAGE_KEY = 'newsItems';

// Reactive state for the form inputs and news items
const location = ref('');
const price = ref('');
const propertyType = ref('');
const isEditing = ref(false); // State to track editor mode

const newsItems = ref([
  {
    id: 1,
    image: 'https://varexhuis.nl/wp-content/uploads/2022/02/Woning-met-risaliet-2.jpg',
    title: 'This is the first news title.',
    text: 'This is some news content for the first item.',
  },
  {
    id: 2,
    image: 'https://www.architectuurwonen.nl/wp-content/uploads/bb-plugin/cache/AW_Moderne-Vlinder-Voorgevel-web-panorama-aa2a77407e6982b4da6d3515c26821aa-5f5235edcba58.jpg',
    title: 'This is the second news title.',
    text: 'This is some news content for the second item.',
  },
  {
    id: 3,
    image: 'https://www.makelaarsland.nl/content/uploads/foto-checklist1.jpg',
    title: 'This is the third news title.',
    text: 'This is some news content for the third item.',
  },
]);

// Function to save news items to localStorage
const saveNewsItems = () => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newsItems.value));
};

// Function to load news items from localStorage
const loadNewsItems = () => {
  const savedNews = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (savedNews) {
    newsItems.value = JSON.parse(savedNews);
  }
};

// Load news items from localStorage when the component is mounted
onMounted(() => {
  loadNewsItems();
});

// Function to toggle editor mode and save changes to localStorage
const toggleEditorMode = () => {
  if (isEditing.value) {
    // Save news items when exiting editor mode
    saveNewsItems();
  }
  isEditing.value = !isEditing.value;
};

// Router instance
const router = useRouter();

// Search function
const search = () => {
  console.log(`Searching for properties in ${location.value}, price: ${price.value}, type: ${propertyType.value}`);
};

// Logout function
const handleLogout = async () => {
  // Show confirmation dialog
  const confirmLogout = confirm("Are you sure you want to logout?");

  if (confirmLogout) {
    try {
      // Remove token from localStorage
      localStorage.removeItem('token'); // Make sure 'token' is the key you used for storing the token
      // Call the logout function
      await AuthService.logout();
      // Redirect to the login page or clear user state
      router.push('/Login'); // Adjust the route as necessary
    } catch (error) {
      console.error('Error during logout:', error);
    }
  } else {
    // If user cancels, stay on the current page
    console.log('User cancelled logout');
  }
};


</script>

<style scoped>
/* General Layout */
.home-view {
  padding: 20px;
}

/* Editor Button */
.editor-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007BFF;
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

/* Logout Button */
.logout-button {
  position: fixed;
  bottom: 20px;
  left: 20px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  z-index: 1000;
  transition: background-color 0.3s;
}

/* Responsive Styling */
@media (max-width: 768px) {

  .editor-button,
  .logout-button {
    padding: 8px 15px;
    font-size: 14px;
    bottom: 15px;
    /* Move buttons a little higher for smaller screens */
  }

  .editor-button {
    right: 15px;
  }

  .logout-button {
    left: 15px;
  }
}

@media (max-width: 480px) {

  .editor-button,
  .logout-button {
    padding: 6px 12px;
    font-size: 12px;
    bottom: 10px;
    /* Move buttons even higher on small phones */
  }

  .editor-button {
    right: 10px;
  }

  .logout-button {
    left: 10px;
  }
}


/* Search Section */
.search-section {
  margin: 20px 0;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.search-section h2 {
  text-align: center;
  margin-bottom: 20px;
}

.search-form {
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
}

.search-input {
  padding: 10px;
  font-size: 16px;
  border: 2px solid #007BFF;
  border-radius: 5px;
  width: 250px;
  transition: border-color 0.3s;
}

.search-input:focus {
  border-color: #0056b3;
  outline: none;
}

.search-button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.search-button:hover {
  background-color: #0056b3;
}

/* News Section */
.news-section {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.news-items {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 50px;
}

.news-item {
  width: 400px;
  padding: 20px;
  text-align: center;
  border: 2px solid #007BFF;
  border-radius: 10px;
}

.news-item img {
  width: 100%;
  object-fit: cover;
  border-radius: 8px;
}

.editor-textarea {
  width: 100%;
  resize: none;
}
</style>