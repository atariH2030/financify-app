import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/11.9.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/11.9.0/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");
signUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});
signInButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

const signUpForm = document.querySelector(".sign-up-container form");
const signUpEmailInput = document.querySelector(
  '.sign-up-container input[type="email"]'
);
const signUpPasswordInput = document.getElementById("signUpPassword");
signUpForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = signUpEmailInput.value;
  const password = signUpPasswordInput.value;
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      setDoc(doc(db, "users", user.uid), {
        email: user.email,
        createdAt: new Date(),
      })
        .then(() => {
          sendEmailVerification(user).then(() => {
            alert("Conta criada com sucesso! Verifique seu e-mail.");
          });
        })
        .catch((error) => {
          alert("Erro ao salvar perfil.");
        });
      signUpForm.reset();
    })
    .catch((error) => {
      if (error.code === "auth/weak-password") {
        alert("A senha é muito fraca.");
      } else if (error.code === "auth/email-already-in-use") {
        alert("Este e-mail já está em uso.");
      } else {
        alert("Erro ao criar a conta: " + error.message);
      }
    });
});

const signInForm = document.querySelector(".sign-in-container form");
const signInEmailInput = document.querySelector(
  '.sign-in-container input[type="email"]'
);
const signInPasswordInput = document.getElementById("signInPassword");
signInForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = signInEmailInput.value;
  const password = signInPasswordInput.value;
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      window.location.href = "../home/home.html";
    })
    .catch((error) => {
      alert("E-mail ou senha incorretos.");
    });
});

const googleSignInBtn = document.getElementById("googleSignInBtn");
const googleSignUpBtn = document.getElementById("googleSignUpBtn");
const handleGoogleLogin = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      window.location.href = "../home/home.html";
    })
    .catch((error) => {
      console.error("Erro no login com Google:", error);
      alert("Erro ao tentar login com Google.");
    });
};
googleSignInBtn.addEventListener("click", handleGoogleLogin);
googleSignUpBtn.addEventListener("click", handleGoogleLogin);

const togglePasswordIcons = document.querySelectorAll(".toggle-password");
togglePasswordIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    const targetInputId = icon.getAttribute("data-target");
    const targetInput = document.getElementById(targetInputId);
    if (targetInput.type === "password") {
      targetInput.type = "text";
      icon.classList.remove("fa-eye-slash");
      icon.classList.add("fa-eye");
    } else {
      targetInput.type = "password";
      icon.classList.remove("fa-eye");
      icon.classList.add("fa-eye-slash");
    }
  });
});
