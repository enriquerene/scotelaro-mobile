class AuthService {
  basename: string;

  constructor(basename: string) {
    this.basename = basename;
  }

  async register(
    username: string,
    password: string,
    name: string,
  ): Promise<{
    uuid: string;
  }> {
    const response = await fetch(`${this.basename}/auth/register`, {
      method: 'POST',
      body: JSON.stringify({
        whatsapp: username,
        senha: password,
        nome: name,
      }),
    });
    const json = await response.json();
    const responseData = json.data;
    return {
      uuid: responseData.uuid,
    };
  }

  async login(
    username: string,
    password: string,
  ): Promise<{
    whatsapp: string;
    token: string;
    name: string;
  }> {
    const response = await fetch(`${this.basename}/auth/login`, {
      method: 'POST',
      body: JSON.stringify({ whatsapp: username, senha: password }),
    });
    const json = await response.json();
    console.log(json);
    const responseData = json.data;
    const token = responseData.token;
    const name = responseData.name;
    return {
      token: token,
      name: name,
      whatsapp: username,
    };
  }

  async logout(token: string): Promise<Boolean> {
    const response = await fetch(`${this.basename}/auth/logout`, {
      method: 'POST',
      body: JSON.stringify({ token: token }),
    });
    const json = await response.json();
    return json.meta.code === 200;
  }
}

export default new AuthService('http://localhost:8080');
