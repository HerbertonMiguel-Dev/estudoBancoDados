const generoModel = require('../models/generoModel');

class GeneroController {
    async listarGeneros(req, res) {
        try {
            const generos = await generoModel.listarGeneros();
            res.json(generos);
        } catch (error) {
            console.error('Erro ao listar gêneros:', error);
            res.status(500).json({ error: 'Erro interno ao listar gêneros.' });
        }
    }

    async cadastrarGenero(req, res) {
        const { descricao } = req.body;
        try {
            await generoModel.cadastrarGenero(descricao);
            res.status(201).json({ message: 'Gênero cadastrado com sucesso.' });
        } catch (error) {
            console.error('Erro ao cadastrar gênero:', error);
            res.status(500).json({ error: 'Erro interno ao cadastrar gênero.' });
        }
    }

    async atualizarGenero(req, res) {
        const { id } = req.params;
        const { descricao } = req.body;
        try {
            await generoModel.atualizarGenero(id, descricao);
            res.status(200).json({ message: 'Gênero atualizado com sucesso.' });
        } catch (error) {
            console.error('Erro ao atualizar gênero:', error);
            res.status(500).json({ error: 'Erro interno ao atualizar gênero.' });
        }
    }

    async deletarGenero(req, res) {
        const { id } = req.params;
        try {
            await generoModel.deletarGenero(id);
            res.status(200).json({ message: 'Gênero removido com sucesso.' });
        } catch (error) {
            console.error('Erro ao remover gênero:', error);
            res.status(500).json({ error: 'Erro interno ao remover gênero.' });
        }
    }
}

module.exports = new GeneroController();
