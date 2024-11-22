<!-- <template>
    <div class="p-8">
    <h1 class="text-3xl font-bold text-blue-600 mb-6">
    {{ isAdmin ? 'Beheer Inkomende Verzoeken' : 'Voeg Een Huis Toe' }}
    </h1>
    
    <div v-if="isAdmin">
    <div v-if="requests.length === 0" class="text-gray-500">Geen inkomende verzoeken gevonden.</div>
    <div v-for="(request, index) in requests" :key="request.id" class="mb-6 border-b border-gray-200 pb-4">
    <div class="flex items-center justify-between">
    <div class="flex items-center gap-4">
    <img :src="request.photo" alt="Foto" class="w-16 h-16 object-cover rounded-md" />
    <div>
    <h2 class="text-xl font-semibold">{{ request.title }}</h2>
    <p class="text-gray-600">Ingediend door: {{ request.name }}</p>
    </div>
    </div>
    <button @click="toggleDetails(index)" class="text-blue-500 hover:text-blue-700">
    {{ request.showDetails ? 'Verberg details' : 'Bekijk details' }}
    </button>
    </div>
    
    
    <transition name="fade">
    <div v-if="request.showDetails" class="mt-4 bg-gray-100 p-4 rounded-md">
    <p><strong>Beschrijving:</strong> {{ request.description }}</p>
    <p><strong>Adres:</strong> {{ request.address }}</p>
    <p><strong>Prijs:</strong> €{{ request.price }}</p>
    <div class="mt-4 flex gap-4">
    <button @click="acceptRequest(request.id)" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
    Accepteren
    </button>
    <button @click="rejectRequest(request.id)" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
    Weigeren
    </button>
    </div>
    </div>
    </transition>
    </div>
    </div>
    
    
    <div v-else>
    <form @submit.prevent="submitHouse" class="space-y-4">
    <div>
    <label for="title" class="block text-sm font-medium text-gray-700">Titel</label>
    <input v-model="house.title" type="text" id="title" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" placeholder="Voer een titel in" />
    </div>
    
    <div>
    <label for="address" class="block text-sm font-medium text-gray-700">Adres</label>
    <input v-model="house.address" type="text" id="address" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" placeholder="Voer het adres in" />
    </div>
    
    <div>
    <label for="price" class="block text-sm font-medium text-gray-700">Prijs</label>
    <input v-model="house.price" type="number" id="price" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" placeholder="Voer de prijs in" />
    </div>
    
    <div>
    <label for="description" class="block text-sm font-medium text-gray-700">Beschrijving</label>
    <textarea v-model="house.description" id="description" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" placeholder="Voeg een beschrijving toe"></textarea>
    </div>
    
    <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
    Huis Toevoegen
    </button>
    </form>
    </div>
    </div>
    </template>
    
    <script setup>
    import { ref } from 'vue';
    
    // Simulatie van gebruikerstoestand en rol
    const isAdmin = ref(false); // Verander naar 'true' om admin interface te testen
    
    // Data voor inkomende verzoeken (voor admins)
    const requests = ref([
    {
    id: 1,
    name: 'Jan Jansen',
    photo: 'https://via.placeholder.com/100',
    title: 'Ruime Woning in Amsterdam',
    description: 'Een prachtige woning met 3 slaapkamers en een tuin.',
    address: 'Herengracht 123, Amsterdam',
    price: 450000,
    showDetails: false
    },
    {
    id: 2,
    name: 'Piet Pieters',
    photo: 'https://via.placeholder.com/100',
    title: 'Gezellig Appartement',
    description: 'Appartement met 2 slaapkamers in het centrum.',
    address: 'Kerkstraat 45, Utrecht',
    price: 300000,
    showDetails: false
    }
    ]);
    
    // Voor user formulier
    const house = ref({
    title: '',
    address: '',
    price: null,
    description: ''
    });
    
    // Functies voor de admin acties
    const toggleDetails = (index) => {
    requests.value[index].showDetails = !requests.value[index].showDetails;
    };
    
    const acceptRequest = (id) => {
    alert(`Verzoek met ID ${id} geaccepteerd.`);
    requests.value = requests.value.filter(request => request.id !== id);
    };
    
    const rejectRequest = (id) => {
    alert(`Verzoek met ID ${id} geweigerd.`);
    requests.value = requests.value.filter(request => request.id !== id);
    };
    
    // Functie voor het versturen van het huisformulier
    const submitHouse = () => {
    console.log('Nieuw huis toegevoegd:', house.value);
    alert(`Huis "${house.value.title}" is toegevoegd!`);
    house.value = { title: '', address: '', price: null, description: '' };
    };
    </script>
    
    <style scoped>
    .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
    }
    .fade-enter-from, .fade-leave-to {
    opacity: 0;
    }
    </style>
     -->
    <template></template>