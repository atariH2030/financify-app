// Importando as configurações e funções necessárias
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/11.9.0/firebase-auth.js";

// Inicializando o Firebase na página home
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Selecionando os elementos da página
const userEmailSpan = document.getElementById("userEmail");
const logoutBtn = document.getElementById("logoutBtn");

// O "PORTEIRO" DA PÁGINA
onAuthStateChanged(auth, (user) => {
  if (user) {
    // Se existe um usuário logado...
    // Mostramos o e-mail dele na tela.
    userEmailSpan.textContent = user.email;
  } else {
    // Se não há usuário logado...
    // Redirecionamos imediatamente para a tela de login.
    window.location.href = "../login/tela-login.html";
  }
});

// LÓGICA DO BOTÃO DE LOGOUT
logoutBtn.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      // Logout bem-sucedido, redireciona para a página de login.
      window.location.href = "../login/tela-login.html";
    })
    .catch((error) => {
      // Ocorreu um erro no logout.
      console.error("Erro ao fazer logout:", error);
      alert("Erro ao tentar sair. Por favor, tente novamente.");
    });
});
