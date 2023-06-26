/*
Cliente:
{
    "id_cli": "2",
    "codigo": "2A",
    "name": "CLIENTE TESTE 2"
}

Endereco:
{ 
    "logradouro":"Rua 2 A",
    "numero":"123",
    "complemento":" complemento 2 A",
    "cidade":"SAO PAULO",
    "estado":"SP",
    "cep":"9999"
}

*/


const express = require("express");

const server = express();

server.use(express.json());

let idcliente = 0;
let idendereco = 0;
const clientes = [];
const enderecos = [];

//Get chave endereco - /api/v1/cliente/{codigo}/endereco/{indice}
server.get("/cliente/:codigo/endereco/:indice", (req, res) => {
    const { indice, codigo } = req.params;
    const endereco = enderecos.find((endereco) => {
      if (endereco.indice_end == indice && endereco.codigo == codigo) {
        return endereco;
      }
    });
    return res.json(endereco);
  });
  
  //Get chave endereco - /api/v1/cliente/{codigo}/endereco/
  server.get("/cliente/:codigo/endereco", (req, res) => {
    const { codigo } = req.params;
    const enderecosResult = enderecos.filter(
      (endereco) => endereco.codigo == codigo
    );
    return res.json(enderecosResult);
  });
  
  //Get chave cidade - /api/v1/cliente/endereco?cidade={cidade}
server.get("/cliente/endereco",(req,res) => {
    const { cidade } = req.query;

    const enderecosResult = enderecos.filter(endereco => endereco.cidade_end.startsWith(cidade.toString()));
  
    return res.json(enderecos);
});


//Get chave clientes - /api/v1/cliente/{codigo}
server.get("/cliente/:codigo", (req, res) => {
  const { codigo } = req.params;
  const cliente = clientes.find((cliente) => cliente.codigo_cli == codigo);
  return res.json(cliente);
});

//Get all Cliente - /api/v1/cliente/
server.get("/cliente", (req, res) => {
  return res.json(clientes);
});

//-----------------------------------------------------------------------------------------------------

// Post cliente - POST /api/v1/cliente
server.post("/cliente", (req, res) => {
  const { name, codigo } = req.body;

  const cliente = clientes.find((cliente) => cliente.codigo_cli == codigo);

  if (cliente) {
    return res.status(400).json({ message: "Cliente já existente" });
  }

  idcliente++;
  clientes.push({ id_cli: idcliente, codigo_cli: codigo, nome_cli: name });

  return res.status(201).send();
});

// Post endereco - /api/v1/cliente/{codigo}/endereco
server.post("/cliente/:codigo/endereco", (req, res) => {
  const { codigo } = req.params;

  const { logradouro, numero, complemento, cidade, estado, cep } = req.body;

  const endereco = enderecos.filter((endereco) => endereco.codigo == codigo);

  idendereco++;
  const novoendereco = {
    id_end: idendereco,
    codigo: codigo,
    indice_end: endereco.length + 1,
    logradouro_end: logradouro,
    numero_end: numero,
    complemento_end: complemento,
    cidade_end: cidade,
    estado_end: estado,
    cep_end: cep,
  };

  enderecos.push(novoendereco);

  return res.status(201).json(novoendereco);
});

server.listen(3000);
