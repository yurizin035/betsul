exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Método não permitido. Use POST." }),
    };
  }

  // Parseia os dados enviados no corpo da requisição
  const { nome, senha } = JSON.parse(event.body);

  if (!nome || !senha) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Nome e senha são obrigatórios." }),
    };
  }

  const dados = {
    nome: nome,
    senha: senha,
    saldo: 100, // Saldo inicial
  };

  // Simulando salvamento no localStorage
  // (em um backend real, você usaria um banco de dados aqui)

  return {
    statusCode: 200,
    body: JSON.stringify({
      status: "sucesso",
      dados: dados,
    }),
  };
};
