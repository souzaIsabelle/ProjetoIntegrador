const container = document.getElementById('container');
const registerBtn = document.getElementById('cadastro');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

const loginForm = document.getElementById("form-login");

loginForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Evita o envio padrão do formulário

    const loginEmail = document.getElementById("email").value;
    const loginSenha = document.getElementById("senha").value;

    // Faz uma chamada para a API para obter os usuários
    fetch('http://localhost:3000/usuario')
        .then(response => {
            if (!response.ok) {
                throw new Error('Falha ao buscar dados dos usuários');
            }
            return response.json();
        })
        .then(data => {
            const usuarioEncontrado = data.find(user => user.email === loginEmail && user.senha === loginSenha);

            if (usuarioEncontrado) {
                alert("Login realizado com sucesso");
                console.log("login realizado")
            } else {
                alert("Email ou senha incorretos");
                console.log("erro")
            }
        })
        .catch(error => {
            console.error('Erro:', error);
        });
});
