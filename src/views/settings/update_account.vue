<template>
    <div class="settings-container">
    <h2>Settings</h2>
    
    <!-- Username Section -->
    <div class="form-group">
    <label for="username">Username</label>
    <input
    type="text"
    id="username"
    v-model="username"
    placeholder="Enter your new username"
    />
    </div>
    
    <!-- Email Section -->
    <div class="form-group">
    <label for="email">Email</label>
    <input
    type="email"
    id="email"
    v-model="email"
    placeholder="Enter your new email"
    />
    </div>
    
    <!-- Password Section -->
    <div class="form-group">
    <label for="password">Password</label>
    <input
    type="password"
    id="password"
    v-model="password"
    placeholder="Enter your new password"
    />
    </div>
    
    <!-- Save Button -->
    <button @click="saveSettings" class="save-btn">Save Changes</button>
    
    <!-- Success/Error Message -->
    <div v-if="message" :class="messageClass" class="message">
    {{ message }}
    </div>
    </div>
    </template>
    
    <script>
    export default {
    data() {
    return {
    username: '', // Default username
    email: '', // Default email
    password: '', // Default password
    message: '', // Message to show success or error
    messageClass: '', // Class to style the message
    };
    },
    methods: {
    // Method to handle saving the settings
    saveSettings() {
    // Simple validation
    if (!this.username || !this.email || !this.password) {
    this.setMessage('All fields are required!', 'error');
    return;
    }
    
    // Here you would send the data to the server for updating (via an API call, for example)
    // This is just an example, replace with real logic.
    
    this.setMessage('Your settings have been successfully updated!', 'success');
    },
    
    // Helper function to set the message and its style
    setMessage(message, type) {
    this.message = message;
    this.messageClass = type === 'success' ? 'success-message' : 'error-message';
    },
    },
    };
    </script>
    
    <style scoped>
    /* Add some styles to make the form look nice */
    
    .settings-container {
    width: 400px;
    margin: 0 auto;
    margin-top: 100px;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    }
    
    h2 {
    text-align: center;
    margin-bottom: 20px;
    }
    
    .form-group {
    margin-bottom: 15px;
    }
    
    label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
    }
    
    input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    }
    
    button.save-btn {
    width: 100%;
    padding: 12px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    }
    
    button.save-btn:hover {
    background-color: #45a049;
    }
    
    .message {
    margin-top: 15px;
    text-align: center;
    padding: 10px;
    border-radius: 5px;
    }
    
    .success-message {
    background-color: #d4edda;
    color: #155724;
    }
    
    .error-message {
    background-color: #f8d7da;
    color: #721c24;
    }
    </style>