const { Idoso, Medicamento, Registro } = require('../models');

class Controller {
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

module.exports = new Controller();
