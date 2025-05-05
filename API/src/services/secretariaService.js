const Secretaria = require('../models/Secretaria');

class SecretariaService {
  async criarSecretaria(data) {
    return await Secretaria.create(data);
  }

  async listarSecretarias() {
    return await Secretaria.findAll();
  }

  async buscarPorId(id) {
    return await Secretaria.findByPk(id);
  }

  async atualizar(id, dados) {
    const secretaria = await this.buscarPorId(id);
    if (!secretaria) return null;
    return await secretaria.update(dados);
  }

  async deletar(id) {
    const secretaria = await this.buscarPorId(id);
    if (!secretaria) return null;
    return await secretaria.destroy();
  }
}

module.exports = new SecretariaService();
