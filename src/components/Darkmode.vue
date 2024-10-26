<script setup>
import { useDark, useToggle } from '@vueuse/core'

// Initialize dark mode state and toggle function
const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
    <!-- Dark mode toggle button -->
    <button @click="toggleDark()"
        class="px-4 py-1 text-white bg-blue-600 rounded dark:bg-blue-400 dark:hover:bg-blue-600 hover:bg-blue-400 flex items-center">
        <i :class="isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon'" class="mr-2"></i> <!-- FontAwesome Icon -->
        {{ isDark ? 'Darkmode On' : 'Darkmode Off' }}
    </button>
</template>