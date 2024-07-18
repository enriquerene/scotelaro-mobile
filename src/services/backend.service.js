class BackendService {
  static BASE_URL = 'http://localhost:8000/api';
  static ENDPOINTS = {
    REGISTER: `${this.BASE_URL}/auth/registrar`,
    LOGIN: `${this.BASE_URL}/auth/login`,
    TURMAS: `${this.BASE_URL}/turmas/`,
  }
  static STATUS = {
    BEM_SUCEDIDO: (s) => (s === 200 || s === 201)
  }

  static async postData(url, data) {
    const r = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {'Content-Type': 'application/json'},
    });
    return await r.json();
  }

  static async getData(url) {
    const r = await fetch(url);
    return await r.json();
  }

  static async registrar(dados) {
    return await this.postData(this.ENDPOINTS.REGISTER, dados);
  }

  static async login(dados) {
    return await this.postData(this.ENDPOINTS.LOGIN, dados);
  }

  static async obterListaDeTurmas() {
    return await this.getData(this.ENDPOINTS.TURMAS);
  }
}

export default BackendService;