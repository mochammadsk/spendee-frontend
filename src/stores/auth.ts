import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    user: null as any,
  }),
  actions: {
    setAuthenticated(status: boolean) {
      this.isAuthenticated = status;
    },
    setUser(user: any) {
      this.user = user;
      this.isAuthenticated = true;
    },
    logout() {
      this.isAuthenticated = false;
      this.user = null;
    },
  },
});
