const express = require('express')
const app = express()
const { produtoRoutes } = require("./src/routes/produtoRoutes")
// const {clienteRoutes } = require ("./src/routes/clienteRoutes")
const PORT = 8081;

app.use(express.json())

//configurar as rotas da aplicaçao
app.use('/', produtoRoutes)// busca todas as routes que tem produtos routes 
// app.use ('/' , clienteRoutes) // busca todas as routes que tem client routes
app.listen(PORT, () => {
    console.log(` Servidor rodando em http://localhost:${PORT}`)
})