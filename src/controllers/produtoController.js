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

    atualizarProduto: async (req, res) => {
        try {
            const { idProduto } = req.params;
            const { nomeProduto, precoproduto } = req.body;

            if (idProduto.length != 36) {
                return res.status(400).json({ erros: `id do produto invalido!` });
            }

            const produto = await produtoModel.buscarUm(idProduto);

            if (!produto || produto.length !== 1) {
                return res.status(404).json({ erro: 'Produto nao encontrado' });

            }

            const produtoAtual = produto[0];
            const nomeAtualizado = nomeProduto ?? produtoAtual.
                nomeProduto;
            const precoAtualizado = precoproduto ?? produtoAtual.
                precoproduto;

            await produtoModel.atualizarProduto(idProduto, nomeAtualizado, precoAtualizado);

            res.status(200).json({ message: "produto atualizado com sucesso!" });


        } catch (error) {
            console.error('erro ao atualizar produto:'(error));
            res.status(500).json({ erro: 'Erro inaterno no servidor ao atualizar o produto!' });
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
                error: ('Erro ao cadastrar produto!', error)
            })
        }
    },

    deletarProduto: async (req, res) => {
        try {
            const { idProduto } = req.params;
            
            if (idProduto.length != 36) {
                return res.status(400).json({ erros: `id do produto invalido!` });
            }

            const produto = await produtoModel.buscarUm(idProduto);

            if (!produto || produto.length !== 1) {
                return res.status(404).json({ erro: 'Produto nao encontrado' });

            }


            await produtoModel.deletarProduto(idProduto);
            res.status(200).json({ message: "produto deletado com sucesso!" });

        } catch (error) {
            console.error('Erro ao deletar o produto: ', error);
            res.status(500).json({ erro: 'Erro interno no servidor ao deletar o produto!' });

        }
    }
}

module.exports = {
    produtoController
};