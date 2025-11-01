const express = require('express')
const app = express()
const { produtoRoutes } = require("./src/routes/produtoRoutes")
const {clieteRoutes } = require ("./src/controllers/clientesControllers")
const PORT = 80

app.use(express.json())

//configurar as rotas da aplicaçao
app.use('/', produtoRoutes)// busca todas as routes que tem produtos routes 
app.use ('/' , clieteRoutes) // busca todas as routes que tem client routes
app.listen(PORT, () => {
    console.log(` Servidor rodando em http://localhost:${PORT}`)
})