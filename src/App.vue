<script setup lang="ts">
import { computed } from 'vue'; // For computed properties
import { useRoute } from 'vue-router'; // Import useRoute from vue-router
import Header from '@/components/Header.vue'; // Import the Header component
import Footer from '@/components/Footer.vue'; // Import the Footer component

// Access the current route
const route = useRoute();

// Check if the current route is either login or new-page
const isLoginPage = computed(() => route.path === '/login');
const isNewPage = computed(() => route.path === '/register');
const isAdminPage = computed(() => route.path === '/admin');
const isCompletePage = computed(() => route.path === '/complete');
const isToevoegenPage = computed(() => route.path === '/huizen_toevoegen');
const isHuizenPage = computed(() => route.path === '/huizen');
const isSettingsPage = computed(() => route.path === '/settings2');
const isUpdatePage = computed(() => route.path === '/update_account2');
const isProfilePage = computed(() => route.path === '/profile2');
const isBecomePage = computed(() => route.path === '/become_complete2');

// Log the current route for debugging (optional)
console.log("Current route:", route.path);
console.log("Is Login Page:", isLoginPage.value);
console.log("Is New Page:", isNewPage.value);
console.log("Is Admin Page:", isAdminPage.value);
console.log("Is Complete Page:", isCompletePage.value);
console.log("Is Toevoegen Page:", isToevoegenPage.value);
console.log("Is Toevoegen Page:", isHuizenPage.value);
</script>

<template>
  <div>
    <!-- Only show the Header if not on the login page or the new page -->
    <Header v-if="!isLoginPage && !isNewPage && !isAdminPage && !isCompletePage && !isToevoegenPage && !isSettingsPage && !isUpdatePage && !isProfilePage && !isBecomePage" />
    <RouterView />
    <Footer />
  </div>
</template>



<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
