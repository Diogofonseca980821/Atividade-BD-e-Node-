const { produtoModel } = require("../models/produtoModel")

const produtoController = {
    //funçao listar produtos

    //-------------------------
    //LISTAR TODOS OS PRODUTOS
    //GET /produtos
    //-------------------------
    listarProdutos: async (req, res) => { //aqui no controller ele controlas os endpoint
        try {
            const produtos = await produtoModel.buscarTodos()

            res.status(200).json(produtos)
        } catch (error) {
            console.error('Erro ao listar produtos: ', error)
            res.status(500).json({ error: "Erro ao buscar produtos" })
        }
    },

    /* 
    ---------------------
    CRIAR UM NOVO PRODUTO
    POST /produtos

    {
        "nomeProduto": "nome",
        "precoProduto": 0.00
    }
    ---------------------
    */

    criarProduto: async (req, res) => {
        try {
            const { nomeProduto, precoProduto } = req.body

            if (nomeProduto == undefined || precoProduto == undefined || isNaN(precoProduto)) {
                return res.status(400).json({
                    erro: 'Campos obrigatorios nao preenchidos!'
                })
            }

            await produtoModel.inserirProduto(nomeProduto, precoProduto)

            res.status(201).json({
                message: 'Produto cadastrado com sucesso!'
            })
        } catch (error) {
            console.error('Erro ao cadastrar produto:', error)
            res.status(500).json({
                error: ('Erro ao cadastrar produto!' , error)
            })
        }
    }
}

module.exports = {
    produtoController
}