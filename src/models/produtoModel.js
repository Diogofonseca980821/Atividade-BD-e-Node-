// importar a conexao com o banco de dados e o tipo de dados SQL
//utilizando descontruçao
const { query } = require("mssql")
const { sql, getConnetion } = require("../config/db")
const { ReturnStatusToken } = require("tedious/lib/token/token")

const produtoModel = { //objeto produtoModel
    //metodo
    buscarTodos: async () => {
        try {
            const pool = await getConnetion() //coletando uma funçao

            let querySQL = "SELECT * FROM Produtos"//comando para buscar todos os dados no DB SQL

            const result = await pool.request().query(querySQL)

            return result.recordset; //retorna uma lista 
        } catch (error) {
            console.error('Erro ao buscar produtos:', error)
            //passar o erro pro controller, ele que tem que ficar vendo os erros
            throw error
        }
    },

    buscarUm: async (idProduto) => {
        try {

            const pool = await getConnetion();

            const querySQL = 'SELECT * FROM  Produtos WHERE idProduto = @idProduto';

            const result = await  pool.request()
                .input('idProduto', sql.UniqueIdentifier, idProduto)
                .query(querySQL);

                 return result.recordset;


        } catch (error) {
    console,error('Erro ao buscar o produto: ' , error)
}
    },
    
    
    inserirProduto: async (nomeProduto, precoProduto) => {
    try {
        const pool = await getConnetion() //pegando uma conexao 
        
        let querySQL = 'INSERT INTO produtos (nomeProduto, precoProduto) VALUES (@nomeProduto, @precoProduto)';

        // primeiro argumento é o nome da variavel
        // depois o tipo da variavel
        //
        await pool.request()
        .input('nomeProduto', sql.VarChar(100),
        nomeProduto)
        .input('precoProduto', sql.Decimal(10, 2),
        precoProduto)
        .query(querySQL)//passando a query para executar o comando 
    } catch (error) {
        console.error('Erro ao inserir produto: ', error)
        throw error; // passar para quem vai resolver esse erro 
    }
},
    atualizarProduto:  async (idProduto, nomeProduto, precoProduto ) =>
        try
        {
        const pool = await getConnetion ();
        // EVITAR SQL INJECTION
        const querySQL = `
            UPDATE Produtos 
            SET nomeProduto = @nomeProduto,
                precoProduto = @precoProduto
            WHERE idProduto = @idProduto
        `
        await pool.request ()
            .input('nomeProduto' , sql.VarChar (100) , nomeProduto)
            .input ('precoProduto' , sql.Decimal (10,2),precoProduto)
            
            .input ('precoProduto ' , sql.UniqueIdentifier, idProduto)
            .query (querySQL);

    } catch (error) {
        console.error ('Erro ao atualizar produto : 'error);
        throw error;
    }






    module.exports = {
        produtoModel
    };