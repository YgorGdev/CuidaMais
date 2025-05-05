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

  async deletarMedicamentos(req, res) {
    try {
        const { id } = req.params;
        
        const medicamento = await Medicamento.findByPk(id);
        
        if (!medicamento) {
            return res.status(404).json({ error: 'Medicamento não encontrado' });
        }

        await medicamento.destroy();
        return res.status(200).json({ message: 'Medicamento deletado com sucesso' }); 
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
  }
}

module.exports = MedicamentoController();
