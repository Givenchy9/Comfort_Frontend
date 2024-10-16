<script>
import { ref } from 'vue';

export default {
  setup() {
    // Ref voor privacy policy modal
    const PrivacyPolicy = ref(false);

    // Functie om de privacy policy modal te tonen of te verbergen
    const togglePrivacyPolicy = () => {
      PrivacyPolicy.value = !PrivacyPolicy.value;
    };

    return {
      PrivacyPolicy,
      togglePrivacyPolicy
    };
  }
};
</script>

<template>
  <div class="bg-blue-400 absolute grid grid-cols-3 grid-rows-3 gap-3 inset-x-0 bottom-0 h-[20%] p-8 border-t-2 border-blue-800 " >
    <b>Over ons</b> <b>Social media</b> <b>Info</b>
    <div>© anno 2024</div> <button class="flex justify-start"> <a href="https://www.facebook.com/funda" target="blank"><i class="fa-brands fa-facebook"></i> </a></button> <div> <button class="flex justify-start"> <a href="tel:+1234567890"> FAQ </a> </button></div>
    <a href="mailto:privacy@snabbapapa.com" class="flex justify-start">Contact</a>

    <button class="flex justify-start"> <a href="https://www.instagram.com" target="blank"> <i class="fa-brands fa-instagram"></i>  </a></button>
    <button @click="togglePrivacyPolicy" class="flex justify-start">Privacybeleid</button>
  </div>

  <div v-if="PrivacyPolicy" class="modal-overlay" @click.self="togglePrivacyPolicy">
    <div class="modal-content">
      <button class="modal-close" @click="togglePrivacyPolicy">X</button>
      <h1>Privacybeleid</h1> <br>
      <p><strong>Laatst bijgewerkt:</strong> 14 oktober 2024</p>

      <p>
        Wij nemen uw privacy serieus en zetten ons in om uw persoonlijke gegevens te beschermen. Dit privacybeleid beschrijft welke informatie we verzamelen, hoe we deze gebruiken en welke rechten u hebt met betrekking tot uw gegevens.
      </p>

      <h2>1. Verzamelde gegevens</h2>
      <p>Wanneer u gebruikmaakt van onze website of diensten, kunnen we verschillende soorten persoonlijke informatie van u verzamelen, waaronder:</p>
      <ul>
        <li><strong>Persoonlijke identificatiegegevens:</strong> zoals naam, e-mailadres, telefoonnummer en adres.</li>
        <li><strong>Gebruiksgegevens:</strong> zoals IP-adres, browsertype, browserversie, de pagina's die u bezoekt, de tijd en datum van uw bezoek, de tijd die u op die pagina's doorbrengt en andere statistieken.</li>
        <li><strong>Cookies en trackingtechnologieën:</strong> Wij gebruiken cookies en vergelijkbare technologieën om de functionaliteit van onze website te verbeteren en uw ervaring te personaliseren.</li>
      </ul> <br>

      <h2>2. Hoe wij uw gegevens gebruiken</h2>
      <p>Wij gebruiken de verzamelde gegevens voor de volgende doeleinden:</p>
      <ul>
        <li>Het verlenen en verbeteren van onze diensten.</li>
        <li>Het communiceren met u over uw account, producten of diensten die u hebt aangevraagd.</li>
        <li>Het analyseren van het gebruik van onze website om onze functionaliteit en diensten te verbeteren.</li>
        <li>Het voldoen aan wettelijke vereisten.</li>
      </ul> <br>

      <h2>3. Delen van uw gegevens</h2>
      <p>
        Wij delen uw persoonlijke gegevens alleen met derden wanneer dat nodig is voor de volgende doeleinden:
      </p>
      <ul>
        <li>Om te voldoen aan wettelijke verplichtingen.</li>
        <li>Om onze diensten te leveren en te beheren (bijvoorbeeld met serviceproviders).</li>
        <li>Om uw rechten te beschermen of om ons bedrijf te beschermen tegen fraude en misbruik.</li>
      </ul> <br>

      <h2>4. Uw rechten</h2>
      <p>U hebt de volgende rechten met betrekking tot uw persoonlijke gegevens:</p>
      <ul>
        <li>Recht op inzage in de gegevens die wij over u bewaren.</li>
        <li>Recht op correctie van onjuiste gegevens.</li>
        <li>Recht op verwijdering van uw gegevens onder bepaalde omstandigheden.</li>
        <li>Recht om bezwaar te maken tegen de verwerking van uw gegevens.</li>
      </ul> <br>

      <h2>5. Contactinformatie</h2>
      <p>
        Als u vragen hebt over ons privacybeleid of uw gegevens wilt beheren, neem dan contact met ons op via:
        <br />
        E-mail: privacy@snabbapapa.com
      </p>
    </div>
  </div>
</template>

<style scoped>
/* Stijlen voor de modal overlay */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* Semi-transparante achtergrond */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

/* Stijlen voor de modal content */
.modal-content {
  background-color: white;
  padding: 20px;
  max-height: 80%;
  max-width: 40%;
  border-radius: 8px;
  position: relative;
  overflow-y: auto; /* Zorg ervoor dat de modal scrollbaar is */
}

/* Sluitknop voor de modal */
.modal-close {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
}

h1, h2 {
  color: #333;
  font-size: large;
  font-weight: 700;
}

p, li {
  font-size: 16px;
  line-height: 1.6;
}

ul {
  margin-left: 20px;
}
</style>
