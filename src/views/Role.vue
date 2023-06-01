<template>
	<div>
		<h1>Role Page</h1>
		<div v-for="(category, index) in categories" :key="index" class="category-card" :style="{ backgroundColor: category.color }">
			<h2>{{ category.name }}</h2>
			<div v-for="(role, roleIndex) in category.children" :key="roleIndex" class="role-item">
				<span>{{ role.name }}</span>
				<button @click="roleUpdate(role.id)">
					{{ values[role.id] ? 'Supprimer' : 'Ajouter'}}
				</button>
			</div>
		</div>
	</div>
</template>

<script>
import axios from "axios";
import Cookies from "js-cookie";

export default {
	name: 'RolePage',
	data() {
		return {
			categories: [],
			ownrole: [],
			isLoading: false,
			values: {}
		};
	},
	mounted() {
		this.fetchCategories();
		this.fetchUserRole();
	},
	methods: {
		completeValues() {
			for (const category of this.categories) {
				for (const role of category.children) {
					this.values[role.id] = this.ownrole.some(r => r.id === role.id); // Vérifier si l'ID du rôle est présent dans this.ownrole
				}
			}
		},
		roleDelete(id) {
			axios
					.delete('https://api.bitume2000.fr/v2/members/role', {
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${Cookies.get('token')}`,
						},
						data: {
							role_id: id,
						},
					})
					.then(response => {
						console.log(response);
					})
					.catch(error => {
						if (error.response && error.response.status === 401) {
							// Gérer l'erreur 401 ici
							this.showLoginPopup();
						} else {
							console.error(error);
						}
					});
		},
		roleAdd(id) {
			axios
					.post(
							'https://api.bitume2000.fr/v2/members/role',
							{
								role_id: id,
							},
							{
								headers: {
									'Content-Type': 'application/json',
									Authorization: `Bearer ${Cookies.get('token')}`,
								},
							}
					)
					.then(response => {
						console.log(response);
					})
					.catch(error => {
						if (error.response && error.response.status === 401) {
							// Gérer l'erreur 401 ici
							this.showLoginPopup();
						} else {
							console.error(error);
						}
					});
		},
		async fetchCategories() {
			this.isLoading = true;
			try {
				const response = await axios.get(
						'https://api.bitume2000.fr/v2/role/category',
						{
							headers: {
								'Content-Type': 'application/json',
								Authorization: `Bearer ${Cookies.get('token')}`,
							},
						}
				);
				if (response.data) {
					this.categories = response.data;
				} else {
					this.showLoginPopup();
				}
			} catch (error) {
				if (error.response && error.response.status === 401) {
					// Gérer l'erreur 401 ici
					this.showLoginPopup();
				} else {
					console.error(error);
				}
			} finally {
				this.isLoading = false;
			}
		},
		async fetchUserRole() {
			try {
				const response = await axios.get(
						'https://api.bitume2000.fr/v2/members/role',
						{
							headers: {
								'Content-Type': 'application/json',
								Authorization: `Bearer ${Cookies.get('token')}`,
							},
						}
				);
				if (response.data) {
					this.ownrole = response.data;
					this.completeValues();
				} else {
					this.showLoginPopup();
				}
			} catch (error) {
				if (error.response && error.response.status === 401) {
					// Gérer l'erreur 401 ici
					this.showLoginPopup();
				} else {
					console.error(error);
				}
			}
		},
		roleUpdate(id) {
			if (this.values[id]) {
				this.roleDelete(id);
			} else {
				this.roleAdd(id);
			}
			this.values[id] = !this.values[id];
		},
		showLoginPopup() {
			// Afficher la pop-up ou rediriger vers "/login?redirect=/role"
			alert("Vous devez vous connecter pour accéder à cette page.");
			this.$router.push('/login?redirect=/role');
		},
	}
};
</script>

<style>
@import "../style/role-page.css";
</style>
