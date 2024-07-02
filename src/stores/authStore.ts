import { makeObservable } from 'mobx';
import authService from '../services/authService.ts';

class AuthStore {
  user: { name?: string; whatsapp?: string } = {};
  token: string = '';
  loading: boolean = false;
  error: any = null;

  constructor() {
    makeObservable(this);
  }

  async userRegistration(
    username: string,
    password: string,
    name: string,
  ): Promise<string> {
    this.loading = true;
    try {
      const response: { uuid: string } = await authService.register(
        username,
        password,
        name,
      );
      this.loading = false;
      return response.uuid;
    } catch (error) {
      this.error = error;
      this.loading = false;
      throw error;
    }
  }

  async loginWithWhatsApp(username: string, password: string) {
    this.loading = true;
    try {
      const response: { whatsapp: string; name: string; token: string } =
        await authService.login(username, password);
      this.token = response.token;
      this.user = { name: response.name, whatsapp: response.whatsapp };
      this.loading = false;
    } catch (error) {
      this.error = error;
      this.loading = false;
    }
  }

  async logout() {
    this.loading = true;
    try {
      await authService.logout(this.token);
      this.token = '';
      this.user = {};
      this.loading = false;
    } catch (error) {
      this.error = error;
      this.loading = false;
    }
  }
}

export default AuthStore;
