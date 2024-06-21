const connectiondb = require('../database/db');

class FilmeModel {
    listarFilmes() {
        return new Promise((resolve, reject) => {
            connectiondb.query('SELECT * FROM filmes', (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
    }

    cadastrarFilme(nome, id_genero) {
        return new Promise((resolve, reject) => {
            connectiondb.query('INSERT INTO filmes (NOME, ID_GENERO) VALUES (?, ?)', [nome, id_genero], (err, results) => {
                if (err) {
                    console.log('Erro ao executar o script sql');
                    reject(err);
                }else{
                resolve(results);
                }
            });
        });
    }

    atualizarFilme(id, nome, id_genero) {
        return new Promise((resolve, reject) => {
            const sql = 'UPDATE filmes SET NOME = ?, ID_GENERO = ? WHERE ID = ?';
            connectiondb.query(sql, [nome, id_genero, id], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
    }

    deletarFilme(id) {
        return new Promise((resolve, reject) => {
            const sql = 'DELETE FROM filmes WHERE ID = ?';
            connectiondb.query(sql, [id], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
    }
}

module.exports = new FilmeModel();
