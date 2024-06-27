// Importa o modelo de gênero do arquivo generoModel.js
const generoModel = require('../models/generoModel');

// Define a classe GeneroController
class GeneroController {

    // Método para listar todos os gêneros
    async listarGeneros(req, res) {
        try {
            // Chama o método listarGeneros do modelo e aguarda o resultado
            const generos = await generoModel.listarGeneros();
            // Retorna a lista de gêneros em formato JSON
            res.json(generos);
        } catch (error) {
            // Em caso de erro, loga o erro no console e retorna uma resposta de erro
            console.error('Erro ao listar gêneros:', error);
            res.status(500).json({ error: 'Erro interno ao listar gêneros.' });
        }
    }

    // Método para cadastrar um novo gênero
    async cadastrarGenero(req, res) {
        // Extrai a descrição do gênero do corpo da requisição
        const { descricao } = req.body;
        try {
            // Chama o método cadastrarGenero do modelo passando a descrição
            await generoModel.cadastrarGenero(descricao);
            // Retorna uma resposta de sucesso
            res.status(201).json({ message: 'Gênero cadastrado com sucesso.' });
        } catch (error) {
            // Em caso de erro, loga o erro no console e retorna uma resposta de erro
            console.error('Erro ao cadastrar gênero:', error);
            res.status(500).json({ error: 'Erro interno ao cadastrar gênero.' });
        }
    }

    // Método para atualizar um gênero existente
    async atualizarGenero(req, res) {
        // Extrai o id dos parâmetros da requisição e a descrição do corpo da requisição
        const { id } = req.params;
        const { descricao } = req.body;
        try {
            // Chama o método atualizarGenero do modelo passando o id e a descrição
            await generoModel.atualizarGenero(id, descricao);
            // Retorna uma resposta de sucesso
            res.status(200).json({ message: 'Gênero atualizado com sucesso.' });
        } catch (error) {
            // Em caso de erro, loga o erro no console e retorna uma resposta de erro
            console.error('Erro ao atualizar gênero:', error);
            res.status(500).json({ error: 'Erro interno ao atualizar gênero.' });
        }
    }

    // Método para deletar um gênero
    async deletarGenero(req, res) {
        // Extrai o id dos parâmetros da requisição
        const { id } = req.params;
        try {
            // Chama o método deletarGenero do modelo passando o id
            await generoModel.deletarGenero(id);
            // Retorna uma resposta de sucesso
            res.status(200).json({ message: 'Gênero removido com sucesso.' });
        } catch (error) {
            // Em caso de erro, loga o erro no console e retorna uma resposta de erro
            console.error('Erro ao remover gênero:', error);
            res.status(500).json({ error: 'Erro interno ao remover gênero.' });
        }
    }
}

// Exporta uma instância da classe GeneroController para ser utilizada em outras partes do aplicativo
module.exports = new GeneroController();
