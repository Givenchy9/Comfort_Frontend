<template>
<div>
    <label for="date" class="block text-sm font-medium leading-6 text-gray-900">Birth Date</label>
    <div class="mt-2">
        <input id="date" name="date" type="date" required="" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
    </div>
</div>
</template>

<script>
  // Get the date input element by its ID
  const dateInput = document.getElementById('date');

  // Calculate the maximum date for 16 years old
  const today = new Date();
  const maxDate = new Date(today.getFullYear() - 16, today.getMonth(), today.getDate());
  dateInput.max = maxDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
</script>
