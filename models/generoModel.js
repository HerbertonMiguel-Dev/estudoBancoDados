const connection = require('../database/db');

class GeneroModel {
    listarGeneros() {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM genero', (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
    }

    cadastrarGenero(descricao) {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO genero (DESCRICAO) VALUES (?)';
            connection.query(sql, [descricao], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
    }

    atualizarGenero(id, descricao) {
        return new Promise((resolve, reject) => {
            const sql = 'UPDATE genero SET DESCRICAO = ? WHERE ID = ?';
            connection.query(sql, [descricao, id], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
    }

    deletarGenero(id) {
        return new Promise((resolve, reject) => {
            const sql = 'DELETE FROM genero WHERE ID = ?';
            connection.query(sql, [id], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
    }
}

module.exports = new GeneroModel();
