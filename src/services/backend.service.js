class BackendService {
  static BASE_URL = 'http://localhost:8000/api';
  static ENDPOINTS = {
    REGISTER: `${this.BASE_URL}/auth/registrar`,
    LOGIN: `${this.BASE_URL}/auth/login`,
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

  static async registrar(dados) {
    return await this.postData(this.ENDPOINTS.REGISTER, dados);
  }
}

export default BackendService;