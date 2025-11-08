const { clientesModel } = require("../models/clienteModels");
const bycrypt = require("bcrypt");

const clientesControllers = {
    // listar  clientes 
    listarClientes: async (req, res) => {
        try {
            const clientes = await clientesModel.buscarTodos();

            res.status(200).json(clientes);
        } catch (error) {
            console.error('erro ao listar clientes : ', error);

            res.status(500).json({ error: "Erro ao buscar clientes " });
        }
    },
    /*
      ----------------
      Criar um novo cliente
      Post / Clientes
      {
        "nome": "nome",
        "cpf": "273409274092"
      }
      ----------------
      */
    criarCliente: async (req, res) => {
        try {
            const { nomeCliente, cpfCliente, emailCliente, senhaCliente } = req.body;
            if (nomeCliente == undefined || cpfCliente == undefined || isNaN(cpfCliente) || emailCliente == undefined || senhaCliente == undefined) {

                return res.status(400).json({
                    erro: 'campos obrigatorios nao preenchidos!  '
                })

            }

            
            const saltRounds = 10;
            
            const senhaCriptografada = bycrypt.hashSync (senhaCliente , saltRounds);

            await clientesModel.inserirClientes(nomeCliente, cpfCliente, emailCliente, senhaCriptografada)
            res.status(201).json({
                message: 'cliente cadastrado com sucesso! '
            })

        } catch (error) {
            console.error('erro ao cadastrar cliente!: ', error)
            res.status(500).json({
                error: ('erro ao cadastrar cliente!', error)
            })
        }
    }
}

module.exports = { clientesControllers }
