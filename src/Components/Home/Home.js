import React, { useState, useEffect } from "react";
import "./style.css";
import Logo from "../../assets/images/Logo.svg";
import Perfil from "../../assets/images/Perfil.svg";
import Background from "../../assets/images/Background.svg";

export default function Home() {

    // Variaveis dos Hooks que cuidam do ESTADO 
  const [mensagens, setMensagens] = useState([]); /* para criar uma "lista" de mensagens */
  const [mensagemEditando, setMensagemEditando] = useState(null); /* para editar a mensagem e salavr */
  const [menuAberto, setMenuAberto] = useState(false); /* para abrir o dropdown com o editar e excluir */

  // Carregar as mensagens do LocalStorage e converter os dados recebidos
  useEffect(() => {
    const savedMessages = JSON.parse(localStorage.getItem("mensagens")) || [];
    setMensagens(savedMessages);
  }, []);

  // Função para obter o próximo ID
  const obterProximoId = () => {
    const ultimoId = localStorage.getItem("ultimoId");
    if (!ultimoId) {
      localStorage.setItem("ultimoId", 1);
      return 1;
    }
    const novoId = parseInt(ultimoId) + 1;
    localStorage.setItem("ultimoId", novoId);
    return novoId;
  };

  // Função para salvar mensagens no LocalStorage
  const salvarMensagem = (novasMensagens) => {
    localStorage.setItem("mensagens", JSON.stringify(novasMensagens));
  };

  // Função para adicionar uma nova mensagem
  const adicionarMensagem = (titulo, mensagem, privacidade) => {
    const id = obterProximoId();
    const novaMensagem = {
      id,
      titulo,
      mensagem,
      privacidade,
      dataCriacao: new Date().toLocaleDateString(),
    };

    //adicionando uma nova mensagem a lista
    const novasMensagens = [...mensagens, novaMensagem]; /* ... operador spread */
    setMensagens(novasMensagens);
    salvarMensagem(novasMensagens);
  };

  // Função para editar ou adicionar mensagem
  const handleAdicionarMensagem = () => {
    const titulo = document.getElementById("titulo").value;
    const mensagem = document.getElementById("mensagem").value;
    const privacidade = document.getElementById("privacidade").value;

    //editando uma mensagem existente
    if (mensagemEditando) {
      const novasMensagens = mensagens.map((m) => /* m é a mensagem individualmente */
        m.id === mensagemEditando
          ? { ...m, titulo, mensagem, privacidade }
          : m
      );

    //   Adicionando e salvando as mensagens agora editadas
      setMensagens(novasMensagens); 
      salvarMensagem(novasMensagens);
      setMensagemEditando(null); // Resetar edição
    } else {
      adicionarMensagem(titulo, mensagem, privacidade); /* Se não existir uma mensagem a ser editada, aqui ela será criada */
    }

    // Fechar o modal e limpar os campos
    const modal = document.querySelector("dialog");
    if (modal) modal.close();
    document.getElementById("titulo").value = "";
    document.getElementById("mensagem").value = "";
    document.getElementById("privacidade").value = "publico";
  };

  // Função para gerenciar a ação (editar/excluir) da mensagem
  const handleAcaoMensagem = (acao, id) => {
    if (acao === "excluir") {
      const confirmar = window.confirm("Deseja realmente excluir esta mensagem?");
      if (confirmar) {
        const novasMensagens = mensagens.filter((mensagem) => mensagem.id !== id); /* filtrando a mensagem para excluir correspondendi com o id */
    //    Atualizando o estado da mensagem (Tirando ela do array ao ser excluida)
        setMensagens(novasMensagens);
        salvarMensagem(novasMensagens);
      }
    } else if (acao === "editar") {
      const mensagemParaEditar = mensagens.find((mensagem) => mensagem.id === id);
      if (mensagemParaEditar) {
        document.getElementById("titulo").value = mensagemParaEditar.titulo;
        document.getElementById("mensagem").value = mensagemParaEditar.mensagem;
        document.getElementById("privacidade").value = mensagemParaEditar.privacidade;
        setMensagemEditando(id);
        const modal = document.querySelector("dialog");
        if (modal) modal.showModal();
      }
    }
    setMenuAberto(false); // Fecha o menu após selecionar uma opção
  };

  // Filtrar mensagens públicas
  const mensagensVisiveis = mensagens.filter((mensagem) => mensagem.privacidade === "publico");

  return (
    <>
      <header>
        <img src={Logo} className="logo" alt="logo do app" />
        <h1>Gerenciador de mensagens</h1>
      </header>

      <section className="perfil">
        <div className="perfil-content">
          <img src={Background} className="background" alt="fundo colorido com árvores" />
          <div className="usuario">
            <img src={Perfil} className="foto-perfil" alt="foto mulher feliz" />
            <div className="info-user">
              <h2>Usuario Feliz</h2>
              <p>@User</p>
            </div>
          </div>

          {/* Botão para adicionar nova mensagem */}
          <div className="mensagem">
            <button onClick={() => document.querySelector("dialog").showModal()}>
              Adicionar nova mensagem +
            </button>
          </div>

          {/* Modal para adicionar/editar mensagem */}
          <dialog>
            <div className="modal">
              <div className="modal-content">
                <h2>Nova mensagem</h2>
                <div className="info-modal">
                  <label htmlFor="privacidade">Privacidade</label>
                  <select id="privacidade" name="privacidade">
                    <option value="publico">Público</option>
                    <option value="privado">Privado</option>
                  </select>

                  <label htmlFor="titulo">Título</label>
                  <input name="titulo" id="titulo" required maxLength="30" />

                  <label htmlFor="mensagem">Mensagem (250 caracteres)</label>
                  <textarea name="mensagem" id="mensagem" required maxLength="250"></textarea>

                  <button id="adicionar" onClick={handleAdicionarMensagem}>Adicionar</button>
                </div>
              </div>
            </div>
          </dialog>

          {/* Lista de mensagens */}
          {mensagensVisiveis.map((mensagem) => (
            <div className="card" key={mensagem.id}>
              <div className="card-container">
                <div className="info-card">
                  <img src={Perfil} className="foto-perfil" alt="foto mulher feliz" />
                  <div className="user-content">
                    <h2>Usuario Feliz</h2>
                    <p>Publicado em {mensagem.dataCriacao}</p>
                  </div>
                <div className="acoes-container">
                     {/* Botão para abrir menu de ações */}
                  <button id="acoes" onClick={() => setMenuAberto(!menuAberto)}>...</button>

{/* Dropdown com as opções de editar e excluir */}
{menuAberto && (
  <div className="dropdown">
    <button onClick={() => handleAcaoMensagem("editar", mensagem.id)}>Editar</button>
    <button onClick={() => handleAcaoMensagem("excluir", mensagem.id)}>Excluir</button>
  </div>
)}
                </div>
                 
                </div>

                {/* Conteúdo da mensagem */}
                <div className="mensagem-content">
                  <h3>{mensagem.titulo}</h3>
                  <p>{mensagem.mensagem}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
