// cliente banco de dados
const userForm = document.getElementById("user-form");
const userList = document.getElementById("user-list"); 
const listForm = document.getElementById("list-form")

function listUsers() {
  fetch("http://localhost:3000/usuario")
    .then((response) => response.json())
    .then((data) => {
      userList.innerHTML = "";
      data.forEach((user) => {
        const li = document.createElement("li");
        li.innerHTML = `ID: ${user.id} - Nome: ${user.nome} - Email: ${user.email} CRM- ${user.crm} - Senha: ${user.senha}`;
        userList.appendChild(li);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Excluir";
        deleteButton.addEventListener("click", () => deleteUser(user.id));
        li.appendChild(deleteButton);

        const updateButton = document.createElement("button");
        updateButton.textContent = "Atualizar";
        updateButton.addEventListener("click", () => updateUser(user.id));
        li.appendChild(updateButton);
      });
    })
    .catch((error) => console.error("Erro:", error));
}

// submit (GET)
userForm.addEventListener("submit", (e) => {
  e.preventDefault(); //prevenção padrão de erros
  //pegando os dados do formulário

  const nome = document.getElementById("nome-cadastro").value;
  const email = document.getElementById("email-cadastro").value;
  const crm = document.getElementById("crm-cadastro").value;
  const senha = document.getElementById("senha-cadastro").value;
  

  fetch("http://localhost:3000/usuario", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nome: nome, email: email, crm:crm, senha: senha }),
  })
    .then((response) => response.json())
    .then(() => {
      listUsers();
      userForm.reset();
      alert("cadastro feito com sucesso")
    })
    .catch((error) => console.error("Erro:", error));
});

// delete
function deleteUser(id) {
  fetch(`http://localhost:3000/Usuario/${id}`, {
    method: "DELETE",
  })
    .then(() => {
      listUsers();
    })
    .catch((error) => console.error("Erro", error));
}

// update
function updateUser(id) {
  const nome = document.getElementById("nome-lista").value;
  const email = document.getElementById("email-lista").value;
  const crm = document.getElementById("crm-lista").value
  const senha = document.getElementById("senha-lista").value;

  if (nome.trim() === "" && email.trim() === "" && crm.trim() === ""&& senha.trim()) {
    alert("Preencha ao menos um dos campos para prosseguir com a alteração");
  } else {
    fetch(`http://localhost:3000/usuario/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nome: nome, email: email,crm:crm , senha: senha }),
    })
      .then((response) => response.json())
      .then(() => {
        listUsers();
        userForm.reset();
      })
      .catch((error) => console.error("Erro:", error));
  }
}

listUsers();
