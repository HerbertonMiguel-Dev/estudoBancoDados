// const express = require('express');
// const path = require('path');
// const app = express();
// const port = 3000;

// const filmesRoutes = require('./routes/filmesRoutes');
// const generosRoutes = require('./routes/generosRoutes');

// app.use(express.static('public'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use('/filmes', filmesRoutes);
// app.use('/generos', generosRoutes);

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public/html', 'index.html'));
// }); 

// app.listen(port, () => {
//     console.log(`Aplicação rodando em http://localhost:${port}`);
// });


const express = require('express');
const path = require('path');
const app = express();
const port = 3001;

const filmesRoutes = require('./routes/filmesRoutes');
const generosRoutes = require('./routes/generosRoutes');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Alterado para extended: true
app.use('/filmes', filmesRoutes);
app.use('/generos', generosRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/html', 'index.html')); // Caminho corrigido
});


app.listen(port, () => {
    console.log(`Aplicação rodando em http://localhost:${port}`);
});



