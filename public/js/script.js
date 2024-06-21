document.addEventListener('DOMContentLoaded', () => {
    const generoForm = document.getElementById('generoForm');
    const filmeForm = document.getElementById('filmeForm');
    const generosList = document.getElementById('generosList');
    const filmesList = document.getElementById('filmesList');
    const filmeGeneroSelect = document.getElementById('filmeGenero');

    // Função para carregar gêneros
const loadGeneros = async () => {
    try {
        const response = await fetch('/generos/listarGeneros');
        if (!response.ok) {
            throw new Error('Erro ao carregar gêneros');
        }
        const generos = await response.json();
        generosList.innerHTML = '';
        filmeGeneroSelect.innerHTML = '<option value="">Selecione um gênero</option>';
        generos.forEach(genero => {
            // Adicionar gêneros à lista de gêneros
            const li = document.createElement('li');
            li.textContent = genero.DESCRICAO;
            li.dataset.id = genero.ID;
            li.innerHTML += ` <button onclick="editGenero(${genero.ID}, '${genero.DESCRICAO}')">Editar</button>`;
            li.innerHTML += ` <button onclick="deleteGenero(${genero.ID})">Excluir</button>`;
            generosList.appendChild(li);

            // Adicionar gêneros ao select do formulário de filmes
            const option = document.createElement('option');
            option.value = genero.ID;
            option.textContent = genero.DESCRICAO;
            filmeGeneroSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Erro ao carregar gêneros:', error);
    }
};

    // Função para carregar filmes
    const loadFilmes = async () => {
        const response = await fetch('/filmes/listarFilmes');
        const filmes = await response.json();
        filmesList.innerHTML = '';
        filmes.forEach(filme => {
            const li = document.createElement('li');
            li.textContent = `${filme.NOME} (Gênero ID: ${filme.ID_GENERO})`;
            li.dataset.id = filme.ID;
            li.innerHTML += ` <button onclick="editFilme(${filme.ID}, '${filme.NOME}', ${filme.ID_GENERO})">Editar</button>`;
            li.innerHTML += ` <button onclick="deleteFilme(${filme.ID})">Excluir</button>`;
            filmesList.appendChild(li);
        });
    };

    // Evento de submit do formulário de gênero
    generoForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = document.getElementById('generoId').value;
        const descricao = document.getElementById('generoDescricao').value;

        if (id) {
            await fetch(`/generos/atualizarGenero/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ descricao }),
            });
        } else {
            await fetch('/generos/adicionarGenero', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ descricao }),
            });
        }

        document.getElementById('generoId').value = '';
        document.getElementById('generoDescricao').value = '';
        loadGeneros();
    });

    // Evento de submit do formulário de filme
    filmeForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = document.getElementById('filmeId').value;
        const nome = document.getElementById('filmeNome').value;
        const id_genero = document.getElementById('filmeGenero').value;

        if (id) {
            await fetch(`/filmes/atualizarFilme/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nome, id_genero }),
            });
        } else {
            await fetch('/filmes/adicionarFilme', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nome, id_genero }),
            });
        }

        document.getElementById('filmeId').value = '';
        document.getElementById('filmeNome').value = '';
        document.getElementById('filmeGenero').value = '';
        loadFilmes();
    });

    // Funções de edição e exclusão de gênero e filme
    window.editGenero = (id, descricao) => {
        document.getElementById('generoId').value = id;
        document.getElementById('generoDescricao').value = descricao;
    };

    window.deleteGenero = async (id) => {
        await fetch(`/generos/excluirGenero/${id}`, {
            method: 'DELETE',
        });
        loadGeneros();
    };

    window.editFilme = (id, nome, id_genero) => {
        document.getElementById('filmeId').value = id;
        document.getElementById('filmeNome').value = nome;
        document.getElementById('filmeGenero').value = id_genero;
    };

    window.deleteFilme = async (id) => {
        await fetch(`/filmes/excluirFilme/${id}`, {
            method: 'DELETE',
        });
        loadFilmes();
    };

    // Carregar dados iniciais
    loadGeneros();
    loadFilmes();
});
