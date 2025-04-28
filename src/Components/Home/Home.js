import React , {useState, useEffect} from "react";
import "./style.css"
import Logo from "../../assets/images/Logo.svg"
import Perfil from "../../assets/images/Perfil.svg"
import Background from "../../assets/images/Background.svg"

export default function Home(){

    // Hooks para abrir modal
    useEffect(() => {
        const adicionarNova = document.querySelector(".mensagem button");
        const modal = document.querySelector("dialog");

        if (adicionarNova && modal) {
            adicionarNova.onclick = function() {
                modal.showModal();
            };
        }
    }, []);

    const [mensagens, setMensagens] = useState([])

    //carregando as mensagens para o LocalStorage
    useEffect(()=> {
        const savedMessages =JSON.parse(localStorage.getItem("mensagens")) || []
        setMensagens(savedMessages)
    },[])

    const obterProximoId = () => {
        // Buscar o último ID no localStorage
        const ultimoId = localStorage.getItem("ultimoId");
        // Se não houver ID, começamos com o 1
        if (!ultimoId) {
          localStorage.setItem("ultimoId", 1);
          return 1;
        }

        // Caso contrário, incrementamos o ID
        const novoId = parseInt(ultimoId) + 1;
        localStorage.setItem("ultimoId", novoId);
        return novoId;
      };
      
      // Função para adicionar a mensagem
      const adicionarMensagem = (titulo, mensagem, privacidade) => {
        const id = obterProximoId();
        const novaMensagem = {
            id, 
            titulo,
            mensagem,
            privacidade,
            dataCriacao: new Date().toLocaleDateString()
        }
            const mensagens = JSON.parse(localStorage.getItem("savedMessages")) || [];

            // Adicionar a nova mensagem à lista
            mensagens.push(novaMensagem)
            // Salvar novamente no localStorage
            localStorage.setItem("savedMessages", JSON.stringify(mensagens))

            setMensagens((prevMensagens) => {
                const novasMensagens = [...prevMensagens, novaMensagem];
                localStorage.setItem("mensagens", JSON.stringify(novasMensagens));
                return novasMensagens;
            });

            
        
        }

        const mensagensVisiveis = mensagens.filter(mensagem => mensagem.privacidade === "publico");



    

    const salvarMensagem = (novasMensagens) =>{
        localStorage.setItem("mensagens", JSON.stringify(novasMensagens))
    }

    const handleAdicionarMensagem = () =>{

        const titulo = document.getElementById("titulo").value;
        const mensagem = document.getElementById("mensagem").value;
        const privacidade = document.getElementById("privacidade").value;
        
        //adicionar uma nova mensagem ao clicar no botão dentro do modal
        adicionarMensagem(titulo, mensagem, privacidade)

        //Ao clicar no botão fechar o modal
        const modal = document.querySelector("dialog")
        if(modal){
            modal.close()
        }

    }

    return (
        <>
        <header>
            <img src={Logo} className="logo" alt="logo do app"/>
            <h1>Gerenciador de mensagens</h1>
        </header>

        <section className="perfil">
        
           <div className="perfil-content">
                <img src= {Background} className="background" alt="fundo colorido com arvores"/>
           <div className="usuario">
                <img src= {Perfil} className="foto-perfil" alt="foto mulher feliz"/>
                <div className="info-user">
                <h2>Usuario Feliz</h2>
                <p>@User</p>
                </div>
                
            </div>

            <div className="mensagem">
                <button> Adicionar nova mensagem +</button>
            </div>

            <dialog>
                <div className="modal">
                    <div className="modal-content">
                        <h2>Nova mensagem</h2>

                        <div className="info-modal">

                            <label for="privacidade">Privacidade</label>
                            <select id="privacidade" name="privacidade">
                                <option value="publico">Público</option>
                                <option value="privado">Privado</option>
                            </select>
                           
                            <label for="titulo">Titulo</label>
                            <input name="titulo" id="titulo" required maxLength="30"/>

                            <label for="mensagem">Mensagem (250 caracteres)</label>
                            <textarea name="mensagem" id="mensagem" required maxLength="250"></textarea>

                            <button onClick={handleAdicionarMensagem}>Adicionar</button>
                        </div>
                    </div>
                </div>
            </dialog>

             {mensagensVisiveis.map(mensagem => (
                <div className="card" key={mensagem.id}>
                    <div className="card-container">
                        <div className="info-card">
                            <img src={Perfil} className="foto-perfil" alt="foto mulher feliz"/>
                            <div className="user-content">
                                <h2>Usuario Feliz</h2>
                                <p>Publicado em {mensagem.dataCriacao}</p>
                            </div>
                            <label htmlFor="acoes">...</label>
                            <select name="acoes" id="acoes">
                                <option value="editar">Editar</option>
                                <option value="excluir">Excluir</option>
                            </select>
                        </div>

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