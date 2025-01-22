<script setup lang="ts">
import { useRolesApi } from 'src/composables/roles/useRolesApi.ts';
import { ref } from 'vue';
import { RoleRequestModel } from 'src/models/role-model.ts';
import { useQuasar } from 'quasar';

const roleApi = useRolesApi();
const $q = useQuasar();

const requests = ref<RoleRequestModel[]>();

roleApi.getRequestRole().then((response) => (requests.value = response));
</script>

<template>
  <div>
    <q-card>
      <q-card-section class="text-center">
        <h3>Role request</h3>
      </q-card-section>
      <q-expansion-item
        v-for="request in requests"
        :key="request.id_request_role"
        style="gap: 8px;"
      >
        <template v-slot:header>
          <q-item-section>
            <span> {{ request.name }} par {{ request.requester.username }} </span>

          </q-item-section>
          <q-item-section side>
            <div class="row items-center">
            <q-btn
              flat
              @click="
              roleApi.approve(request.id_request_role).catch((error) => {
                $q.notify({
                  message: error.message,
                  color: 'red',
                  position: 'top-right',
                  icon: 'report_problem',
                  timeout: 2000,
                });
              })
            "
            ><q-icon name="task_alt" color="green"></q-icon
            ></q-btn>
            <q-btn flat><q-icon name="delete" color="red"></q-icon></q-btn>
            </div>

          </q-item-section>

        </template>
        <div class="q-pa-md">

        <q-item-section v-for="approve_user in request.approved_users" :key="approve_user.id_user">
          {{approve_user.username}} à approuvé
        </q-item-section>
        </div>
      </q-expansion-item>
    </q-card>
  </div>
</template>

<style scoped lang="scss"></style>
