import { Ref, ref } from 'vue';
import { defineStore } from 'pinia';
import { UserModel } from 'src/models/UserModel';
import { useRestAgentStore } from 'stores/restAgentStore';
import { Cookies } from 'quasar';

export const useUserConnectedStore = defineStore('userConnected', () => {
  const userConnected: Ref<UserModel | null> = ref(null);
  // const token: Ref<string | null> = ref(null);
  const setUserConnected = () => {
    if (!Cookies.has('token')) {
      return;
    }
    useRestAgentStore()
      .restAgent.fetch('members/id', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
          Accept: 'application/json',
        },
      })
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            console.log(data);
            userConnected.value = data;
          });
        } else {
          Cookies.remove('token');
        }
      });
  };
  const disconnect = () => {
    userConnected.value = null;
    Cookies.remove('token');
  };

  const connect = async (username: string, password: string | null) => {
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
      Cookies.set('token', data.token);
      setUserConnected();
      return true;
    }
  };

  const getUserConnected = () => {
    if (userConnected.value === null && Cookies.has('token')) {
      setUserConnected();
    }
    return userConnected.value;
  };
  return {
    getUserConnected,
    connect,
    disconnect,
    getToken: () => Cookies.get('token'),
  };
});
