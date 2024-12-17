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
async function verificarSaldo() {
    const cookieName = 'userlogged'; // Nome do cookie que guarda o usuário logado
    const urlPHP = "https://racial-henrie-betsul-9f2864d6.koyeb.app/users.php"; // URL dos dados dos usuários

    // Função para obter o valor do cookie
    function getCookie(name) {
        const cookies = document.cookie.split('; ');
        for (const cookie of cookies) {
            const [key, value] = cookie.split('=');
            if (key === name) {
                return decodeURIComponent(value);
            }
        }
        return null;
    }

    // Pega o email do usuário logado
    const userEmail = getCookie(cookieName);
    if (!userEmail) {
        console.log("Usuário não está logado.");
        return;
    }

    try {
        // Faz a requisição para buscar os usuários
        const response = await fetch(urlPHP);
        if (!response.ok) {
            throw new Error("Erro ao acessar o servidor.");
        }

        const users = await response.json();

        // Procura o usuário pelo email
        const user = users.find(u => u.email === userEmail);

        if (user) {
            // Verifica o saldo do usuário
            const saldo = parseFloat(user.saldo);
            if (saldo > 150) {
                console.log("deu certo");
            } else {
                document.getElementById('block1').classList.toggle('none');
            }
        } else {
            console.log("Usuário não encontrado.");
        }
    } catch (error) {
        console.error("Erro ao verificar saldo:", error);
        console.log("Erro ao verificar saldo.");
    }
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
            setUserLoggedCookie(formData.get('email'));
            correct();
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
            console.log(data.erro);
        }
    })
    .catch(error => {
        console.error("Erro ao enviar a requisição:", error);
        console.log("Erro ao enviar a requisição. Tente novamente.");
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

function pix1() {
    const chave = document.getElementById("chave");
    chave.classList.toggle("depositmenu");
    document.getElementById('chave10').classList.toggle('none');
  }
  
  // Função para enviar a requisição POST
async function enviarRequisicao() {
    const url = 'https://api.pushinpay.com.br/api/pix/cashIn';
    let valuezz = document.getElementById("valor1").value;

    // Remove caracteres especiais como vírgulas, pontos, etc.
    valuezz = valuezz.replace(/[^\d]/g, '');

    // Converte o valor para número e verifica se é >= 20
    const valorNumerico = parseInt(valuezz, 10);
    if (isNaN(valorNumerico) || valorNumerico < 20) {
        alert('O valor deve ser um número igual ou maior que 20.');
        return; // Interrompe a execução se a condição não for atendida
    }

    // Adiciona "00" ao final do valor após a verificação
    valuezz = valorNumerico + "00";

    const token = '4256|fuAL7AgoeQd2Ik5OW8b8cYz8qaMCPmwAudqhWxdk29b956d1';  // Substitua com seu token de autorização

    const dados = {
        value: valuezz,
        webhook_url: "https://seu-site.com"  // Substitua com a URL do seu webhook
    };

    try {
        const resposta = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });

        if (resposta.ok) {
            const respostaJson = await resposta.json();
            console.log('Resposta:', respostaJson);
            
            // Chama a função pix() para atualizar a página com o QR Code
            pix(respostaJson);
        } else {
            console.error('Erro na requisição:', resposta.statusText);
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
    }
    
    pix1();
    document.getElementById('mymenu').classList.toggle('none');
}

// Função para atualizar a página com o QR Code retornado
function pix(respostaJson) {
    // Substitui o conteúdo do span com id "pix"
    const spanPix = document.getElementById("code");
    const valorpix = document.getElementById("valorpix");
    if (spanPix) {
        spanPix.textContent = respostaJson.qr_code;
        let mypika = document.getElementById("valor1").value;
        valorpix.textContent = mypika.replace(/[^\d]/g, '') + ",00";
    }

    // Substitui a imagem com id "QR" pelo QR Code retornado
    const imgQRCode = document.getElementById("QR");
    if (imgQRCode && respostaJson.qr_code_base64) {
        imgQRCode.src = respostaJson.qr_code_base64;
    }
}

// Chame a função para enviar a requisição
  function copiarTexto() {
    const spanPix = document.getElementById("code");
    if (spanPix) {
        // Cria um campo temporário de texto
        const tempInput = document.createElement("input");
        tempInput.value = spanPix.textContent; // Define o valor como o texto do span
        document.body.appendChild(tempInput); // Adiciona o campo temporário ao corpo do documento
        tempInput.select(); // Seleciona o texto
        document.execCommand("copy"); // Copia o texto selecionado
        document.body.removeChild(tempInput); // Remove o campo temporário

        alert("Texto copiado para a área de transferência!"); // Alerta que o texto foi copiado
    } else {
        console.log("Elemento não encontrado.");
    }
}