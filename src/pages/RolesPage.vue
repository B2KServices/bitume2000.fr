<template>
  <div class="role-page">
    <q-dialog
      v-model="persistent"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card class="bg-teal text-white" style="width: 300px">
        <q-card-section class="disconnect-msg">
          <div class="text-h6">Déconnecté !</div>
        </q-card-section>

        <q-card-section class="disconnect-msg">
          <span
            >vous avez besoin d'etre connecté pour acceder a cette page</span
          >
        </q-card-section>

        <q-card-actions align="right" class="bg-white">
          <q-btn
            class="ok-btn"
            flat
            label="OK"
            v-close-popup
            @click="$router.push('/login?dir=/roles')"
          ></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="addRolePopup" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Proposer un rôle</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-input dense v-model="rolename" autofocus></q-input>
          <q-select
            v-model="selectedCategories"
            :options="categoriesOptions"
            label="Standard"
          ></q-select>
        </q-card-section>
        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup></q-btn>
          <q-btn
            flat
            label="Proposer"
            v-close-popup
            @click="SubmitRole"
          ></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <nav-bar />
    <q-btn
      class="ok-btn add-role"
      round
      icon="add"
      @click="addRolePopup = true"
    />
    <div id="role-page">
      <h1>Choisissez vos rôles</h1>

      <div id="role-categories">
        <div
          v-for="(category, index) in categories"
          :key="index"
          class="category-card"
          :style="{ 'background-color': '#' + category.color }"
        >
          <h2 :style="{ color: '#' + darkenColor(category.color) }">
            {{ category.name }}
          </h2>
          <div
            v-for="(role, roleIndex) in category.children"
            :key="roleIndex"
            class="role-item"
            @click="roleUpdate(role.id)"
          >
            <span>{{ role.name }}</span>
            <q-toggle
              v-model="state[role.id]"
              keep-color
              @update:model-value="roleUpdate(role.id, true)"
              :style="{ color: '#' + darkenColor(category.color) }"
              color="brown-10"
              size="500%"
            />
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

function darkenColor(hexCode: string) {
  const hex = hexCode;
  const rgb = [
    parseInt(hex.slice(0, 2), 16),
    parseInt(hex.slice(2, 4), 16),
    parseInt(hex.slice(4, 6), 16),
  ];

  const darkenedRgb = rgb.map((component) => Math.round(component * 0.5));

  return darkenedRgb
    .map((component) => component.toString(16).padStart(2, '0'))
    .join('');
}

function SubmitRole() {
  const index = categoriesOptions.value.indexOf(selectedCategories.value);
  const id = categoriesId.value[index];
  useRestAgentStore()
    .restAgent.fetch('role/auth', {
      method: 'POST',
      body: JSON.stringify({
        name: rolename.value,
        category: id,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${useUserConnectedStore().getToken()}`,
      },
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
        Authorization: `Bearer ${useUserConnectedStore().getToken()}`,
      },
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
        Authorization: `Bearer ${useUserConnectedStore().getToken()}`,
      },
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

function roleUpdate(id: string, invert = false) {
  const currentStatus = state.value[id] || false;
  let method = currentStatus ? 'DELETE' : 'POST';
  if (invert) {
    method = currentStatus ? 'POST' : 'DELETE';
  } else {
    state.value[id] = ref(!currentStatus);
  }

  useRestAgentStore()
    .restAgent.fetch('members/role', {
      method,
      body: JSON.stringify({
        role_id: id,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${useUserConnectedStore().getToken()}`,
      },
    })
    .catch((err) => {
      console.error(err);
      state.value[id] = ref(!currentStatus);
    });
}
</script>

<style lang="scss" scoped>
h1 {
  padding-top: 50px;
  padding-bottom: 50px;
  font-size: 3vw;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
}

h2 {
  font-size: 2vw;
  font-weight: bold;
  margin-bottom: 20px;
}

.role-page {
  background-color: $light;
  width: 100%;
  height: 100vh;
  overflow: auto;
}

.add-role {
  position: fixed;
  bottom: 25px;
  right: 25px;
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

#role-categories {
  display: grid;
  row-gap: 3%;
  column-gap: 3%;
  grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
  grid-auto-rows: 1fr;
}

.category-card {
  padding: 5%;
  border-radius: 30px;
  box-shadow: $dark 0px 0px 10px 0px;
  margin: 0 5%;
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
  background-color: $light;
  cursor: pointer;
}

button {
  margin-left: 10px;
  padding: 5px 10px;
  border-radius: 5px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.6), 0 4px 4px rgba(0, 0, 0, 0.6);
}

@media (max-width: 800px) {
  h1 {
    font-size: 10vw;
  }

  h2 {
    font-size: 8vw;
  }

  .role-item {
    font-size: 2.5vw; // affecte les toggles
    margin: 0px;
    padding: 0px;

    span {
      font-size: 4vw;
    }
  }

  .category-card {
    max-width: 800px;
    width: 90vw;
  }

  .category-card:last-child {
    margin-bottom: 100px;
  }

  #role-categories {
    grid-row-gap: 35px;
    grid-template-columns: 1fr;
    grid-auto-rows: unset;
    grid-template-rows: repeat(auto-fill, minmax(200px, 1fr));
  }
}
</style>
