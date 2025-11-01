const express = require ('express')
const router = express.Router()
const { clienteController } = require ('../controllers')
 const {produtoRoutes} = require('./produtoRoutes')

// Get Clientes -> listar clientes 
 router.get('/clientes', clienteController.listarClientes)
// Post Clientes -> Criar um novo cliente
router.post('/clientes' , clienteController. criarProduto)
// ao exportar temos que dar um nome 
module.exports = {
    produtoRoutes : router
    
}