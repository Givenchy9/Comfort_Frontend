<script>
import { ref, onMounted, watch } from 'vue';
import Header from "@/admin/components/Header.vue";
import axios from 'axios';

export default {
    name: "Huis",
    components: {
        Header,
    },
    data() {
        return {
            result: [],        // All huiss fetched from the API
            huis: {
                id: "",
                straatnaam: "",
                postcode: "",
                huisnummer: "",
                prijs: "",
                type: "",
                oppervlakte_huis: "",
                oppervlakte_tuin: "",
                plaats: "",
                provincie: "",
                slaapkamers: "",
                badkamers: "",
                woonlagen: "",
                energie_label: "",
                isolatie: "",
                bouwjaar: "",
                garage: "",
                zwembad: "",
                tuin: "",
                zonnepanelen: "",
            },
            huisInfo: null,   // Specific huis information to display based on input
            firstInputValue: null,
            divCount: 8,       // Number of divs to display
        };
    },
    methods: {
        // Load all huis data
        HuisLoad() {
    console.log("Fetching huizen...");
    axios
        .get("http://127.0.0.1:8000/api/huizen")
        .then(({ data }) => {
            console.log("huizen loaded:", data); // Check the loaded data
            this.result = data;
            let output = "";

            const id = data.id;
            const straatnaam = data.straatnaam;
            const postcode = data.postcode;
            const huisnummer = data.huisnummer;


            output += `
                ${id}
                ${straatnaam}
                ${postcode}
                ${huisnummer}
                `

        })
        .catch((error) => {
            console.error("Error loading huizen:", error); // More detailed error info
        });
    },
    save() {
            console.log("Save button clicked", this.huis);
            if (!this.huis.id) {
                this.saveData();
            } else {
                this.updateData();
            }
        },

        
        // Fetch information for a specific huis based on input number
        loadhuisInfo() {
            const huis = this.result.find(item => item.huisnummer == this.firstInputValue);
            this.huisInfo = huis || null; // Display if huis found, otherwise reset to null
        },
    },
    created() {
        this.HuisLoad();
    },
    watch: {
        // Watch for changes to the input value
        firstInputValue(newValue) {
            if (newValue) {
                this.loadhuisInfo();
            } else {
                this.huisInfo = null; // Clear if input is empty
            }
        }
    }
}
</script>
<template>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <Header />
    <div class="mt-[1%] flex justify-center">
        <input type="number" class="p-2 border-2 border-black rounded-md" v-model="firstInputValue" placeholder="Zoek een huis"/>
    </div>

    <b v-if="firstInputValue" class="mt-[2%] text-3xl flex justify-center">Informatie</b>
    <div v-if="firstInputValue" id="informatie" class="ml-[5%] mt-[1%] grid grid-cols-4 grid-rows-3">
        <!-- Generate 8 divs with specific information for each -->
        <div v-for="index in divCount" class="mt-[5%] w-[50%] p-2 border-2 border-black rounded-md">
            <span class="grid grid-cols-2 flex items-center">
                <span class="flex items-center">
                    <!-- Display specific properties based on the index -->
                    <span v-if="huisInfo">
                        <!-- Check index to display specific property -->
                        <template v-if="index === 1">
                            Straatnaam: {{ loadhuisInfo.straatnaam }}
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
                    </span>
                    <!-- Display placeholder text if huisInfo is not available -->
                    <span v-else>
                        Placeholder {{ index }}
                    </span>
                </span>
            </span>
        </div>
    </div>
</template>
