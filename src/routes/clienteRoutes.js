const express = require ('express')
const router = express.Router()
const { clientController } = require ('../controllers')
const { produtoRoutes } = require('./produtoRoutes')

// Get Clientes -> listar clientes 
 router.get('/clientes', clientController.listarClientes)
// Post Clientews -> Criar um novo cliente
router.post('/clientes' , clientController. criarProduto)
// ao exportar temos que dar um nome 
module.exports = {
    produtoRoutes : router
    
}