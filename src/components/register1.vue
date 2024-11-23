<template>
    <form @submit.prevent="submitForm" class="grid grid-cols-2 m-8 m-auto gap-4">
      <p class="col-span-2 text-center font-bold text-2xl mb-8">Register</p>
  
      <!-- Input fields for registration -->
      <div>
        <label for="first_name" class="font-bold">Naam</label>
        <input type="text" id="first_name" v-model="form.first_name" maxlength="20" placeholder="20 characters max"
          class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
          required />
      </div>
  
      <div>
        <label for="last_name" class="font-bold">Achternaam</label>
        <input type="text" id="last_name" v-model="form.last_name" maxlength="20" placeholder="20 characters max"
          class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
          required />
      </div>
  
      <div class="col-span-2">
        <label for="email" class="font-bold">Email:</label>
        <input type="email" id="email" v-model="form.email"
          class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
          required />
      </div>
  
      <div class="col-span-2">
        <label for="password" class="font-bold">Wachtwoord:</label>
        <input type="password" id="password" v-model="form.password"
          class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
          required />
      </div>
  
      <!-- Link to open Terms of Service modal -->
      <div class="col-span-2 flex items-center">
        <label class="ml-2">
          I agree to the
          <a href="#" class="text-blue-500 hover:underline" @click.prevent="openTOS">Terms of Service</a>
          <!-- Tooltip wrapper for the icon -->
          <div class="tooltip-container relative inline-block ml-1">
            <i class="fa-solid fa-circle-info"></i>
            <!-- Tooltip text that appears on hover -->
            <span
              class="tooltip-text absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-700 text-white text-xs rounded opacity-0 transition-opacity duration-300">
              Je kan <span class="font-bold text-red-500">geen</span> account maken zonder dat je de <span
                class="text-blue-500">Terms
                of service</span> hebt
              geaccepteerd!
            </span>
          </div>
        </label>
      </div>
  
  
      <!-- Register button, disabled until TOS is read and accepted -->
      <button type="submit" :disabled="!hasAcceptedTOS"
        class="col-span-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400 disabled:cursor-not-allowed">
        Register
      </button>
  
      <!-- Success and error messages -->
      <div v-if="successMessage" class="success text-center m-auto bg-green-200 rounded col-span-2 px-2">
        <i class="fa-solid fa-check-circle"></i> {{ successMessage }}
      </div>
      <div v-if="error" class="error text-center m-auto bg-red-200 rounded col-span-2 px-2">
        <i class="fa-solid fa-triangle-exclamation"></i> {{ error }}
      </div>
  
      <!-- Terms of Service Modal -->
      <div v-if="showTOS" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div class="bg-white w-3/4 p-8 rounded-lg shadow-lg max-w-lg overflow-y-auto max-h-[75vh] dark:bg-gray-900">
          <h2 class="text-2xl font-bold mb-4">Terms of Service</h2>
          <div class="overflow-y-auto h-[50vh] px-4 py-2">
            <p class="mb-4">
              The website and the solutions are operated and managed by separate entities. Refsnes Data offers the website
              (w3schools.com) including all its content, information, and related tools. The solutions (Such as Spaces,
              Courses, and My learning) and billing system are operated by W3schools Network. The two entities are
              separately responsible for the services that they provide, manage and operate.
  
              Throughout the site, the terms "we", "us" and "our" refer to Refsnes Data and W3schools Network.
  
              By visiting our site and/or purchasing something from us, you engage in our "Service" and agree to be bound
              by the following terms and conditions ("Terms of Service", "Terms"), including those additional terms and
              conditions and policies referenced herein and/or available by hyperlink. These Terms of Service apply to all
              users of the site, including without limitation users who are browsers, vendors, customers, merchants,
              and/or contributors of content.
  
              Please read these Terms of Service carefully before accessing or using our website or services. By accessing
              or using any part of the site, you agree to be bound by these Terms of Service. If you do not agree to all
              the terms and conditions of this agreement, then you may not access the website or use any services.
  
              Any new features or tools which are added to the current site shall also be subject to the Terms of Service.
              You can review the most current version of the Terms of Service at any time on this page. We reserve the
              right to update, change or replace any part of these Terms of Service by posting updates and/or changes to
              our website. It is your responsibility to check this page periodically for changes. Your continued use of or
              access to the website following the posting of any changes constitutes acceptance of those changes.
  
              Site Usage Terms
              By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state
              or province of residence, or that you are the age of majority in your state or province of residence and you
              have given us your consent to allow any of your minor dependents to use this site.
  
              Access to services may require you to register an account. This could require you to provide information
              about yourself such as name, email address and credit card details. The account information and the use of
              data is subject to our Privacy Policy (https://www.w3schools.com/about/about_privacy.asp)
  
              You may not use our products for any illegal or unauthorized purpose nor may you, in the use of the Service,
              violate any laws in your jurisdiction (including but not limited to copyright laws). You are responsible for
              complying with any law, rules, and regulations applicable to you.
  
              You must not transmit any worms or viruses or any code of a destructive nature.
  
              A breach or violation of any of our Terms can result in an immediate termination of your Services. We
              reserve the right to remove or restrict your account and to remove content such as websites and other
              user-created data at any time at our sole and absolute discretion.
  
              General Conditions
              We reserve the right to refuse service to anyone for any reason at any time.
  
              You understand that your content may be transferred unencrypted and involve (a) transmissions over various
              networks, and (b) changes to conform and adapt to technical requirements of connecting networks or devices.
  
              Credit card information is always encrypted during transfer over networks, and are processed and handled by
              our selected Payment Service Providers. We only preserve the last four-digit and expiry date of your Credit
              card. This is, among other things, to let you know in advance if your Credit card is soon to expire, so that
              we can assure the continuous running of your Services with us.
  
              You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the Service, use of the
              Service, or access to the Service or any contact on the website through which the service is provided,
              without express written permission by us.
  
              The headings used in this agreement are included for convenience only and will not limit or otherwise affect
              these Terms.
  
              Fair Use
              Fair use defines our exceptions to the rights protected by copyright laws.
  
              Fair use of W3Schools includes using copyrighted material:
  
              In research
              In news reporting
              In citations
              In commentary
              Fair use of W3Schools also includes:
  
              Linking to W3Schools
              Adding W3Schools to search engines
              Library archiving W3Schools
              Using W3Schools in Teaching
              Fair use includes using copyrighted material in teaching under this balancing:
  
              Favorable Use:
              Copying examples and code snippets for non-profit teaching and research.
              Copying small quantities, appropriate for classroom teaching.
              Not Favorable Use:
              Copying for profitable or commercial use.
              Massive or verbatim copying.
              Copying large quantities.
              Accuracy, Completeness and Timeliness of Information
              We are not responsible if information made available on our sites is incomplete or invalid.
  
              The material on this site is provided for general information only and should not be relied upon or used as
              the sole basis for making decisions without consulting primary, more accurate, more complete or more timely
              sources of information. Any reliance on the material on this site is at your own risk.
  
              This site may contain certain historical information. Historical information, necessarily, is not current
              and is provided for your reference only. We reserve the right to modify the contents of this site at any
              time, but we have no obligation to update any information on our site. You agree that it is your
              responsibility to monitor changes to our site.
  
              If you discover that the site or its contents contains errors, please contact us so these can be corrected.
  
              Contact address:
              help@w3schools.com
            </p>
            <!-- Checkbox to accept TOS inside modal -->
            <div class="mt-4 flex items-center">
              <input type="checkbox" id="tosAccept" v-model="form.acceptedTOS" @change="onAcceptTOS" />
              <label for="tosAccept" class="ml-2">
                I have read and accept the Terms of Service
              </label>
            </div>
          </div>
  
          <!-- Close button (always enabled) -->
          <button @click="closeTOS" class="bg-red-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-2">
            <i class="fa-solid fa-delete-left"></i>
          </button>
        </div>
      </div>
    </form>
  </template>
  
  <script setup>
  import axios from 'axios';
  import { ref } from 'vue';
  
  // Reactive form object
  const form = ref({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    acceptedTOS: false,
  });
  
  // Reactive variables for error, success messages, and TOS status
  const error = ref('');
  const successMessage = ref('');
  const showTOS = ref(false); // Controls visibility of Terms of Service modal
  const hasAcceptedTOS = ref(false); // Tracks if the user has accepted the TOS
  
  // Open Terms of Service modal
  const openTOS = () => {
    showTOS.value = true;
  };
  
  // Accept TOS and close modal
  const closeTOS = () => {
    showTOS.value = false;
  };
  
  // Update acceptance status when checkbox is checked
  const onAcceptTOS = () => {
    hasAcceptedTOS.value = form.value.acceptedTOS;
  };
  
  // Form validation and submission
  const submitForm = async () => {
    if (!form.value.first_name || !form.value.last_name || !form.value.email || !form.value.password || !form.value.acceptedTOS) {
      error.value = 'Please correct the errors before submitting the form.';
      return; // Stop form submission
    }
  
    try {
      // Proceed with form submission
      const response = await axios.post('http://127.0.0.1:8000/api/basicregister', form.value, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
  
      // Handle successful registration
      console.log(response.data);
      successMessage.value = 'Registration successful! Please log in.';
      error.value = ''; // Clear any previous error
  
      // Reset form
      form.value = {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        acceptedTOS: false // Reset the TOS checkbox
      };
      hasAcceptedTOS.value = false; // Reset acceptance status for future registrations
    } catch (err) {
      if (err.response && err.response.data) {
        error.value = err.response.data.message || 'Registration failed';
      } else {
        error.value = 'An error occurred';
      }
      successMessage.value = ''; // Clear success message
    }
  };
  </script>
  
  <style>
  /* Tooltip styles */
  .tooltip-container:hover .tooltip-text {
    opacity: 1;
    visibility: visible;
  }
  
  .tooltip-container .tooltip-text {
    visibility: hidden;
    opacity: 0;
    position: absolute;
    white-space: nowrap;
    transform: translateX(-50%);
    background-color: #333;
    color: #fff;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.75rem;
    bottom: 80%;
    /* Position above the icon */
    transition: opacity 0.3s ease;
    z-index: 10;
  }
  </style>
  