-- criação do banco de dados locadora
create database locadora;

-- selecionar o banco de dados locadora
use locadora;

-- criação da tabela genero
create table genero (
    id int auto_increment primary key,
    descricao varchar(255) not null
);

-- criação da tabela filmes
create table filmes (
    id int auto_increment primary key,
    nome varchar(255) not null,
    ano_lancamento date not null, -- Adicionando o campo ano de lançamento do tipo data
    id_genero int,
    foreign key (id_genero) references genero(id)
);

-- criação da tabela atores
create table atores (
    id int auto_increment primary key,
    nome varchar(255) not null
);

-- criação da tabela diretores
create table diretores (
    id int auto_increment primary key,
    nome varchar(255) not null
);

-- criação da tabela filmes_atores
create table filmes_atores (
    id_filme int,
    id_ator int,
    foreign key (id_filme) references filmes(id),
    foreign key (id_ator) references atores(id),
    primary key (id_filme, id_ator)
);

-- criação da tabela filmes_diretores
create table filmes_diretores (
    id_filme int,
    id_diretor int,
    foreign key (id_filme) references filmes(id),
    foreign key (id_diretor) references diretores(id),
    primary key (id_filme, id_diretor)
);

-- inserção de alguns dados na tabela generos
insert into genero (descricao) values 
('ação'),
('comédia'),
('drama'),
('ficção científica'),
('terror');

-- inserção de alguns dados na tabela filmes
insert into filmes (nome, ano_lancamento, id_genero) values 
('mad max: estrada da fúria', '2015-05-14', 1),
('john wick', '2014-10-24', 1),
('os mercenários', '2010-08-13', 1),
('velozes e furiosos', '2001-06-22', 1),
('duro de matar', '1988-07-15', 1),
('se beber, não case', '2009-06-05', 2),
('as branquelas', '2004-06-23', 2),
('gente grande', '2010-06-25', 2),
('ted', '2012-06-29', 2),
('o âncora: a lenda de ron burgundy', '2004-07-09', 2),
('um sonho de liberdade', '1994-09-23', 3),
('a vida é bela', '1997-12-20', 3),
('forrest gump', '1994-07-06', 3),
('clube da luta', '1999-10-15', 3),
('o poderoso chefão', '1972-03-24', 3),
('interestelar', '2014-11-07', 4),
('matrix', '1999-03-31', 4),
('blade runner 2049', '2017-10-06', 4),
('a chegada', '2016-11-11', 4),
('star wars: o despertar da força', '2015-12-18', 4),
('invocação do mal', '2013-07-19', 5),
('o exorcista', '1973-12-26', 5),
('halloween', '1978-10-25', 5),
('o iluminado', '1980-05-23', 5),
('sexta-feira 13', '1980-05-09', 5);

-- inserção de alguns dados na tabela atores
insert into atores (nome) values
('tom hardy'),
('keanu reeves'),
('sylvester stallone'),
('vin diesel'),
('bruce willis');

-- inserção de alguns dados na tabela diretores
insert into diretores (nome) values
('george miller'),
('chad stahelski'),
('simon west'),
('justin lin'),
('john mctiernan');

-- Inserção de 20 valores específicos na tabela filmes_atores
INSERT INTO filmes_atores (id_filme, id_ator) VALUES
(1, 1), (1, 3), (1, 5),
(2, 2), (2, 4), (2, 1),
(3, 3), (3, 2), (3, 5),
(4, 4), (4, 1), (4, 2),
(5, 5), (5, 3), (5, 4),
(6, 1), (6, 4), (6, 5),
(7, 2), (7, 3), (7, 1);

-- Inserção de 20 valores específicos na tabela filmes_diretores
INSERT INTO filmes_diretores (id_filme, id_diretor) VALUES
(1, 1), (2, 2), (3, 3), (4, 4), (5, 5),
(6, 1), (7, 2), (8, 3), (9, 4), (10, 5),
(11, 1), (12, 2), (13, 3), (14, 4), (15, 5),
(16, 1), (17, 2), (18, 3), (19, 4), (20, 5);
