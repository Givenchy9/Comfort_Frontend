    @ -1,79 +0,0 @@
    <script setup>
    import { ref } from 'vue';
    import Header from "@/admin/components/Header.vue";

    // Reactieve variabele voor de invoer
    let firstInputValue = ref(null);

    // Reactieve array voor het bijhouden van informatie
    let infoItems = ref([
        { id: 1, text: "info", isEditing: false, newText: "" },
        { id: 2, text: "info", isEditing: false, newText: "" },
        { id: 3, text: "info", isEditing: false, newText: "" },
        { id: 4, text: "info", isEditing: false, newText: "" },
        { id: 5, text: "info", isEditing: false, newText: "" },
        { id: 6, text: "info", isEditing: false, newText: "" },
        { id: 7, text: "info", isEditing: false, newText: "" },
        { id: 8, text: "info", isEditing: false, newText: "" }
    ]);

    // Functie om de tekst van een item te verwijderen
    const removeText = (id) => {
        const item = infoItems.value.find(item => item.id === id);
        if (item) {
            item.text = ""; // Verander de tekst naar een lege string
        }
    };

    // Functie om de tekst van een item te bewerken
    const editText = (id) => {
        const item = infoItems.value.find(item => item.id === id);
        if (item) {
            item.isEditing = true; // Zet de edit-modus aan
            item.newText = item.text; // Bewaar de huidige tekst
        }
    };

    // Functie om de bewerking op te slaan
    const saveText = (id) => {
        const item = infoItems.value.find(item => item.id === id);
        if (item) {
            item.text = item.newText; // Werk de tekst bij
            item.isEditing = false; // Zet de edit-modus uit
        }
    };
    </script>

    <template>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
        <Header />
        <div class="mt-[1%] flex justify-center">
            <input type="number" class="p-2 border-2 border-black rounded-md" v-model="firstInputValue" placeholder="Zoek een huis"/>
        </div>

        <b v-if="firstInputValue" class="mt-[2%] text-3xl flex justify-center">Informatie</b>
        <div id="informatie" class="ml-[5%] mt-[1%] grid grid-cols-4 grid-rows-3">
            <div v-if="firstInputValue" v-for="item in infoItems" :key="item.id" class="mt-[5%] w-[50%] p-2 border-2 border-black rounded-md">
                <span class="grid grid-cols-2 flex items-center">
                    <span class="flex items-center">
                        <template v-if="item.isEditing">
                            <input 
                                v-model="item.newText" 
                                @blur="saveText(item.id)" 
                                @keyup.enter="saveText(item.id)" 
                                class="p-1 border-2 border-gray-300 rounded-md"
                                placeholder="Voer nieuwe informatie in"
                            />
                        </template>
                        <template v-else>
                            <span>{{ item.text }}</span> <!-- Weergeven als tekst -->
                        </template>
                        <i v-if="!item.isEditing" class="fa-solid fa-pencil ml-2" @click="editText(item.id)"></i> <!-- Potlood icoon -->
                    </span>
                    <span class="flex justify-end items-center">
                        <i class="fa-solid fa-trash ml-2" @click="removeText(item.id)"></i> <!-- Click handler -->
                    </span> 
                </span>
            </div>
        </div>
    </template>