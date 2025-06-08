// --- IMPORTAÇÃO DOS MÓDULOS DO FIREBASE ---
// Aqui, trazemos as ferramentas de que precisamos para dentro do nosso script.
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// --- INICIALIZAÇÃO DO FIREBASE ---
// Usando o objeto 'firebaseConfig' do nosso arquivo 'firebase-config.js', inicializamos a conexão.
const app = initializeApp(firebaseConfig);
// Agora, obtemos uma instância do serviço de Autenticação para nosso app.
const auth = getAuth(app);

// --- LÓGICA DA ANIMAÇÃO DA TELA (continua a mesma) ---
const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");

signUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

// --- NOVA LÓGICA DE CADASTRO DE USUÁRIO ---

// 1. Selecionar os elementos do formulário de cadastro.
const signUpForm = document.querySelector(".sign-up-container form");
const signUpEmailInput = document.querySelector(
  '.sign-up-container input[type="email"]'
);
const signUpPasswordInput = document.querySelector(
  '.sign-up-container input[type="password"]'
);

// 2. Adicionar um "ouvinte" para o evento de 'submit' do formulário.
signUpForm.addEventListener("submit", (event) => {
  // 3. Prevenir o comportamento padrão do formulário (que é recarregar a página).
  event.preventDefault();

  // 4. Pegar os valores digitados pelo usuário.
  const email = signUpEmailInput.value;
  const password = signUpPasswordInput.value;

  // 5. Chamar a função do Firebase para criar o usuário.
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Se der tudo certo (a Promise for resolvida)...
      // O usuário foi criado e já está logado.
      const user = userCredential.user;
      console.log("Usuário criado:", user);
      alert("Conta criada com sucesso!");

      // Limpar os campos do formulário
      signUpForm.reset();
    })
    .catch((error) => {
      // Se der algum erro (a Promise for rejeitada)...
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Erro ao criar usuário:", errorCode, errorMessage);

      // Exibir uma mensagem de erro mais amigável
      if (errorCode === "auth/weak-password") {
        alert("A senha é muito fraca. Por favor, use pelo menos 6 caracteres.");
      } else if (errorCode === "auth/email-already-in-use") {
        alert("Este endereço de e-mail já está em uso.");
      } else {
        alert("Ocorreu um erro ao criar a conta: " + errorMessage);
      }
    });
});
