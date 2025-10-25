const { clientesControllers } = require("..controllers/clientesControllers");
const { produtoModel } = require("../models/produtoModel");

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

    atualizarProduto async (req,res) => {
        try {
        const {idProduto} = req.params;
        const {nomeProduto , precoProduto} = req.body;

        //validação de UUID 
        if(idProduto.length != 36 ) {
            return res.status (400).json({erro: 'id do produto inválido!'});
        }

            const produto = await produtoModel.buscarUm (idProduto);
            if (!produto || produto.length !==1) {
                return res.status (404).json({erro: ' Produto não encontrado!'});
            }
            const produtoAtual = produto [0];
            const nomeAtualizado = nomeProduto ?? produtoAtual.nomeProduto;
            const precoAtualizado = precoProduto ?? produtoAtual.precoProduto;

            await produtoModel.atualizarProduto(idProduto,nomeAtualizado,precoAtualizado);

            res.status (200).json ({message : "produto atualizado com sucesso!"});

        } catch (error) {
        console.error ('Erro ao atualizar produto: ', error);
        res.status (500).json ({error : 'erro ao atualizar produto !'})
    }  
  }

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

