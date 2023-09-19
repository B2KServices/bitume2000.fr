<template>
	<div>
		<h1>Proposer un nouveau rôle</h1>
		<input v-model="input" placeholder="Search...">

		<select v-model="selected">
			<option disabled value="">Role categorie</option>
			<option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
		</select>
		<!-- Utilisez @click pour déclencher la fonction admitRole lorsque le bouton est cliqué -->
		<button @click="admitRole">Soumettre</button>
    <p v-if="dispfeedback">{{feedback}}</p>
	</div>
</template>

<script setup>
import axios from "axios";
import Cookies from "js-cookie";
import { ref, onMounted } from "vue";

const feedback = ref("");
const dispfeedback = ref(false)
const input = ref("");
const categories = ref([]);
const selected = ref("");
const isLoading = ref(false);
const loginPopupShown = ref(false);

// Utilisez onMounted pour déclencher fetchCategories lorsque la page est montée
onMounted(fetchCategories);

async function fetchCategories() {
	isLoading.value = true;
	try {
		const response = await axios.get(
				"https://api.bitume2000.fr/v2/role/category",
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${Cookies.get("token")}`,
					},
				}
		);
		if (response.data) {
			console.log(response.data);
			categories.value = response.data;
		} else {
			showLoginPopup();
		}
	} catch (error) {
		if (error.response && error.response.status === 401) {
			showLoginPopup();
		} else {
			console.error(error);
		}
	} finally {
		isLoading.value = false;
	}
}

async function admitRole() {
  let response;
	try {
		const roleName = input.value;
		const categoryId = selected.value;
		 response = await axios.post(
				'https://api.bitume2000.fr/v2/role/auth',
				{
					name: roleName,
					category: categoryId,
				},
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${Cookies.get("token")}`,
					},
				}
		);
		feedback.value = "demande envoyée avec succès"
	} catch (e) {
    feedback.value = e.message
		console.log('error ' + e);
	}
  dispfeedback.value = true;
}

function showLoginPopup() {
	if (!loginPopupShown.value) {
		loginPopupShown.value = true;
		alert("Vous devez vous connecter pour accéder à cette page.");
		// Note: Assurez-vous que vous avez accès à `$router` dans votre composant, sinon, vous devrez peut-être ajuster cette partie.
		// this.$router.push('/login?redirect=/role');
	}
}
</script>

<style scoped>
/* Ajoutez vos styles CSS ici si nécessaire */
</style>
