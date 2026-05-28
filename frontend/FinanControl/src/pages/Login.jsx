import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { enderecoServidor } from '../utils';

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  async function botaoEntrar(event) {
    event.preventDefault();
    try {
      if (email == "" || senha == "") {
        setMensagem("Preencha todos os campos");
        return;
      }
      const login = {
        email: email,
        senha: senha
      }
      const resposta = await fetch(`${enderecoServidor}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(login)
      });

      if (resposta.status == 404) {
        setMensagem(`Rota nao encontrada: ${resposta.url}`);
        return;
      }
      const dados = await resposta.json();
      
      if (resposta.status == 500) {
        setMensagem(`Erro no servidor: ${dados.message}`);
        return;
      }
      if (resposta.ok) {
        localStorage.setItem("Usuario logado", JSON.stringify(dados));
        navigate("/Principal");
      } else {
        setMensagem("Email ou senha incorretos");
      }
    } catch (erro) {
      setMensagem("Erro ao fazer login: " + erro.message);
    }
  }

  return (
    <div>
      <h1>Tela de Login</h1>
      <label>Email:</label>
      <input type="email" placeholder="Digite seu email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <br />
      <label>Senha:</label>
      <input type="password" placeholder="Digite sua senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
      <button onClick={botaoEntrar}>Entrar</button>
      <p style={{ color: "#F00" }}>{mensagem}</p>
    </div>
  );
}