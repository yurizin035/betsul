// URL do JSON
const jsonUrl = "https://racial-henrie-betsul-9f2864d6.koyeb.app/users.json";

const cookieName = 'userlogged';

function setUserLoggedCookie(email) {
    const expirationDate = new Date();
    expirationDate.setFullYear(expirationDate.getFullYear() + 1);
    document.cookie = `${cookieName}=${encodeURIComponent(email)}; expires=${expirationDate.toUTCString()}; path=/`;
}

const signupForm = document.getElementById('signmenu');
signupForm?.addEventListener('submit', (event) => {
    event.preventDefault();

    // Obtém os dados do formulário
    const nome = document.getElementById('name').value;
    const whatsapp = document.getElementById('whatsapp').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    // Cria o objeto com os dados
    const data = {
        nome: nome,
        whatsapp: whatsapp,
        email: email,
        senha: senha
    };

    fetch('https://racial-henrie-betsul-9f2864d6.koyeb.app/', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'  // Define que estamos enviando dados em JSON
    },
    body: JSON.stringify(data)  // Converte o objeto em uma string JSON
})
.then(response => response.text())  // Espera que a resposta seja texto simples
.then(data => {
    if (data === "Usuário registrado com sucesso!") {
        setUserLoggedCookie(email);  // Função para definir o cookie de login
        window.location.href = '/';  // Redireciona após sucesso
    } else {
        alert(data);  // Exibe a mensagem de erro
    }
})
.catch(error => console.error('Erro:', error));
});
const loginForm = document.getElementById('signmenu1');
loginForm?.addEventListener('submit', (event) => {
    event.preventDefault();

    // Obtém os dados do formulário
    const email = document.getElementById('myemail').value;
    const senha = document.getElementById('mypass').value;

    // Cria o objeto com os dados
    const data = {
        email: email,
        senha: senha
    };

    fetch('https://racial-henrie-betsul-9f2864d6.koyeb.app/login.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'  // Define que estamos enviando dados em JSON
        },
        body: JSON.stringify(data)  // Converte o objeto em uma string JSON
    })
    .then(response => response.json())  // Espera que a resposta seja um JSON
    .then(data => {
        if (data.message === "Sucesso! Login realizado.") {
            setUserLoggedCookie(email);  // Função para definir o cookie de login
            window.location.href = '/';  // Redireciona após login bem-sucedido
        } else {
            alert(data.message);  // Exibe a mensagem de erro
        }
    })
    .catch(error => console.error('Erro:', error));
});

// Função para login bem-sucedido
function correct() {
    alert("Login bem-sucedido!");
    window.location.href = '/'; // Redirecionar para a página inicial ou dashboard
}

// Alternar exibição das seções
function signup() {
    document.getElementById("signdiv").classList.toggle("none");
    document.getElementById("signmenu").classList.toggle("none");
}

function login() {
    document.getElementById("signdiv").classList.toggle("none");
    document.getElementById("signmenu1").classList.toggle("none");
}
