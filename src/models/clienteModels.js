// importando a conexao com  o banco de dados
// e o tipo de dados da pasta config/db 
//utilizando descontruçao
const { sql, getConnetion} =  require("../config/db")

// objeto clienteModel
const clienteModel = {

    buscarTodos: async () => { 
        try {
            const pool = await getConnetion()

           
            let querySQL = "SELECT * FROM clientes"

            const result =  await pool.request().query(querySQL)

            return result.recordset; 
        } catch (error) {
            console.error('Erro ao buscar os clientes: ' , error)
            throw error
        }
    },

    inserirClientes: async (nomeClientes , cpfClientes ) =>{
        try {
            const pool = await getConnetion()  // conectando 

            let querySQL = 'INSERT INTO clientes (nomeCliente , cpfClientes ) VALUES (@nomeCliente , @cpfClientes)'
            
            await pool.request()
            .input('nomeCliente' , sql.VarChar(100), nomeClientes)
            .input('nomeCliente' , sql.Decimal(10,2) , cpfClientes)
            query (querySQL)


            
        } catch (error) {
            console
        }
    }
}