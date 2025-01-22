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
function continuek() {
  alert("oi")
}
document.getElementById("signup").addEventListener("submit", function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const data = {
        name: formData.get('name'),
        whatsapp: formData.get('whatsapp'),
        email: formData.get('email'),
        senha: formData.get('senha')
    };

    fetch("https://databackend.koyeb.app/signup.php", {
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
            signup(formData.get('email'));
            window.location.href = "../"
        } else if (data.erro) {
            if (data.erro.includes("email")) {
                emailinput.style.border = "2px solid red";
                whatsappinput.style.border = "1px solid #d0d0d0";
                spanEmail.classList.remove("none");
                spanWhatsapp.classList.add("none");
            } else if (data.erro.includes("WhatsApp")) {
                whatsappinput.style.border = "2px solid red";
                emailinput.style.border = "1px solid #d0d0d0";
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
function signup(email) {
  const cookieName = "user";
  const expirationDays = 7;
  const expirationDate = new Date();
  expirationDate.setTime(expirationDate.getTime() + (expirationDays * 24 * 60 * 60 * 1000));

  document.cookie = `${cookieName}=${email}; expires=${expirationDate.toUTCString()}; path=/`;
}
