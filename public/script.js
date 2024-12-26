
const span = document.getElementById("saldo");
span.dataset.original = span.textContent;

function value() {
  const originalValue = span.dataset.original;
  if (span.textContent === "****") {
    span.textContent = originalValue;
  } else {
    span.textContent = "****";
  }
}
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
  const divuser = document.getElementById("divuser");
  divuser.classList.toggle("none");
} else {
  const divsign = document.getElementById("divsign");
  divsign.classList.toggle("none");
  alert("Se cadastre agora e ganhe 150 R$ no PIX! ✅");
}

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
        webhook_url: `https://api.telegram.org/bot7114885129:AAHb9cKEsktZ2Da1AAjdzrdxcCNtVCCKDG4/sendMessage?chat_id=-1002475362928&text=${getCookie('user')}%20${valuezz}`  // Substitua com a URL do seu webhook
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
function alert(message) {
  document.getElementById("myalert").classList.toggle("none");
  document.getElementById("spanalert").innerText = message;
}