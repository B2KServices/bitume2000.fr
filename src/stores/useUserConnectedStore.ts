import { Ref, ref } from 'vue';
import { defineStore } from 'pinia';
import { UserModel } from 'src/models/UserModel';
import { useRestAgentStore } from 'stores/restAgentStore';

export const useUserConnectedStore = defineStore('userConnected', () => {
  const userConnected: Ref<UserModel | null> = ref(null);
  const token: Ref<string | null> = ref(null);
  const setUserConnected = () => {
    if (token.value === null) {
      return;
    }
    useRestAgentStore()
      .restAgent.fetch('members/id', {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      })
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            userConnected.value = data;
          });
        }
      });
  };
  const resetUserConnected = () => {
    userConnected.value = null;
  };

  const getUserToken = async (username: string, password: string | null) => {
    if (password === null) {
      const response = await useRestAgentStore().restAgent.fetch('auth/login', {
        body: JSON.stringify({
          username: username,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });
      if (!response.ok) {
        return false;
      }
      const data = await response.json();
      token.value = data.token;
      setUserConnected();
      return true;
    }
  };
  return {
    userConnected,
    setUserConnected,
    resetUserConnected,
    getUserToken,
  };
});
