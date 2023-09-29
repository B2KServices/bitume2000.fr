<template>
  <nav_bar></nav_bar>
  <adding_role></adding_role>
  <div id="role-page">
    <h1>Page de sélection de roles</h1>
    <div id="role-categories">
      <div v-for="(category, index) in categories" :key="index" class="category-card">
        <h2 :style="{ 'color': '#' + category.color.toString(16) }">{{ category.name }}</h2>
        <div v-for="(role, roleIndex) in category.children" :key="roleIndex" class="role-item">
          <span>{{ role.name }}</span>
          <button @click="roleUpdate(role.id)" :class="values[role.id] ? 'btn-red' : 'btn-green'">
            {{ values[role.id] ? 'Supprimer' : 'Ajouter'}}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Cookies from "js-cookie";
import nav_bar from "@/components/nav_bar.vue";
import adding_role from "@/components/adding_role.vue";

export default {
	name: 'RolePage',
  components: {adding_role, nav_bar},
	data() {
		return {
			categories: [],
			ownrole: [],
			isLoading: false,
			values: {},
			loginPopupShown: false // Nouvelle variable de données
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
					this.values[role.id] = this.ownrole.some(r => r.id === role.id);
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
						this.values[id] = false;
					})
					.catch(error => {
						if (error.response && error.response.status === 401) {
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
						this.values[id] = true;
					})
					.catch(error => {
						if (error.response && error.response.status === 401) {
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
		},
		showLoginPopup() {
			if (!this.loginPopupShown) {
				this.loginPopupShown = true;
				alert("Vous devez vous connecter pour accéder à cette page.");
				this.$router.push('/login?redirect=/role');
			}
		},
	}
};
</script>

<style>
@import "../style/role-page.css";
</style>
