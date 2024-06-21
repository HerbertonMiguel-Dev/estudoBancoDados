// const Filme = require('../models/filmeModel');

// const filmesController = {};

// filmesController.getAll = (req, res) => {
//     Filme.getAll((error, results) => {
//         if (error) {
//             res.status(500).send('Erro ao executar a consulta SQL');
//             return;
//         }
//         res.json(results);
//     });
// };

// filmesController.searchByName = (req, res) => {
//     const name = req.params.name;
//     Filme.searchByName(name, (error, results) => {
//         if (error) {
//             res.status(500).send('Erro ao executar a consulta SQL');
//             return;
//         }
//         if (!results.length) {
//             res.json('Nenhum filme encontrado');
//             return;
//         }
//         res.json(results);
//     });
// };

// module.exports = filmesController;

///////////////////////////////////////////////////////////////////////

const FilmeModel = require('../models/filmeModel');

class FilmeController {
    async listarFilmes(req, res) {
        try {
            const filmes = await FilmeModel.listarFilmes();
            res.json(filmes);
        } catch (error) {
            console.error('Erro ao listar filmes:', error);
            res.status(500).json({ error: 'Erro interno ao listar filmes.' });
        }
    }

    async cadastrarFilme(req, res) {
        const { nome, id_genero } = req.body;
        if (!nome || !id_genero) {
            return res.status(400).json({ error: 'Nome e ID do gênero são obrigatórios.' });
        }
        try {
            await FilmeModel.cadastrarFilme(nome, id_genero);
            res.status(201).json({ message: 'Filme cadastrado com sucesso.' });
        } catch (error) {
            console.error('Erro ao cadastrar filme:', error);
            res.status(500).json({ error: 'Erro interno ao cadastrar filme.' });
        }
    }

    async atualizarFilme(req, res) {
        const { id } = req.params;
        const { nome, id_genero } = req.body;
        if (!nome || !id_genero) {
            return res.status(400).json({ error: 'Nome e ID do gênero são obrigatórios.' });
        }
        try {
            await FilmeModel.atualizarFilme(id, nome, id_genero);
            res.status(200).json({ message: 'Filme atualizado com sucesso.' });
        } catch (error) {
            console.error('Erro ao atualizar filme:', error);
            res.status(500).json({ error: 'Erro interno ao atualizar filme.' });
        }
    }

    async deletarFilme(req, res) {
        const { id } = req.params;
        try {
            await FilmeModel.deletarFilme(id);
            res.status(200).json({ message: 'Filme removido com sucesso.' });
        } catch (error) {
            console.error('Erro ao remover filme:', error);
            res.status(500).json({ error: 'Erro interno ao remover filme.' });
        }
    }
}

module.exports = new FilmeController();
