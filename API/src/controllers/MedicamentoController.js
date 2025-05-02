const { Medicamento } = require('../models');
    
    
class MedicamentoController {
      //Medicamentos
    async adicionarMedicamento(req, res) {
      try {
          const { idosoId, nome, dosagem, horario, instrucoes } = req.body;
          const medicamento = await Medicamento.create({
              idosoId,
              nome,
              dosagem,
              horario,
              instrucoes
          });
          return res.status(201).json(medicamento);
      } catch (error) {
          return res.status(400).json({ error: error.message });
      }
  }

  async listarMedicamentos(req, res) {
      try {
          const { idosoId } = req.params;
          const medicamentos = await Medicamento.findAll({
              where: { idosoId }
          });
          return res.status(200).json(medicamentos);
      } catch (error) {
          return res.status(400).json({ error: error.message });
      }
  }
}

module.exports = MedicamentoController();
