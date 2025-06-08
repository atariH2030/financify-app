// Passo 1: Selecionar os elementos do HTML que precisamos controlar.
const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");

// Passo 2: Adicionar um "ouvinte de evento" para o clique no botão 'Criar Conta'.
signUpButton.addEventListener("click", () => {
  // Quando o botão é clicado, adicionamos a classe 'right-panel-active' ao container.
  container.classList.add("right-panel-active");
});

// Passo 3: Adicionar um "ouvinte de evento" para o clique no botão 'Entrar'.
signInButton.addEventListener("click", () => {
  // Quando o botão é clicado, removemos a classe 'right-panel-active' do container.
  container.classList.remove("right-panel-active");
});
