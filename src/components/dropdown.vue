<template>
    <Menu as="div" class="relative inline-block text-left">
        <div>
            <!-- Dynamically adjust the button size based on the text content -->
            <MenuButton
                class="menu-button inline-flex w-full justify-between gap-x-2 rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-inset ring-gray-300 hover:bg-blue-600">
                {{ buttonText }}
                <ChevronDownIcon class="-mr-1 h-5 w-5 text-black" aria-hidden="true" />
            </MenuButton>
        </div>

        <transition 
            enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95" 
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75" 
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95">
            
            <MenuItems class="menu-dropdown absolute left-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-blue-500 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div class="py-1">
                    <MenuItem v-slot="{ active }">
                        <RouterLink to="/huizen"
                            :class="[route.path === '/huizen' ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">
                            Huizenmarkt
                        </RouterLink>
                    </MenuItem>
                    <MenuItem v-slot="{ active }">
                        <RouterLink to="/huis-toevoegen"
                            :class="[route.path === '/huis-toevoegen' ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">
                            Huis Toevoegen?
                        </RouterLink>
                    </MenuItem>
                    <!-- <MenuItem v-slot="{ active }">
                        <RouterLink to="/info"
                            :class="[route.path === '/info' ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">
                            Info
                        </RouterLink>
                    </MenuItem> -->
                </div>
            </MenuItems>
        </transition>
    </Menu>
</template>

<script setup>
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
import { ChevronDownIcon } from '@heroicons/vue/20/solid';
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

// Define reactive state for the button text
const buttonText = ref('Hoofdpagina');

// Watch for route changes to update the button text
watch(
    () => route.path,
    (newPath) => {
        if (newPath === '/huizen') {
            buttonText.value = 'Huizenmarkt';
        } else if (newPath === '/huis-toevoegen') {
            buttonText.value = 'Huis Toevoegen?';
        } else if (newPath === '/info') {
            buttonText.value = 'Info';
        } else {
            buttonText.value = 'Hoofdpagina';
        }
    },
    { immediate: true }
);
</script>

<style scoped>
/* Allow the button to resize based on content, remove fixed height */
.menu-button {
    display: flex;
    align-items: center;  /* Center text vertically */
    padding-right: 2rem;  /* Ensure space for the icon */
    justify-content: space-between;
    white-space: nowrap;  /* Prevent text from wrapping */
    overflow: hidden;  /* Hide overflow text */
    text-overflow: ellipsis; /* Add ellipsis if the text is too long */
    min-width: 150px; /* Ensure the button has a minimum width */
    width: auto; /* Allow the button to grow to fit the content */
}

/* Prevent the dropdown from shifting and position it consistently */
.menu-dropdown {
    position: absolute;
    left: 0;
    top: 100%; /* Ensure it's below the button */
    z-index: 10;
    width: 100%;
    margin-top: 0.5rem; /* Adjust based on your design */
    transition: all 0.1s ease-out; /* Smooth transition */
}
</style>
