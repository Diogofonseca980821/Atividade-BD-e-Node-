const { clientesControllers } = require("..controllers/clientesControllers");

inserirProduto: async

const clientesControllers = {
    // listar  clientes 
    listarClientes: async (req, res) => {
        try {
            const clientes = await clientModels.buscarTodos();

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
            const { nomeCliente, cpfCliente } = req.body;
            if (nomeCliente == undefined || cpfCliente == undefined || isNaN(cpfCliente)) {

                return res.status(400).json({
                    erro: 'campos obrigatorios nao preenchidos!  '
                })

            }
            await clientesModels.inserirCliente(nomeCliente, cpfCliente)
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
