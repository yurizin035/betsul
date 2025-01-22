function getCookie(name) {
    const cookies = document.cookie.split('; ');
    for (let i = 0; i < cookies.length; i++) {
        const [key, value] = cookies[i].split('=');
        if (key === name) {
            return decodeURIComponent(value);
        }
    }
  return null; 
}
const userCookie = getCookie('user');

if (userCookie) {
  window.location.href = '../';
} 
document.getElementById('signin').addEventListener('submit', async function (event) {
  event.preventDefault(); // Evita o envio padrão do formulário

  const email = document.getElementById('email').value;
  const password = document.getElementById('senha').value;

  try {
    // Faz a requisição para buscar os usuários
    const response = await fetch('https://databackend.koyeb.app/users.php');
    if (!response.ok) {
      throw new Error('Erro ao acessar o servidor.');
    }

    const users = await response.json();

    // Procura o usuário pelo email
    const user = users.find(user => user.email === email);

    // Valida as credenciais
    let message = '';
    if (!user) {
      message = 'Usuário não encontrado.';
    } else if (user.senha !== password) {
      message = 'Senha incorreta.';
    } else {
      message = 'Login realizado com sucesso!';
        signin(email);
        window.location.href = "../"
    }

    // Exibe a mensagem de retorno
      document.getElementById('message').classList.remove("none");
    document.getElementById('message').innerText = message;

  } catch (error) {
    console.error('Erro:', error);
    document.getElementById('message').innerText = 'Erro ao processar login.';
  }
});

function signin(email) {
  const cookieName = "user";
  const expirationDays = 7;
  const expirationDate = new Date();
  expirationDate.setTime(expirationDate.getTime() + (expirationDays * 24 * 60 * 60 * 1000));

  document.cookie = `${cookieName}=${email}; expires=${expirationDate.toUTCString()}; path=/`;
}
