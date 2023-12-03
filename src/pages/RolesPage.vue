<template>
  <div>
    <q-dialog v-model="persistent" persistent transition-show="scale" transition-hide="scale">
      <!-- Your dialog content remains unchanged -->
    </q-dialog>

    <nav-bar/>

    <div id="role-page">
      <h1>Page de sélection de roles</h1>

      <div id="role-categories">
        <div v-for="(category, index) in categories" :key="index" class="category-card">
          <h2 :style="{ 'color': '#' + category.color}">{{ category.name }}</h2>

          <div v-for="(role, roleIndex) in category.children" :key="roleIndex" class="role-item">
            <span>{{ role.name }}</span>
            <button @click="roleUpdate(role.id)" :class="state.get(role.id) ? 'btn-red' : 'btn-green'">
              {{ state.get(role.id) ? 'Supprimer' : 'Ajouter'}}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRestAgentStore } from "stores/restAgentStore";
import { useUserConnectedStore } from "stores/useUserConnectedStore";
import { RoleCategoryModel } from "src/models/RoleCategoryModel";
import { useRouter } from "vue-router";
import NavBar from "layouts/NavBar.vue";

const categories = ref<RoleCategoryModel[]>([]);
const state = ref<Map<string, boolean>>(new Map());
const persistent = ref(false);
const $router = useRouter();

onMounted(() => {
  setCategories();
});

function setCategories() {
  useRestAgentStore()
    .restAgent.fetch("role/category", {
    headers: {
      Authorization: `Bearer ${useUserConnectedStore().getToken()}`
    }
  })
    .then(async (res) => {
      if (res.status == 401) {
        persistent.value = true;
        return;
      }

      const data = await res.text();
      categories.value = JSON.parse(data);

      for (const category of categories.value) {
        for (const role of category.children) {
          state.value.set(role.id, false);
        }
      }

      getOwnRoles();
    })
    .catch((err) => {
      console.error(err);
    });
}

function getOwnRoles() {
  useRestAgentStore()
    .restAgent.fetch("members/role", {
    headers: {
      Authorization: `Bearer ${useUserConnectedStore().getToken()}`
    }
  })
    .then(async (res) => {
      if (res.status == 401) {
        persistent.value = true;
        return;
      }

      const data = await res.text();
      const roles = JSON.parse(data);

      for (const role of roles) {
        state.value.set(role.id, true);
      }
    })
    .catch((err) => {
      console.error(err);
    });
}

function roleUpdate(id: string) {
  const currentStatus = state.value.get(id) || false;
  const method = currentStatus ? "DELETE" : "POST";

  useRestAgentStore()
    .restAgent.fetch(`members/role`, {
    method,
    body: JSON.stringify({
      role_id: id
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${useUserConnectedStore().getToken()}`
    }
  })
    .then(() => {
      state.value.set(id, !currentStatus);
    })
    .catch((err) => {
      console.error(err);
    });
}
</script>

<style scoped lang="scss">
#role-page {
  margin-left: 5%;
  margin-right: 5%;
  height: 100%;
}

#role-page h1 {
  display: block;
  font-size: 2rem;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 40px;
}

#role-categories {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 3%;
}

.category-card {
  margin-bottom: 20px;
  padding: 5%;
}

.category-card:nth-child(3n - 1) {
  border-left: black 2px solid;
}

.category-card:nth-child(3n) {
  border-left: black 2px solid;
}

.category-card h2 {
  text-align: center;
}

.role-item {
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

span {
  margin-left: 10px;
}

.role-item button {
  align-content: end;
}

.role-item:hover {
  background-color: aliceblue;
}

button {
  margin-left: 10px;
  padding: 5px 10px;
  border-radius: 5px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.6), 0 4px 4px rgba(0, 0, 0, 0.6);
}

button:hover {
  cursor: pointer;
}

.btn-red {
  background-color: rgba(255, 0, 0, 0.3);
  border: rgba(255, 0, 0, 0.3) outset;
  color: black;
}

.btn-green {
  background-color: rgba(82, 222, 43, 0.48);
  border: rgba(82, 222, 43, 0.48) outset;
  color: black;
}
</style>
