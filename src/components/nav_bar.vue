<template>
	<nav>
		<div class="nav-logo">
			<img src="../images/logo.png" alt="logo" width="150" height="100">
			<h1>{{ actualSeason }}</h1>
		</div>
		<div class="nav-menu">
			<div class="menu-category" @click="redirection('/')">
				<a>Accueil</a>
			</div>
			<div :class="{'menu-category': !GamesMenu, 'menu-category-active': GamesMenu}" @click="toggleGamesMenu">
				<a>Jeux et Serveurs</a>
				<ul v-if="GamesMenu">
					<a href="/role">Role</a>
				</ul>
			</div>
			<div :class="{'menu-category': !ArtMenu, 'menu-category-active': ArtMenu}" @click="toggleArtMenu">
				<a>Arts</a>
				<ul v-if="ArtMenu">
					<!-- Contenu de la liste des Arts -->
				</ul>
			</div>
			<div :class="{'menu-category': !SocialMenu, 'menu-category-active': SocialMenu}" @click="toggleSocialMenu">
				<a>réseau social</a>
				<ul v-if="SocialMenu">
					<!-- Contenu de la liste des réseaux sociaux -->
				</ul>
			</div>
				<a>
					<ProfilViz></ProfilViz>
				</a>
				<ul v-if="accountMenu">
					<!-- Contenu du menu du compte -->
				</ul>
			</div>
	</nav>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import router from "@/router";
import ProfilViz from "@/components/profil_visualizer.vue";

const GamesMenu = ref(false);
const ArtMenu = ref(false);
const SocialMenu = ref(false);
const accountMenu = ref(false);
const username = ref();

const actualSeason = ref();
getActualSeason();
getNameAccount();

function redirection(route) {
	// Redirection vers la route spécifiée
	router.push(route);
}

function getActualSeason() {
	axios
			.get("https://api.bitume2000.fr/v2/general/season", {
				headers: {
					"Content-Type": "application/json",
				},
			})
			.then((response) => {
				actualSeason.value = response.data.value;
			})
			.catch((error) => {
				console.log(error);
			});
}

function hasToken() {
	if (typeof this === "undefined") return false;
	if (typeof this.$cookie === "undefined") return false;
	const token = this.$cookie.get("token");
	if (token === null) {
		return false;
	}
	return true;
}

function getNameAccount() {
	if (!hasToken()) {
		username.value = "Compte";
		return;
	}
	const token = this.$cookie.get("token");
	axios
			.get("https://api.bitume2000.fr/v2/members/id", {
				authorization: "bearer " + token,
			})
			.then((response) => {
				username.value = response.data;
			})
			.catch((error) => {
				console.log(error);
				username.value = "Compte";
			});
}

function toggleGamesMenu() {
	GamesMenu.value = !GamesMenu.value;
}

function toggleArtMenu() {
	ArtMenu.value = !ArtMenu.value;
}

function toggleSocialMenu() {
	SocialMenu.value = !SocialMenu.value;
}


</script>

<style>
@import "../style/navbar.css";
</style>
