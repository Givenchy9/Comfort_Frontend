<template>
  <!--
    This example requires updating your template:

    ```
    <html class="h-full bg-white">
    <body class="h-full">
    ```
  -->
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" action="#" method="POST" @submit.prevent="save" id="check-register-form">
        <div>
          <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Name</label>
          <div class="mt-2">
            <input id="name" v-model="employee.name" name="name" type="text" required="" maxlength="20" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
          <div class="mt-2">
            <input id="email" v-model="employee.address" name="email" type="email" autocomplete="email" required="" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
            <div class="text-sm">
              <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
            </div>
          </div>
          <div class="mt-2">
            <input id="password" v-model="employee.password" name="password" type="password" autocomplete="current-password" required="" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div>
          <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
        </div>
      </form>
      <p>Make account</p>
    </div>
  </div>
</template>

<script lang="ts">
import Employee from '@/components/Employee.vue'

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
<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
