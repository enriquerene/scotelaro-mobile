class AuthService {
  basename: string;
  constructor(basename: string) {
    this.basename = basename;
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
      body: JSON.stringify({ username: username, password: password }),
    });
    const json = await response.json();
    const token = json.token;
    const name = json.name;
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
    return json.code === 200;
  }
  // getUserInfo(): Promise<UserInfo> {
  //  implementation here
  // }
}

export default new AuthService('http://localhost:8080');
