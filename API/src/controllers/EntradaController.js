const { Registro } = require('../models');


class SaidaController {
    //Entrada e saída
    async registrarEntrada(req, res) {
        try {
            const { idosoId, data, hora, observacoes } = req.body;
            const registro = await Registro.create({
                idosoId,
                tipo: 'entrada',
                data,
                hora,
                observacoes
            });
            return res.status(201).json(registro);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async registrarSaida(req, res) {
        try {
            const { idosoId, data, hora, observacoes } = req.body;
            const registro = await Registro.create({
                idosoId,
                tipo: 'saida',
                data,
                hora,
                observacoes
            });
            return res.status(201).json(registro);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async listarRegistros(req, res) {
        try {
            const { idosoId } = req.params;
            const registros = await Registro.findAll({
                where: { idosoId },
                order: [['data', 'DESC'], ['hora', 'DESC']]
            });
            return res.status(200).json(registros);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}


module.exports = SaidaController();
