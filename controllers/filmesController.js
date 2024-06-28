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
      console.error("Erro ao listar filmes:", error);
      res.status(500).json({ error: "Erro interno ao listar filmes." });
    }
  }

  // No método cadastrarFilme:
  async cadastrarFilme(req, res) {
    const { nome, id_genero, ano_lancamento } = req.body;
    if (!nome || !id_genero || !ano_lancamento) {
      return res.status(400).json({
        error: "Nome, ID do gênero e ano de lançamento são obrigatórios.",
      });
    }
    try {
      await FilmeModel.cadastrarFilme(nome, id_genero, ano_lancamento);
      res.status(201).json({ message: "Filme cadastrado com sucesso." });
    } catch (error) {
      console.error("Erro ao cadastrar filme:", error);
      res.status(500).json({ error: "Erro interno ao cadastrar filme." });
    }
  }

  // No método atualizarFilme, se necessário:
  async atualizarFilme(req, res) {
    const { id } = req.params;
    const { nome, id_genero, ano_lancamento } = req.body;
    if (!nome || !id_genero || !ano_lancamento) {
      return res
        .status(400)
        .json({
          error: "Nome, ID do gênero e ano de lançamento são obrigatórios.",
        });
    }
    try {
      await FilmeModel.atualizarFilme(id, nome, id_genero, ano_lancamento);
      res.status(200).json({ message: "Filme atualizado com sucesso." });
    } catch (error) {
      console.error("Erro ao atualizar filme:", error);
      res.status(500).json({ error: "Erro interno ao atualizar filme." });
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
      res.status(200).json({ message: "Filme removido com sucesso." });
    } catch (error) {
      // Em caso de erro, loga o erro no console e retorna uma resposta de erro
      console.error("Erro ao remover filme:", error);
      res.status(500).json({ error: "Erro interno ao remover filme." });
    }
  }

  // Método para listar filmes por ator
  async listarFilmesPorAtor(req, res) {
    const { nomeAtor } = req.params;
    try {
      const filmes = await FilmeModel.listarFilmesPorAtor(nomeAtor);
      res.json(filmes);
    } catch (error) {
      console.error("Erro ao listar filmes por ator:", error);
      res
        .status(500)
        .json({ error: "Erro interno ao listar filmes por ator." });
    }
  }
}

// Exporta uma instância da classe FilmeController para ser utilizada em outras partes do aplicativo
module.exports = new FilmeController();
