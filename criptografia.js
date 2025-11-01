const bycrypt = require ('bycrypt');

let senha = 'senha-123';

const saltRounds = 10;

const senhaCriptografada = bycrypt.hashSync (senha , saltRounds);

console.log('Senha Original' , senha);
console.log ('Senha Criptografada:',senhaCriptografada);

const senhaIncorreta = 'senha';

const senhaValida = bycrypt.compareSync (senhaIncorreta , senhaCriptografada);

if (senhaValida) {
    console.log('Senha válida!');
} else {
    console.log ('Senha Incorreta!');
}