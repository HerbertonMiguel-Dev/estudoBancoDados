// Importa a conexão com o banco de dados do arquivo db.js
const connection = require('../database/db');

// Define a classe GeneroModel
class GeneroModel {

    // Método para listar todos os gêneros
    async listarGeneros() {
        // Retorna uma Promise que executa a consulta no banco de dados
        return new Promise((resolve, reject) => {
            // Executa a consulta SQL para selecionar todos os registros da tabela genero
            connection.query('SELECT * FROM genero', (err, results) => {
                // Se houver um erro, rejeita a Promise com o erro
                if (err) {
                    return reject(err);
                }
                // Caso contrário, resolve a Promise com os resultados da consulta
                resolve(results);
            });
        });
    }

    // Método para cadastrar um novo gênero
    async cadastrarGenero(descricao) {
        // Retorna uma Promise que executa a inserção no banco de dados
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO genero (descricao) VALUES (?)'; // Consulta SQL para inserir um novo registro na tabela genero
            // Executa a consulta SQL passando a descrição como parâmetro
            connection.query(sql, [descricao], (err, results) => {
                // Se houver um erro, rejeita a Promise com o erro
                if (err) {
                    return reject(err);
                }
                // Caso contrário, resolve a Promise com os resultados da inserção
                resolve(results);
            });
        });
    }

    // Método para atualizar um gênero existente
    async atualizarGenero(id, descricao) {
        // Retorna uma Promise que executa a atualização no banco de dados
        return new Promise((resolve, reject) => {
            const sql = 'UPDATE genero SET descricao = ? WHERE id = ?'; // Consulta SQL para atualizar a descrição de um gênero específico
            // Executa a consulta SQL passando a nova descrição e o id como parâmetros
            connection.query(sql, [descricao, id], (err, results) => {
                // Se houver um erro, rejeita a Promise com o erro
                if (err) {
                    return reject(err);
                }
                // Caso contrário, resolve a Promise com os resultados da atualização
                resolve(results);
            });
        });
    }

    // Método para deletar um gênero
    async deletarGenero(id) {
        // Retorna uma Promise que executa a exclusão no banco de dados
        return new Promise((resolve, reject) => {
            const sql = 'DELETE FROM genero WHERE id = ?'; // Consulta SQL para deletar um gênero específico
            // Executa a consulta SQL passando o id como parâmetro
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
}

// Exporta uma instância da classe GeneroModel para ser utilizada em outras partes do aplicativo
module.exports = new GeneroModel();
