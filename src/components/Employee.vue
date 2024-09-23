<template>
    <div class="container mx-auto p-5 bg-red-500">
        <h3 class="text-center text-white text-xl font-bold mb-5">Employee Management</h3>

        <div class="bg-gray-100 p-6 rounded-md shadow-md">
            <form @submit.prevent="save" id="check-register-form">
                <!-- Form Fields -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label for="employeeName" class="block mb-1">Employee Name</label>
                        <input v-model="employee.name" type="text" id="employeeName" required
                            class="w-full p-2 border border-gray-300 rounded-md" placeholder="Enter Employee Name" />
                    </div>
                    <div>
                        <label for="employeeAddress" class="block mb-1">Employee Address</label>
                        <input v-model="employee.address" type="text" id="employeeAddress" required
                            class="w-full p-2 border border-gray-300 rounded-md" placeholder="Enter Employee Address" />
                    </div>
                </div>

                <div class="mt-4">
                    <label for="employeePhone" class="block mb-1">Phone</label>
                    <input v-model="employee.phone" type="text" id="employeePhone" required
                        class="w-full p-2 border border-gray-300 rounded-md" placeholder="Enter Phone Number" />
                </div>

                <!-- Save Button -->
                <div class="mt-6 text-center">
                    <button type="submit"
                        class="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">Save</button>
                </div>
            </form>
        </div>

        <!-- Employee Table -->
        <div class="mt-8 bg-gray-100 p-6 rounded-md shadow-md">
            <table class="min-w-full table-auto border-collapse">
                <thead>
                    <tr class="bg-gray-200 text-left">
                        <th class="px-4 py-2 border">Employee ID</th>
                        <th class="px-4 py-2 border">Employee Name</th>
                        <th class="px-4 py-2 border">Address</th>
                        <th class="px-4 py-2 border">Phone</th>
                        <th class="px-4 py-2 border">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="employee in result" :key="employee.id" class="bg-white hover:bg-gray-100">
                        <td class="px-4 py-2 border">{{ employee.id }}</td>
                        <td class="px-4 py-2 border">{{ employee.name }}</td>
                        <td class="px-4 py-2 border">{{ employee.address }}</td>
                        <td class="px-4 py-2 border">{{ employee.phone }}</td>
                        <td class="px-4 py-2 border">
                            <button @click="edit(employee)"
                                class="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">Edit</button>
                            <button @click="remove(employee)"
                                class="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 ml-2">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "Employee",
    data() {
        return {
            result: [],
            employee: {
                id: "",
                name: "",
                address: "",
                phone: "",
            },
        };
    },
    created() {
        this.EmployeeLoad();
    },
    methods: {
        EmployeeLoad() {
            console.log("Fetching employees...");
            axios
                .get("http://127.0.0.1:8000/api/employee")
                .then(({ data }) => {
                    console.log("Employees loaded:", data);
                    this.result = data;
                })
                .catch((error) => {
                    console.error("Error loading employees:", error);
                });
        },
        save() {
            console.log("Save button clicked", this.employee);
            if (!this.employee.id) {
                this.saveData();
            } else {
                this.updateData();
            }
        },
        saveData() {
            console.log("Saving new employee...", this.employee);
            axios
                .post("http://127.0.0.1:8000/api/employee", this.employee)
                .then(({ data }) => {
                    console.log("Employee saved:", data);
                    this.EmployeeLoad();
                    this.resetForm();
                })
                .catch((error) => {
                    console.error("Error saving employee:", error);
                });
        },
        edit(employee) {
            console.log("Editing employee:", employee);
            this.employee = { ...employee }; // Copy the employee object to avoid direct binding
        },
        updateData() {
            console.log("Updating employee:", this.employee);
            axios
                .put(`http://127.0.0.1:8000/api/employee/${this.employee.id}`, this.employee)
                .then(({ data }) => {
                    console.log("Employee updated:", data);
                    this.EmployeeLoad();
                    this.resetForm();
                    alert("Updated!");
                })
                .catch((error) => {
                    console.error("Error updating employee:", error);
                });
        },
        remove(employee) {
            console.log("Deleting employee:", employee);
            axios
                .delete(`http://127.0.0.1:8000/api/employee/${employee.id}`)
                .then(() => {
                    console.log("Employee deleted");
                    this.EmployeeLoad();
                    alert("Deleted");
                })
                .catch((error) => {
                    console.error("Error deleting employee:", error);
                });
        },
        resetForm() {
            this.employee = {
                id: "",
                name: "",
                address: "",
                phone: "",
            };
        },
    },
};
</script>

<style scoped>
/* Optionally you can add more specific styles here */
</style>