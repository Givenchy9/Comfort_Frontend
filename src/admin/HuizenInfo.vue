<template>
    <div>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
        <Header />

        <!-- Input veld -->
        <div class="mt-[1%] flex justify-center">
            <input type="number" class="p-2 border-2 border-black rounded-md" v-model="firstInputValue" placeholder="Zoek een huis"/>
        </div>

        <!-- Toon specifieke informatie als er een huisnummer is ingevuld -->
        <div v-if="huisInfo">
            <b class="mt-[2%] text-3xl flex justify-center">Informatie</b>
            <div id="informatie" class="ml-[5%] mt-[1%] grid grid-cols-4 grid-rows-3">
                <div v-for="index in divCount" :key="index" class="mt-[5%] w-[50%] p-2 border-2 border-black rounded-md">
                    <template v-if="huisInfo">
                        <template v-if="index === 1">
                            Straatnaam: {{ huisInfo.straatnaam }}
                        </template>
                        <template v-else-if="index === 2">
                            Postcode: {{ huisInfo.postcode }}
                        </template>
                        <template v-else-if="index === 3">
                            Huisnummer: {{ huisInfo.huisnummer }}
                        </template>
                        <template v-else-if="index === 4">
                            Prijs: {{ huisInfo.prijs }}
                        </template>
                        <template v-else-if="index === 5">
                            Type: {{ huisInfo.type }}
                        </template>
                        <template v-else-if="index === 6">
                            Oppervlakte Huis: {{ huisInfo.oppervlakte_huis }}
                        </template>
                        <template v-else-if="index === 7">
                            Oppervlakte Tuin: {{ huisInfo.oppervlakte_tuin }}
                        </template>
                        <template v-else-if="index === 8">
                            Plaats: {{ huisInfo.plaats }}
                        </template>
                    </template>
                </div>
            </div>
        </div>

        <!-- Toon een lijst van alle huizen als er geen huisnummer is ingevuld -->
        <div v-else>
            <b class="mt-[2%] text-3xl flex justify-center">Lijst van alle huizen</b>
            <div class="ml-[5%] mt-[1%] grid grid-cols-4 gap-4">
                <div v-for="huis in result" :key="huis.id" class="p-4 border-2 border-gray-400 rounded-md">
                    <p><b>Straatnaam:</b> {{ huis.straatnaam }}</p>
                    <p><b>Postcode:</b> {{ huis.postcode }}</p>
                    <p><b>Huisnummer:</b> {{ huis.huisnummer }}</p>
                    <p><b>Prijs:</b> {{ huis.prijs }}</p>
                    <p><b>Plaats:</b> {{ huis.plaats }}</p>
                    <p class="flex justify-self-end gap-4">
                        <button @click="openPopup('edit', huis)" class="font-medium text-blue-700">edit</button>
                        <button @click="openPopup('delete', huis)" class="font-medium text-red-700">delete</button>
                    </p>
                </div>
            </div>
        </div>

        <!-- Popup -->
        <div v-if="isPopupVisible" class="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
            <div class="bg-white p-6 rounded shadow-lg w-1/3">
                <h2 class="text-xl font-bold mb-4">
                    {{ popupMode === 'edit' ? 'Edit Huis' : 'Delete Huis' }}
                </h2>

                <!-- Edit Huis -->
                <div v-if="popupMode === 'edit'">
                    <label for="straatnaam" class="block mb-2 text-gray-700">Straatnaam:</label>
                    <input id="straatnaam" type="text" class="p-2 border rounded-md w-full" v-model="editStraatnaam"/>
                </div>

                <!-- Delete Huis -->
                <p v-if="popupMode === 'delete'">
                    Weet u zeker dat u het huis met straat {{ selectedHuis.straatnaam }} wilt verwijderen?
                </p>

                <div class="flex justify-end gap-4 mt-6">
                    <button @click="closePopup" class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Annuleren</button>
                    <button
                        v-if="popupMode === 'delete'"
                        @click="confirmDelete"
                        class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        Verwijderen
                    </button>
                    <button
                        v-if="popupMode === 'edit'"
                        @click="confirmEdit"
                        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Opslaan
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from "@/admin/components/Header.vue";
import axios from "axios";

export default {
    name: "Huis",
    components: {
        Header,
    },
    data() {
        return {
            result: [], // All houses fetched from the API
            huisInfo: null, // Specific house information to display based on input
            firstInputValue: null,
            divCount: 8, // Number of divs to display
            isPopupVisible: false,
            popupMode: null,
            selectedHuis: null,
            editStraatnaam: "", // For editing straatnaam
        };
    },
    methods: {
        // Load all house data
        HuisLoad() {
            axios
                .get("http://127.0.0.1:8000/api/huizen")
                .then(({ data }) => {
                    this.result = Array.isArray(data) ? data : [];
                })
                .catch((error) => {
                    console.error("Error loading huizen:", error);
                });
        },

        // Fetch information for a specific house based on input number
        loadhuisInfo() {
            this.huisInfo = this.result.find(
                (item) => item.id == this.firstInputValue
            );
        },

        // Popup handling
        openPopup(mode, huis) {
            this.popupMode = mode;
            this.selectedHuis = huis;
            this.editStraatnaam = huis.straatnaam; // Populate straatnaam for editing
            this.isPopupVisible = true;
        },
        closePopup() {
            this.isPopupVisible = false;
        },
        confirmDelete() {
            console.log("Deleting huis:", this.selectedHuis);
            // Replace this with actual delete logic
            this.closePopup();
        },
        confirmEdit() {
            this.selectedHuis.straatnaam = this.editStraatnaam; // Update straatnaam
            console.log("Edited huis:", this.selectedHuis);
            // Replace this with API update logic
            this.closePopup();
        },
    },
    created() {
        this.HuisLoad();
    },
    watch: {
        firstInputValue(newValue) {
            if (newValue) {
                this.loadhuisInfo();
            } else {
                this.huisInfo = null;
            }
        },
    },
};
</script>