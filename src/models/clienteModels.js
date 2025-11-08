// importando a conexao com  o banco de dados
// e o tipo de dados da pasta config/db 
//utilizando descontruçao
const { sql, getConnection } = require("../config/db")

// objeto clienteModel
const clientesModel = {

    buscarTodos: async () => {
        try {
            const pool = await getConnection();


            let querySQL = "SELECT * FROM clientes";

            const result = await pool
                .query(querySQL);

            return result.recordset;
        } catch (error) {
            console.error('Erro ao buscar os clientes: ', error)
            throw error
        }
    },

    buscarporEmail: async (emailCliente) => {
        try {
            const pool = await getConnection()


            let querySQL = "SELECT * FROM clientes WHERE emailcliente = @emailCliente;";

            const result = await pool
                .request()
                .input("emailCliente", sql.VarChar(200), emailCliente)
                .query(querySQL);

            return result.recordset;
        } catch (error) {
            console.error('Erro ao buscar o cliente: ', error)
            throw error
        }
    },

    inserirClientes: async (nomeCliente, cpfCliente, emailCliente, senhaCliente) => {
        try {
            const pool = await getConnection()  // conectando 

            let querySQL = `INSERT INTO clientes (nomeCliente , cpfCliente, emailCliente, senhaCliente) 
            VALUES (@nomeCliente, @cpfCliente, @emailCliente, @senhaCliente)
            `

            await pool.request()
                .input('nomeCliente', sql.VarChar(100), nomeCliente)
                .input('cpfCliente', sql.Char(11), cpfCliente)
                .input('emailCliente', sql.VarChar(200), emailCliente)
                .input('senhaCliente', sql.VarChar(250), senhaCliente)
                .query(querySQL)


        } catch (error) {
            console
        }
    }
}

module.exports = { clientesModel }