<template>
  <div>
    <q-dialog v-model="persistent" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-teal text-white" style="width: 300px">
        <q-card-section class="disconnect-msg">
          <div class="text-h6">Déconnecté !</div>
        </q-card-section>

        <q-card-section class="disconnect-msg">
          <span>vous avez besoin d'etre connecté pour acceder a cette page</span>
        </q-card-section>

        <q-card-actions align="right" class="bg-white">
          <q-btn class="ok-btn" flat label="OK" v-close-popup @click="$router.push('/login?dir=/roles')"></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="addRolePopup" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Proposer un role</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-input dense v-model="rolename" autofocus></q-input>
          <q-select v-model="selectedCategories" :options="categoriesOptions" label="Standard"></q-select>
        </q-card-section>
        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup></q-btn>
          <q-btn flat label="Proposer" v-close-popup @click="SubmitRole"></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <nav-bar />
    <q-btn class="ok-btn add-role" round icon="add" @click="addRolePopup = true" />
    <div id="role-page">
      <h1>Choisissez vos roles</h1>

      <div id="role-categories">
        <div v-for="(category, index) in categories" :key="index" class="category-card">
          <h2 :style="{ 'color': '#' + category.color}">{{ category.name }}</h2>
          <div v-for="(role, roleIndex) in category.children" :key="roleIndex" class="role-item">
            <span>{{ role.name }}</span>
            <q-toggle v-model="state[role.id]" @input="roleUpdate(role.id)" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, Ref } from 'vue';
import { useRestAgentStore } from 'stores/restAgentStore';
import { useUserConnectedStore } from 'stores/useUserConnectedStore';
import { RoleCategoryModel } from 'src/models/RoleCategoryModel';
import NavBar from 'layouts/NavBar.vue';

const categories = ref<RoleCategoryModel[]>([]);
const state = ref<Record<string, Ref<boolean>>>({});
const persistent = ref(false);
const addRolePopup = ref(false);
const rolename = ref('');
const selectedCategories = ref('');
const categoriesOptions = ref<string[]>([]);
const categoriesId = ref<string[]>([]);

onMounted(() => {
  setCategories();
});

function SubmitRole() {
  const index = categoriesOptions.value.indexOf(selectedCategories.value);
  const id = categoriesId.value[index];
  useRestAgentStore()
    .restAgent.fetch('role/auth', {
    method: 'POST',
    body: JSON.stringify({
      name: rolename.value,
      category: id
    }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${useUserConnectedStore().getToken()}`
    }
  })
    .then(async (res) => {
      if (res.status == 401) {
        persistent.value = true;
        return;
      }
    })
    .catch((err) => {
      console.error(err);
    });
}

function setCategories() {
  useRestAgentStore()
    .restAgent.fetch('role/category', {
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
        categoriesOptions.value.push(category.name);
        categoriesId.value.push(category.id);
        for (const role of category.children) {
          state.value[role.id] = ref(false);
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
    .restAgent.fetch('members/role', {
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
        state.value[role.id] = ref(true);
      }
    })
    .catch((err) => {
      console.error(err);
    });
}

function roleUpdate(id: string) {
  const currentStatus = state.value[id] || false;
  const method = currentStatus ? 'DELETE' : 'POST';

  useRestAgentStore()
    .restAgent.fetch('members/role', {
    method,
    body: JSON.stringify({
      role_id: id
    }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${useUserConnectedStore().getToken()}`
    }
  })
    .then(() => {
      state.value[id] = ref(!currentStatus);
    })
    .catch((err) => {
      console.error(err);
    });
}
</script>

<style lang="scss" scoped>


.add-role {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: $primary;
  border-radius: 100%;
  z-index: 1000;
}

.ok-btn {
  background-color: $primary;
  color: $light;
}


.disconnect-msg {
  padding-top: 20px;
  background: $secondary;
}

#role-page {
  margin-left: 5%;
  margin-right: 5%;
  height: 100%;
  margin-top: 50px;
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
