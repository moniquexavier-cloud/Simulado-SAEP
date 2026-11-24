document.addEventListener("DOMContentLoaded", () => {

let usuarioLogado = null;

const usuarioValido = {
    nome: "Gustavo Santana",
    email: "gustavoOperador@gmail.com",
    senha: "123456",
    foto: "assets/account.svg",
    totalApontamentos: 12,
    horasAcumuladas: "48h"
}

// Elementos capturados
const btnLoginTopo = document.getElementById("btnLogin");
const modalLogin = document.getElementById("modal-login");
const btnfecharModal = document.getElementById("fechar-modal");

const inputEmail = document.getElementById("login-email");
const inputSenha = document.getElementById("login-senha");

const cancelarLogin = document.getElementById("cancelar-login");
const confirmarLogin = document.getElementById("confirmar-login");

const mensagemErro = document.getElementById("erro-login");

// Elementos que mudam na tela após o login
const btnRegistros = document.querySelector(".nav-btn");
const tituloSidebar = document.querySelector(".sidebar-header .titulo");
const logoSidebar = document.querySelector(".sidebar-header .logo");
const spanTotalApontamentos = document.getElementById("total-apontamentos");
const spanHorasAcumuladas = document.getElementById("horas-acumuladas");

// Funções auxiliares (Abrir, fechar e limpar erros)

// Serve para chamar o Modal quando o usuário clicar no botão de login
// "limparErrosLogin();": Limpa erros anteriores (ex: o usuário escreveu o login errado cancelou e voltou)
// "formLogin.reset();": Retirar qualquer texto que tenha sido tirado anteriormente
// "modalLogin.style.display = "flex";": torna o modal oculto no html e algo vísivel
function abrirModalLogin ()
{
    limparErrosLogin();
    formLogin.reset();
    modalLogin.style.display = "flex";
  }

// Serve para fechar o modal quando o usuáric clicar no botão de cancelar
// "modalLogin.style.display": Torna o modal oculto
// "limparErrosLogin()": Limpa os erros anteriores
function fecharModalLogin() {
    modalLogin.style.display = "none";
    limparErrosLogin();
  }

// Serve para remover qualquer aviso visual de erro que tenha ficado de uma tentativa anterior
// "inputEmail.classList.remove("input-erro");": Remove quelquer mensagem de erro que apareça no input de email
function limparErrosLogin() {
    inputEmail.classList.remove("input-erro");
    inputSenha.classList.remove("input-erro");
    msgErroLogin.textContent = "";
  }

btnLoginTopo.addEventListener("click", () => {
    if (!usuarioLogado) {
      // Se estiver deslogado, abre o modal
      abrirModalLogin();
    } else {
      // Se já estiver logado, faz Logout e restaura a tela inicial
      usuarioLogado = null;
      btnLoginTopo.textContent = "Login";
      btnLoginTopo.style.backgroundColor = "#FFFFFF";
      btnLoginTopo.style.color = "#333333";

      btnRegistros.disabled = true;
      btnRegistros.classList.remove("ativo");

      tituloSidebar.textContent = "Painel de Apontamentos Operacionais";
      logoSidebar.src = "assets/logo-empresa.png";
      spanTotalApontamentos.textContent = "0";
      spanHorasAcumuladas.textContent = "0h";
    }
  });

  btnFecharModal.addEventListener("click", fecharModalLogin);
  btnCancelarLogin.addEventListener("click", fecharModalLogin);

  // ==========================================================
  // 5. VALIDAÇÃO E ENVIO DO FORMULÁRIO DE LOGIN
  // ==========================================================
  formLogin.addEventListener("submit", (event) => {
    event.preventDefault(); // Impede a página de recarregar
    limparErrosLogin();

    const emailDigitado = inputEmail.value.trim();
    const senhaDigitada = inputSenha.value.trim();

    // Regra A: Campos em branco
    if (emailDigitado === "" || senhaDigitada === "") {
      if (emailDigitado === "") inputEmail.classList.add("input-erro");
      if (senhaDigitada === "") inputSenha.classList.add("input-erro");
      msgErroLogin.textContent = "email ou senha obrigatório";
      return; // Para a execução aqui
    }

    // Regra B: Credenciais inválidas
    if (emailDigitado !== usuarioValido.email || senhaDigitada !== usuarioValido.senha) {
      inputEmail.classList.add("input-erro");
      inputSenha.classList.add("input-erro");
      msgErroLogin.textContent = "email ou senha incorreta";
      return; // Para a execução aqui
    }

    // Regra C: Sucesso na Autenticação!
    usuarioLogado = usuarioValido;
    fecharModalLogin();

    // Troca o botão "Login" para "Logout" com as cores do edital
    btnLoginTopo.textContent = "Logout";
    btnLoginTopo.style.backgroundColor = "#333333";
    btnLoginTopo.style.color = "#FFFFFF";

    // Habilita o botão "Registros" na barra lateral
    btnRegistros.disabled = false;

    // Atualiza o Perfil Lateral com dados do operador logado
    tituloSidebar.textContent = usuarioLogado.nome;
    logoSidebar.src = usuarioLogado.foto;
    spanTotalApontamentos.textContent = usuarioLogado.totalApontamentos;
    spanHorasAcumuladas.textContent = usuarioLogado.horasAcumuladas;
  });
  });
