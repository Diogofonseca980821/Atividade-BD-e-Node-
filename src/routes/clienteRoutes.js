const express = require('express');
const router = express.Router();
const { clientesControllers } = require('../controllers/clientesController');
const { verify } = require("../middlewares/authMiddlewares");
const { authController } = require("../controllers/authController");

router.post("/clientes/login", authController.clienteLogin);

// Get Clientes -> listar clientes 
router.get('/clientes', verify.cliente, clientesControllers.listarClientes);
// Post Clientes -> Criar um novo cliente
router.post('/clientes', clientesControllers.criarCliente);
// ao exportar temos que dar um nome 
module.exports = { clienteRoutes: router }