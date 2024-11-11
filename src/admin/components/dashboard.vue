<script>
export default {
    data() {
        return {
            id: 123, // Example: This could be a dynamic ID from props or data
            dashboard: {
                first_name: "sometimes|required|string|max:255",
                last_name: "sometimes|required|string|max:255",
                gender: "sometimes|required|string|in:male,female,other",
                birthdate: "sometimes|required|date|before:-18 years",
                address: "sometimes|required|string|max:255",
                phone: "sometimes|required|string|max:15",
                annual_income: "sometimes|required|numeric|min:0",
                preferred_location: "sometimes|required|string|max:255",
                radius: "sometimes|required|integer|min:0",
                email: `sometimes|required|string|email|max:255|unique:users,email,${this.id}`,
                password: "sometimes|required|string|min:8"
            }
        }
    }
}
</script>

<template>
  <!-- Template goes here -->
</template>
