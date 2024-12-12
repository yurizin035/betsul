// URL do JSON
const jsonUrl = "https://racial-henrie-betsul-9f2864d6.koyeb.app/users.json";

const cookieName = 'userlogged';

function setUserLoggedCookie(email) {
    const expirationDate = new Date();
    expirationDate.setFullYear(expirationDate.getFullYear() + 1);
    document.cookie = `${cookieName}=${encodeURIComponent(email)}; expires=${expirationDate.toUTCString()}; path=/`;
}

// Formulário de cadastro
const signupForm = document.getElementById('signmenu');
signupForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(signupForm);

    fetch('https://racial-henrie-betsul-9f2864d6.koyeb.app/', {
        method: 'POST',
        body: formData,
    })
        .then(response => response.text())
        .then(data => {
            if (data.includes("Usuário registrado com sucesso!")) {
                const email = document.getElementById('email').value;
                setUserLoggedCookie(email);
                window.location.href = '/';
            } else {
                alert(data); // Exibe mensagem de erro
            }
        })
        .catch(error => console.error('Erro:', error));
});

// Formulário de login
const loginForm = document.getElementById('signmenu1');
loginForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    const emailInput = document.getElementById('myemail').value;
    const senhaInput = document.getElementById('mypass').value;

    fetch(jsonUrl)
        .then(response => {
            if (!response.ok) throw new Error("Erro ao buscar os dados.");
            return response.json();
        })
        .then(users => {
            const user = users.find(user => user.email === emailInput);
            if (user) {
                if (user.senha === senhaInput) {
                    alert("pi");
                } else {
                    alert("Senha incorreta!");
                }
            } else {
                alert("Email não encontrado!");
            }
        })
        .catch(error => {
            console.error("Erro:", error);
            alert("Não foi possível verificar os dados. Tente novamente mais tarde.");
        });
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
