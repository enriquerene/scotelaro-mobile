class BackendService {
  static BASE_URL = process.env.REACT_APP_BASE_URL;
  static ENDPOINTS = {
    REGISTER: `${this.BASE_URL}/auth/registrar`,
    LOGIN: `${this.BASE_URL}/auth/login`,
    TURMAS: `${this.BASE_URL}/turmas/`,
    PLANOS: `${this.BASE_URL}/planos/`,
    INCREVER_PLANO: `${this.BASE_URL}/usuarios/plano/inscrever`,
    CANCELAR_PLANO: `${this.BASE_URL}/usuarios/plano/cancelar`,
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

  static async postAuthenticatedData(url, authToken, dados = null) {
    let init = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
    }
    if (dados) {
      init.body = JSON.stringify(dados);
    }
    const r = await fetch(url, init);
    return await r.json();
  }

  static async getData(url) {
    const r = await fetch(url, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    });
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

  static async obterListaDePlanos() {
    return await this.getData(this.ENDPOINTS.PLANOS);
  }

  static async inscreverEmPlano(idPlano, tokenAutorizacao) {
    const requestBody = {id: idPlano};
    return await this.postAuthenticatedData(this.ENDPOINTS.INCREVER_PLANO, tokenAutorizacao, requestBody);
  }

  static async cancelarPlano(tokenAutorizacao) {
    return await this.postAuthenticatedData(this.ENDPOINTS.CANCELAR_PLANO, tokenAutorizacao);
  }
}

export default BackendService;