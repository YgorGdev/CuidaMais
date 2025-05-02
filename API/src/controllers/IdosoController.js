const { Idoso } = require('../models');


class IdosoController {
  //Criar idosos
  async criarIdoso(req, res) {
      try {
          const { nome, idade, responsavel, telefone, endereco } = req.body;
          const idoso = await Idoso.create({
              nome,
              idade,
              responsavel,
              telefone,
              endereco
          });
          return res.status(201).json(idoso);
      } catch (error) {
          return res.status(400).json({ error: error.message });
      }
  }

  async listarIdosos(req, res) {
      try {
          const idosos = await Idoso.findAll();
          return res.status(200).json(idosos);
      } catch (error) {
          return res.status(400).json({ error: error.message });
      }
  }
}

module.exports = IdosoController();