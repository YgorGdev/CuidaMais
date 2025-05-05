const SecretariaService = require('../services/secretariaService');

class SecretariaController {
  //funções da secretaria
  async criar(req, res) {
    try {
      const secretaria = await SecretariaService.criarSecretaria(req.body);
      return res.status(201).json(secretaria);
    } catch (err) {
      return res.status(400).json({ erro: 'Erro ao criar secretária', detalhes: err.message });
    }
  }

  async listar(req, res) {
    const secretarias = await SecretariaService.listarSecretarias();
    return res.json(secretarias);
  }

  async buscar(req, res) {
    const secretaria = await SecretariaService.buscarPorId(req.params.id);
    if (!secretaria) return res.status(404).json({ erro: 'Secretária não encontrada' });
    return res.json(secretaria);
  }

  async atualizar(req, res) {
    const secretaria = await SecretariaService.atualizar(req.params.id, req.body);
    if (!secretaria) return res.status(404).json({ erro: 'Secretária não encontrada' });
    return res.json(secretaria);
  }

  async deletar(req, res) {
    const deletada = await SecretariaService.deletar(req.params.id);
    if (!deletada) return res.status(404).json({ erro: 'Secretária não encontrada' });
    return res.status(204).send();
  }
}

module.exports = new SecretariaController();
