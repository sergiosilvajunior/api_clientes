/*
{ 
    "logradouro":"Rua teste",
    "numero":"123",
    "complemento":" complemento de teste",
    "cidade":" porto alegre",
    "estado":"RS",
    "cep":"90660900"
}

{
    "id_cli": 1,
    "codigo_cli": "556",
    "nome_cli": "CLIENTE sergio22"
}

*/

const express = require('express');

const server = express();

server.use(express.json());

let idcliente = 0;
let idendereco = 0;
const clientes  = [];
const enderecos  = [];

//Get chave clientes
server.get('/cliente/:codigo',(req,res) => {
    const { codigo } = req.params;
    const cliente = clientes.find(cliente => cliente.codigo_cli == codigo)
    return res.json(cliente);
});

//Gett all Cliente
server.get('/cliente', (req, res) => {
    return res.json(clientes)
});

// Post cliente
server.post('/cliente', (req,res) => {
    const { name, codigo } = req.body;

    const cliente = clientes.find(cliente => cliente.codigo_cli == codigo);

    if (cliente) {
        return res.status(400).json({'message':'Cliente já existente'});
    }

    idcliente++;
    clientes.push({id_cli:idcliente,
                 codigo_cli:codigo,
                 nome_cli:name});

    return res.status(201).send();
});

//-------------------------------------------------------------------------------------------------------

// Post endereco
server.post('/cliente/:codigo/endereco', (req,res) => {
    const { codigo } = req.params;

    const { logradouro, numero, complemento, cidade, estado, cep } = req.body;

    const endereco = enderecos.filter(endereco => endereco.codigo_end == codigo)

    idendereco++;
    const novoendereco = {id_end:idendereco,
                            codigo:codigo,
                            indice_end:endereco.length,
                            logradouro_end:logradouro,
                            numero_end:numero,
                            complemento_end:complemento,
                            cidade_end:cidade,
                            estado_end:estado,
                            cep_end:cep}

    enderecos.push(novoendereco);
                   
    return res.status(201).json(novoendereco);
});

//Get chave endereco
server.get('/cliente/:codigo/endereco/:indice',(req,res) => {
    const { indice, codigo } = req.params;
    const endereco = enderecos.find(endereco => {
        if (endereco.indice_end == indice && endereco.codigo == codigo){
            return endereco
        }
    })
    console.log(endereco);
    return res.json(endereco);
});

//Get chave endereco
server.get('/cliente/:codigo/endereco',(req,res) => {
    const { codigo } = req.params;
    const enderecos = enderecos.filter(endereco => endereco.codigo == codigo )
    return res.json(enderecos);
});

//Get chave cidade
server.get('/cliente/endereco',(req,res) => {
    const { cidade } = req.query
    const enderecos = enderecos.filter(endereco => endereco.cidade_end == cidade )
    return res.json(enderecos);
});

server.listen(3000);