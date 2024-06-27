// Importa o modelo de filme do arquivo filmeModel.js
const FilmeModel = require('../models/filmeModel');

// Define a classe FilmeController
class FilmeController {

    // Método para listar todos os filmes
    async listarFilmes(req, res) {
        try {
            // Chama o método listarFilmes do modelo e aguarda o resultado
            const filmes = await FilmeModel.listarFilmes();
            // Retorna a lista de filmes em formato JSON
            res.json(filmes);
        } catch (error) {
            // Em caso de erro, loga o erro no console e retorna uma resposta de erro
            console.error('Erro ao listar filmes:', error);
            res.status(500).json({ error: 'Erro interno ao listar filmes.' });
        }
    }

    // Método para cadastrar um novo filme
    async cadastrarFilme(req, res) {
        // Extrai o nome e o id_genero do corpo da requisição
        const { nome, id_genero } = req.body;
        // Verifica se o nome e o id_genero foram fornecidos
        if (!nome || !id_genero) {
            return res.status(400).json({ error: 'Nome e ID do gênero são obrigatórios.' });
        }
        try {
            // Chama o método cadastrarFilme do modelo passando o nome e o id_genero
            await FilmeModel.cadastrarFilme(nome, id_genero);
            // Retorna uma resposta de sucesso
            res.status(201).json({ message: 'Filme cadastrado com sucesso.' });
        } catch (error) {
            // Em caso de erro, loga o erro no console e retorna uma resposta de erro
            console.error('Erro ao cadastrar filme:', error);
            res.status(500).json({ error: 'Erro interno ao cadastrar filme.' });
        }
    }

    // Método para atualizar um filme existente
    async atualizarFilme(req, res) {
        // Extrai o id dos parâmetros da requisição e o nome e id_genero do corpo da requisição
        const { id } = req.params;
        const { nome, id_genero } = req.body;
        // Verifica se o nome e o id_genero foram fornecidos
        if (!nome || !id_genero) {
            return res.status(400).json({ error: 'Nome e ID do gênero são obrigatórios.' });
        }
        try {
            // Chama o método atualizarFilme do modelo passando o id, nome e id_genero
            await FilmeModel.atualizarFilme(id, nome, id_genero);
            // Retorna uma resposta de sucesso
            res.status(200).json({ message: 'Filme atualizado com sucesso.' });
        } catch (error) {
            // Em caso de erro, loga o erro no console e retorna uma resposta de erro
            console.error('Erro ao atualizar filme:', error);
            res.status(500).json({ error: 'Erro interno ao atualizar filme.' });
        }
    }

    // Método para deletar um filme
    async deletarFilme(req, res) {
        // Extrai o id dos parâmetros da requisição
        const { id } = req.params;
        try {
            // Chama o método deletarFilme do modelo passando o id
            await FilmeModel.deletarFilme(id);
            // Retorna uma resposta de sucesso
            res.status(200).json({ message: 'Filme removido com sucesso.' });
        } catch (error) {
            // Em caso de erro, loga o erro no console e retorna uma resposta de erro
            console.error('Erro ao remover filme:', error);
            res.status(500).json({ error: 'Erro interno ao remover filme.' });
        }
    }
}

// Exporta uma instância da classe FilmeController para ser utilizada em outras partes do aplicativo
module.exports = new FilmeController();
