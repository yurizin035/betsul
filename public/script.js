// URL do JSON
const jsonUrl = "https://racial-henrie-betsul-9f2864d6.koyeb.app/users.json";

const cookieName = 'userlogged';

function setUserLoggedCookie(email) {
    const expirationDate = new Date();
    expirationDate.setFullYear(expirationDate.getFullYear() + 1);
    document.cookie = `${cookieName}=${encodeURIComponent(email)}; expires=${expirationDate.toUTCString()}; path=/`;
}
function menu() {
    document.getElementById("menu").classList.toggle("none");
}
function readCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

// Verifica se o cookie 'userlogged' existe
if (!readCookie('userlogged')) {
    const header2 = document.getElementById('header2');
    signup();
    header2.classList.toggle('none');
} else {
    const header = document.getElementById('header');
    header.classList.toggle('none');
}

document.getElementById("signmenu").addEventListener("submit", function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const data = {
        name: formData.get('name'),
        whatsapp: formData.get('whatsapp'),
        email: formData.get('email'),
        senha: formData.get('senha')
    };

    fetch("https://racial-henrie-betsul-9f2864d6.koyeb.app/signup.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams(data)
    })
    .then(response => response.json())
    .then(data => {
        const emailinput = document.getElementById('email');
        const spanEmail = document.getElementById('spanEmail');
        const whatsappinput = document.getElementById('whatsapp');
        const spanWhatsapp = document.getElementById('spanWhatsapp');
        
        if (data.sucesso) {
            alert(data.sucesso);
        } else if (data.erro) {
            if (data.erro.includes("email")) {
                emailinput.style.border = "2px solid red";
                whatsappinput.style.border = "2px solid #5F48E0";
                spanEmail.classList.remove("none");
                spanWhatsapp.classList.add("none");
            } else if (data.erro.includes("WhatsApp")) {
                whatsappinput.style.border = "2px solid red";
                emailinput.style.border = "2px solid #5F48E0";
                spanWhatsapp.classList.remove("none");
                spanEmail.classList.add("none");
            }
            alert(data.erro);
        }
    })
    .catch(error => {
        console.error("Erro ao enviar a requisição:", error);
        alert("Erro ao enviar a requisição. Tente novamente.");
    });
});

document.getElementById('signmenu1').addEventListener('submit', async function (event) {
  event.preventDefault(); // Evita o envio padrão do formulário

  const email = document.getElementById('myemail1').value;
  const password = document.getElementById('mypass1').value;

  try {
    // Faz a requisição para buscar os usuários
    const response = await fetch('https://racial-henrie-betsul-9f2864d6.koyeb.app/users.php');
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
        setUserLoggedCookie(email);
        correct();
    }

    // Exibe a mensagem de retorno
    document.getElementById('message').innerText = message;

  } catch (error) {
    console.error('Erro:', error);
    document.getElementById('message').innerText = 'Erro ao processar login.';
  }
});

// Função para login bem-sucedido
function correct() {
    alert("Login bem-sucedido!");
    window.location.href = '/';
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

function getUserLoggedCookie() {
    const cookieName = 'userlogged';
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
        const [name, value] = cookie.split('=');
        if (name === cookieName) {
            return decodeURIComponent(value);
        }
    }
    return null;
}

(async function() {
    const userEmail = getUserLoggedCookie();

    if (!userEmail) {
        console.error("Usuário não logado.");
        return;
    }

    try {
        const response = await fetch("https://racial-henrie-betsul-9f2864d6.koyeb.app/users.php");
        const data = await response.json();

        const user = data.find(u => u.email === userEmail);

        if (user) {
            document.getElementById("saldo").textContent = `R$ ${user.saldo},00`;
        } else {
            console.error("Usuário não encontrado.");
        }
    } catch (error) {
        console.error("Erro ao buscar os dados do usuário:", error);
    }
})();