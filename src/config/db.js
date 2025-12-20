const sql = require('mssql')

const CONFIG = {
    user:process.env.USER_DB,
    password: process.env.PASSWORD_DB,
    server: process.env.SERVER_DB,
    database: process.env.DATABASE_DB,
    //ignora o erro de certificado autoassinado
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
}

async function getConnection() {
    try {
        const pool = await sql.connect(CONFIG)
        return pool //retornar um conjunto de conexoes
    } catch (error) {
        console.error('Erro na conexao SQL Server: ', error)
    }
}

// (async () => {
//     try {
//         const pool = await getConnetion()
//         console.log('Conexao estabelecida com sucesso!')
//     } catch (error) {
//         console.error('Erro ao estabelecer conexao:', error)
//     }
// })()

module.exports = {
    sql,
    getConnection
}