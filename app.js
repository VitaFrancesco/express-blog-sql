const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;

const postsRouter = require('./router/posts');
const errorsHandler = require('./middleware/errorsHandler');
const notFound = require('./middleware/notFound');

app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Pagina iniziale');
});
app.use('/posts', postsRouter);

app.use(errorsHandler);
app.use(notFound);

app.listen(port, () => {
    console.log('Server in ascolto sulla porta ' + port);
});