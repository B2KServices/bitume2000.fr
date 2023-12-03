import { defineStore } from 'pinia';
import { reactive } from 'vue';

class RestAgent {
  backendAddress: URL;

  constructor() {
    // this.backendAddress = new URL(process.env.BACKEND_ADDRESS!);
    this.backendAddress = new URL('https://api.bitume2000.fr/v2/');
  }

  fetch(route: string, init?: RequestInit): Promise<Response> {
    const fullUrl = new URL(route, this.backendAddress);
    return fetch(fullUrl, {
      ...init,
    });
  }
}

export const useRestAgentStore = defineStore('restAgent', () => {
  const restAgent = reactive(new RestAgent());
  return { restAgent };
});
