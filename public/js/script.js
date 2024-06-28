document.addEventListener('DOMContentLoaded', () => {
    // Seleciona os elementos do formulário e as listas do DOM
    const generoForm = document.getElementById('generoForm');
    const filmeForm = document.getElementById('filmeForm');
    const generosList = document.getElementById('generosList');
    const filmesList = document.getElementById('filmesList');
    const filmeGeneroSelect = document.getElementById('filmeGenero');
    const buscarFilmesAtorForm = document.getElementById('buscarFilmesAtorForm');
    const filmesAtorList = document.getElementById('filmesAtorList');
    const alertModal = document.getElementById('alertModal');
    const alertMessage = document.getElementById('alertMessage');
    const closeButton = document.querySelector('.close-button');
    

    let generoMap = new Map();

    // Mensagens do modal de alerta
    const alertMessages = {
        generoAdicionado: 'Gênero adicionado com sucesso!',
        generoAtualizado: 'Gênero atualizado com sucesso!',
        generoExcluido: 'Gênero excluído com sucesso!',
        erroSalvarGenero: 'Erro ao salvar gênero',
        erroExcluirGenero: 'Erro ao excluir gênero',
        filmeAdicionado: 'Filme adicionado com sucesso!',
        filmeAtualizado: 'Filme atualizado com sucesso!',
        filmeExcluido: 'Filme excluído com sucesso!',
        erroSalvarFilme: 'Erro ao salvar filme',
        erroExcluirFilme: 'Erro ao excluir filme',
    };

    // Função para mostrar o modal de alerta
    const showAlert = (messageKey) => {
        alertMessage.textContent = alertMessages[messageKey];
        alertModal.style.display = 'block';
    };

    closeButton.onclick = () => {
        alertModal.style.display = 'none';
    };

    window.onclick = (event) => {
        if (event.target == alertModal) {
            alertModal.style.display = 'none';
        }
    };

    // Função para carregar gêneros da API
    const loadGeneros = async () => {
        try {
            const response = await fetch('/generos/listarGeneros'); // Faz uma requisição para listar gêneros
            if (!response.ok) {
                throw new Error('Erro ao carregar gêneros'); // Lança um erro se a requisição falhar
            }
            const generos = await response.json(); // Converte a resposta para JSON
            generosList.innerHTML = ''; // Limpa a lista de gêneros
            filmeGeneroSelect.innerHTML = '<option value="">Selecione um gênero</option>'; // Adiciona uma opção padrão no select de gêneros
            generoMap = new Map(generos.map(genero => [genero.id, genero.descricao]));
            generos.forEach(genero => {
                // Adiciona gêneros à lista de gêneros
                const li = document.createElement('li');
                li.textContent = genero.descricao;
                li.dataset.id = genero.id;
                
                // Botão Editar
                const btnEditar = document.createElement('button');
                btnEditar.textContent = 'Editar';
                btnEditar.classList.add('btn-editar'); // Adiciona a classe para estilização CSS
                btnEditar.onclick = () => editGenero(genero.id, genero.descricao);
                li.appendChild(btnEditar);
                
                // Botão Excluir
                const btnExcluir = document.createElement('button');
                btnExcluir.textContent = 'Excluir';
                btnExcluir.classList.add('btn-excluir'); // Adiciona a classe para estilização CSS
                btnExcluir.onclick = () => deleteGenero(genero.id);
                li.appendChild(btnExcluir);
                
                generosList.appendChild(li);
    
                // Adiciona gêneros ao select do formulário de filmes
                const option = document.createElement('option');
                option.value = genero.id;
                option.textContent = genero.descricao;
                filmeGeneroSelect.appendChild(option);
            });
        } catch (error) {
            console.error('Erro ao carregar gêneros:', error); // Loga o erro no console
        }
    };

    // Função para carregar filmes da API
    const loadFilmes = async () => {
        try {
            const response = await fetch('/filmes/listarFilmes'); // Faz uma requisição para listar filmes
            if (!response.ok) {
                throw new Error('Erro ao carregar filmes'); // Lança um erro se a requisição falhar
            }
            const filmes = await response.json(); // Converte a resposta para JSON
            filmesList.innerHTML = ''; // Limpa a lista de filmes
            filmes.forEach(filme => {
                // Adiciona filmes à lista de filmes
                const li = document.createElement('li');
                const generoNome = generoMap.get(filme.id_genero) || 'Gênero desconhecido';
                li.textContent = `${filme.nome} (Gênero: ${generoNome})`;
                li.dataset.id = filme.id;
                
                // Botão Editar
                const btnEditar = document.createElement('button');
                btnEditar.textContent = 'Editar';
                btnEditar.classList.add('btn-editar'); // Adiciona a classe para estilização CSS
                btnEditar.onclick = () => editFilme(filme.id, filme.nome, filme.id_genero);
                li.appendChild(btnEditar);
                
                // Botão Excluir
                const btnExcluir = document.createElement('button');
                btnExcluir.textContent = 'Excluir';
                btnExcluir.classList.add('btn-excluir'); // Adiciona a classe para estilização CSS
                btnExcluir.onclick = () => deleteFilme(filme.id);
                li.appendChild(btnExcluir);
                
                filmesList.appendChild(li);
            });
        } catch (error) {
            console.error('Erro ao carregar filmes:', error); // Loga o erro no console
        }
    };

    // Evento de submit do formulário de gênero
    generoForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Previne o comportamento padrão do formulário
        const id = document.getElementById('generoId').value;
        const descricao = document.getElementById('generoDescricao').value;

        try {
            if (id) {
                // Se o ID estiver presente, atualiza o gênero existente
                await fetch(`/generos/atualizarGenero/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ descricao }),
                });
                showAlert('generoAtualizado');
            } else {
                // Caso contrário, cria um novo gênero
                await fetch('/generos/adicionarGenero', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ descricao }),
                });
                showAlert('generoAdicionado');
            }

            // Reseta os campos do formulário de gênero
            document.getElementById('generoId').value = '';
            document.getElementById('generoDescricao').value = '';
            loadGeneros(); // Recarrega a lista de gêneros
        } catch (error) {
            showAlert('erroSalvarGenero');
        }
    });

    // Evento de submit do formulário de filme
    filmeForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Previne o comportamento padrão do formulário
        const id = document.getElementById('filmeId').value;
        const nome = document.getElementById('filmeNome').value;
        const id_genero = document.getElementById('filmeGenero').value;

        try {
            if (id) {
                // Se o ID estiver presente, atualiza o filme existente
                await fetch(`/filmes/atualizarFilme/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ nome, id_genero }),
                });
                showAlert('filmeAtualizado');
            } else {
                // Caso contrário, cria um novo filme
                await fetch('/filmes/adicionarFilme', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ nome, id_genero }),
                });
                showAlert('filmeAdicionado');
            }

            // Reseta os campos do formulário de filme
            document.getElementById('filmeId').value = '';
            document.getElementById('filmeNome').value = '';
            document.getElementById('filmeGenero').value = '';
            loadFilmes(); // Recarrega a lista de filmes
        } catch (error) {
            showAlert('erroSalvarFilme');
        }
    });

    // Funções de edição e exclusão de gênero
    window.editGenero = (id, descricao) => {
        document.getElementById('generoId').value = id;
        document.getElementById('generoDescricao').value = descricao;
    };

    window.deleteGenero = async (id) => {
        try {
            await fetch(`/generos/excluirGenero/${id}`, {
                method: 'DELETE',
            });
            showAlert('generoExcluido');
            loadGeneros(); // Recarrega a lista de gêneros após exclusão
        } catch (error) {
            showAlert('erroExcluirGenero');
        }
    };

    // Funções de edição e exclusão de filme
    window.editFilme = (id, nome, id_genero) => {
        document.getElementById('filmeId').value = id;
        document.getElementById('filmeNome').value = nome;
        document.getElementById('filmeGenero').value = id_genero;
    };

    window.deleteFilme = async (id) => {
        try {
            await fetch(`/filmes/excluirFilme/${id}`, {
                method: 'DELETE',
            });
            showAlert('filmeExcluido');
            loadFilmes(); // Recarrega a lista de filmes após exclusão
        } catch (error) {
            showAlert('erroExcluirFilme');
        }
    };

     // Evento de submit do formulário de busca por ator
    buscarFilmesAtorForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const nomeAtor = document.getElementById('atorNome').value;
        try {
            const response = await fetch(`/filmes/listarFilmesPorAtor/${nomeAtor}`);
            if (!response.ok) {
                throw new Error('Erro ao buscar filmes por ator');
            }
            const filmes = await response.json();
            filmesAtorList.innerHTML = '';
            filmes.forEach(filme => {
                const li = document.createElement('li');
                li.textContent = filme.nome;
                filmesAtorList.appendChild(li);
            });
        } catch (error) {
            console.error('Erro ao buscar filmes por ator:', error);
        }
    });

    // Carrega os dados iniciais
    loadGeneros();
    loadFilmes();
});