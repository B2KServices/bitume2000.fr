<script lang="ts" setup>
import { ref } from 'vue';
import { RoleCategoryModel } from 'src/models/role-category-model.ts';
import { useRolesApi } from 'src/composables/roles/useRolesApi.ts';
import { RoleModel } from 'src/models/role-model.ts';
import { useUsersApi } from 'src/composables/users/useUsersApi.ts';
import { useQuasar } from 'quasar';

const categories = ref<RoleCategoryModel[]>([]);
const addRolePopup = ref(false);
const rolename = ref('');
const selectedCategory = ref<RoleCategoryModel>();
const userRoles = ref<RoleModel[]>([]);
const selectedRoles = ref<string[]>([]);
const $q = useQuasar();

const roleApi = useRolesApi();
const usersApi = useUsersApi();

roleApi.getCategories().then((data) => {
  categories.value = data;
});

usersApi.getMyRoles().then((data) => {
  userRoles.value = data;
  selectedRoles.value = data.map((role) => role.id_role);
});

function updateRole(idRole: string, newValue: string[]) {
  const addingRole = newValue.includes(idRole);
  usersApi.updateMyRole(idRole, addingRole).catch((error) => {
    $q.notify({
      message: error.message,
      color: 'negative',
      position: 'top',
      timeout: 2000,
    });
  });
}

function requestRole() {
  if (!rolename.value || !selectedCategory.value) {
    $q.notify({
      message: 'Veuillez remplir tous les champs',
      color: 'negative',
      position: 'top',
      timeout: 2000,
    });
    return;
  }
  roleApi.requestRole({
    name: rolename.value,
    id_role_category: selectedCategory.value.id_role_category,
  });
}
</script>
<template>
  <div class="q-pa-md">
    <q-dialog v-model="addRolePopup">
      <q-card
        class="q-pa-xl flex column"
        style="gap: 32px; background: #fef5e6"
      >
        <q-item-label class="text-h4">Proposer un nouveau rôle</q-item-label>
        <q-card-section class="flex column" style="gap: 32px">
          <q-input
            rounded
            outlined
            v-model="rolename"
            label="Nom du role"
            bg-color="white"
          />
          <q-select
            rounded
            outlined
            bg-color="white"
            v-model="selectedCategory"
            :options="categories"
            option-label="name"
            option-value="id_role_category"
            label="Categorie"
          ></q-select>
        </q-card-section>
        <q-card-actions align="center">
          <q-btn
            flat
            rounded
            icon="add_circle_outline"
            color="green"
            size="lg"
            @click="requestRole"
            :loading="false"
          ></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-btn
      class="add-role"
      round
      icon="add"
      @click="addRolePopup = true"
      color="primary"
    />

    <h1 class="text-center">Choisissez vos rôles</h1>

    <div class="flex column q-pa-xl role-categories" id="role-page">
      <q-card
        v-for="(category, index) in categories"
        :key="index"
        :style="{ 'background-color': category.color, 'border-radius': '25px' }"
        class="flex column q-pa-xl"
      >
        <q-item-label class="text-h2 flex justify-center">{{
          category.name
        }}</q-item-label>
        <q-item
          v-for="(role, roleIndex) in category.roles"
          :key="roleIndex"
          @click="false"
          class="flex justify-center content-between"
        >
          <q-toggle
            v-model="selectedRoles"
            keep-color
            @update:model-value="(val) => updateRole(role.id_role, val)"
            :style="{ color: 'dark' }"
            color="dark"
            size="75px"
            :val="role.id_role"
            :label="role.name"
            left-label
          />
        </q-item>
      </q-card>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.add-role {
  position: fixed;
  bottom: 25px;
  right: 25px;
  z-index: 1000;
}

.role-categories {
  display: grid;
  row-gap: 3%;
  column-gap: 3%;
  grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
  grid-auto-rows: 1fr;
}

@media (max-width: 800px) {
  .role-categories {
    grid-row-gap: 35px;
    grid-template-columns: 1fr;
    grid-auto-rows: unset;
    grid-template-rows: repeat(auto-fill, minmax(200px, 1fr));
  }
}
</style>
