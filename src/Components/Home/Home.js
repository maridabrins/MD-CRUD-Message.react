import React , {useEffect} from "react";
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
                        </div>
                    </div>
                </div>
            </dialog>

            <div className="card">
                <div className="card-container">
                    <div className="info-card">
                        <img src= {Perfil} className="foto-perfil" alt="foto mulher feliz"/>
                        <div className="user-content">
                            <h2>Usuario Feliz</h2>
                            <p>Publicado em 26/04/2025</p>
                        </div>
                        
                        <label for="acoes">...</label>
                        <select name="acoes" id="acoes">
                            <option value="editar">Editar</option>
                            <option value="excluir">Excluir</option>
                        </select>
                    </div>

                    <div className="mensagem-content">
                        <h3>Titulo</h3>
                        <p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
                    </div>
                </div>
                
            </div>
           </div>
            
        </section>
        </>
    );
}