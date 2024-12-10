const fs = require('fs');
const path = require('path');

// Caminho do arquivo onde os dados serão salvos
const dadosPath = path.join(__dirname, 'usuarios.json');

exports.handler = async (event) => {
  // Se for um GET, verificamos o parâmetro 'email'
  if (event.httpMethod === "GET") {
    const queryParams = event.queryStringParameters;
    const email = queryParams?.email;

    if (!email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "O parâmetro 'email' é obrigatório." }),
      };
    }

    // Lê o arquivo de dados
    let todosUsuarios = [];
    try {
      const dados = fs.readFileSync(dadosPath);
      todosUsuarios = JSON.parse(dados);
    } catch (err) {
      console.error("Erro ao ler os dados:", err);
    }

    // Busca o usuário pelo email
    const usuarioEncontrado = todosUsuarios.find((usuario) => usuario.email === email);

    if (!usuarioEncontrado) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Usuário não encontrado." }),
      };
    }

    // Retorna os dados do usuário encontrado
    return {
      statusCode: 200,
      body: JSON.stringify({
        status: "sucesso",
        dados: usuarioEncontrado,
      }),
    };
  }

  // Se for um POST, salvamos os dados enviados
  if (event.httpMethod === "POST") {
    const { nome, senha, email } = JSON.parse(event.body);

    if (!nome || !senha || !email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Nome, senha e email são obrigatórios." }),
      };
    }

    // Lê o arquivo de dados
    let todosUsuarios = [];
    try {
      const dados = fs.readFileSync(dadosPath);
      todosUsuarios = JSON.parse(dados);
    } catch (err) {
      console.log("Nenhum dado encontrado, criando novo arquivo.");
    }

    // Cria um novo usuário
    const novoUsuario = {
      nome,
      senha,
      email,
      saldo: 100, // Saldo inicial
    };

    // Adiciona o novo usuário ao array
    todosUsuarios.push(novoUsuario);

    // Salva os dados no arquivo
    try {
      fs.writeFileSync(dadosPath, JSON.stringify(todosUsuarios, null, 2));
    } catch (err) {
      console.error("Erro ao salvar os dados:", err);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        status: "sucesso",
        dados: novoUsuario,
      }),
    };
  }

  // Método HTTP não suportado
  return {
    statusCode: 405,
    body: JSON.stringify({ error: "Método não permitido." }),
  };
};
