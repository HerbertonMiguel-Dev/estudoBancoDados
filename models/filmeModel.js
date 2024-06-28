// Importa a conexão com o banco de dados do arquivo db.js
const connection = require('../database/db');

// Define a classe FilmeModel
class FilmeModel {

    // Método para listar todos os filmes
    async listarFilmes() {
        // Retorna uma Promise que executa a consulta no banco de dados
        return new Promise((resolve, reject) => {
            // Executa a consulta SQL para selecionar todos os registros da tabela filmes
            connection.query('SELECT * FROM filmes', (err, results) => {
                // Se houver um erro, rejeita a Promise com o erro
                if (err) {
                    return reject(err);
                }
                // Caso contrário, resolve a Promise com os resultados da consulta
                resolve(results);
            });
        });
    }

    // Método para cadastrar um novo filme
    async cadastrarFilme(nome, id_genero) {
        // Retorna uma Promise que executa a inserção no banco de dados
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO filmes (nome, id_genero) VALUES (?, ?)'; // Consulta SQL para inserir um novo registro na tabela filmes
            // Executa a consulta SQL passando o nome e o id_genero como parâmetros
            connection.query(sql, [nome, id_genero], (err, results) => {
                // Se houver um erro, rejeita a Promise com o erro
                if (err) {
                    return reject(err);
                }
                // Caso contrário, resolve a Promise com os resultados da inserção
                resolve(results);
            });
        });
    }

    // Método para atualizar um filme existente
    async atualizarFilme(id, nome, id_genero) {
        // Retorna uma Promise que executa a atualização no banco de dados
        return new Promise((resolve, reject) => {
            const sql = 'UPDATE filmes SET nome = ?, id_genero = ? WHERE id = ?'; // Consulta SQL para atualizar o nome e o id_genero de um filme específico
            // Executa a consulta SQL passando o novo nome, o novo id_genero e o id do filme como parâmetros
            connection.query(sql, [nome, id_genero, id], (err, results) => {
                // Se houver um erro, rejeita a Promise com o erro
                if (err) {
                    return reject(err);
                }
                // Caso contrário, resolve a Promise com os resultados da atualização
                resolve(results);
            });
        });
    }

    // Método para deletar um filme
    async deletarFilme(id) {
        // Retorna uma Promise que executa a exclusão no banco de dados
        return new Promise((resolve, reject) => {
            const sql = 'DELETE FROM filmes WHERE id = ?'; // Consulta SQL para deletar um filme específico
            // Executa a consulta SQL passando o id do filme como parâmetro
            connection.query(sql, [id], (err, results) => {
                // Se houver um erro, rejeita a Promise com o erro
                if (err) {
                    return reject(err);
                }
                // Caso contrário, resolve a Promise com os resultados da exclusão
                resolve(results);
            });
        });
    }

  // Método para listar filmes por ator
  async listarFilmesPorAtor(nomeAtor) {
    return new Promise((resolve, reject) => {
      const sql = `
                SELECT filmes.*
                FROM filmes
                JOIN filmes_atores ON filmes.id = filmes_atores.id_filme
                JOIN atores ON filmes_atores.id_ator = atores.id
                WHERE atores.nome = ?
            `;
      connection.query(sql, [nomeAtor], (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
  }
 
}

// Exporta uma instância da classe FilmeModel para ser utilizada em outras partes do aplicativo
module.exports = new FilmeModel();


 