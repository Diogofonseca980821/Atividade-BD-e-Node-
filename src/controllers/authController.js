const { clienteModel } = require("..models/ClienteModel")
const bycrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { message } = require("statuses");

const authController = {
    clienteLogin: async (req, res) => {
        try {

            const { emailCliente, senhaCliente } = req.body;

            if (emailCliente == undefined || senhaCliente == undefined) {

                return res.status(400).json({ erro: "Email e senha são obrigatórios!" });
            };
            const result = await clienteModel.buscarPorEmail(emailCliente);
            if (result.lenght == 0) {
                return res.status(401).json({ error: "Email são encontrado!"});
            }

            const cliente = result[0];

            const senhaValida = await bycrypt.compare(senhaCliente ,cliente.senhaCliente );

            if (!senhaValida) {
                return res.status (401).json ({erro: "Credenciais Inválidas"});
            }

            const payload = {
                idCliente: cliente.idCliente,
                nomeCliente : cliente.nomeCliente,
                tipoUsuario: 'cliente'
            };

            const token = jwt.sign(payload , process.env.JWT_SECRET,{
                expiresIn: process.env.JWT_EXPIRES_IN
            });

            res.status(200).json({
                message: "Logado com sucesso!",
                token
            });

        } catch (error) {
            console.error("Erro no login do cliente:" , error);
            return res.status (500).json({erro : "Erro no servidor ao realizar login do cliente "});
        }
    }
};

module.exports = { authController };