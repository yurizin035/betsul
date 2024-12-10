exports.handler = async (event) => {
  // Se for um GET, verificamos o parâmetro `email`
  if (event.httpMethod === "GET") {
    const queryParams = event.queryStringParameters;
    const email = queryParams?.email;

    if (!email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "O parâmetro 'email' é obrigatório." }),
      };
    }

    // Simula a recuperação dos dados armazenados no "localStorage" (substitua pelo seu banco de dados real)
    const todosUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

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

    // Recupera os usuários salvos (ou cria um array vazio)
    const todosUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Cria um novo usuário
    const novoUsuario = {
      nome,
      senha,
      email,
      saldo: 100, // Saldo inicial
    };

    // Adiciona o novo usuário ao array
    todosUsuarios.push(novoUsuario);

    // Salva no localStorage
    localStorage.setItem("usuarios", JSON.stringify(todosUsuarios));

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
