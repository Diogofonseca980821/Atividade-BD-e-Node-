const express = require('express')
const cookieParser = require("cookie-parser");
require('dotenv').config();
const app = express()
const {produtoRoutes}= require("./src/routes/produtoRoutes");
const {clienteRoutes} = require('./src/routes/clienteRoutes');
// const {clienteRoutes } = require ("./src/routes/clienteRoutes")
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

//configurar as rotas da aplicaçao

app.use('/', produtoRoutes);
//app.use ('/' , produtoRoutes ) // busca todas as routes que tem produtos routes 
app.use('/', clienteRoutes);
// app.use ('/' , clienteRoutes) // busca todas as routes que tem client routes
app.listen(PORT, () => {
    console.log(` Servidor rodando em http://localhost:${PORT}`)
});