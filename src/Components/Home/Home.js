import React from "react";
import "./style.css"
import Logo from "../../assets/images/Logo.svg"
import Perfil from "../../assets/images/Perfil.svg"
import Background from "../../assets/images/Background.svg"

export default function Home(){
    return (
        <>
        <header>
            <img src={Logo} className="logo" alt="logo do app"/>
            <h1>Gerenciador de mensagens</h1>
        </header>

        <section className="perfil">
            <div>
                 <img src= {Background} className="background" alt="fundo colorido com arvores"/>
            </div>
            <div className="usuario">
                <img src= {Perfil} className="foto de perfil" alt="foto mulher feliz"/>
                <h2>Usuario Feliz</h2>
                <p>@User</p>
            </div>

            <div className="mensagem">
                <h2>Adicionar nova mensagem</h2>
                <button>+</button>
            </div>

            <div className="card">

                <div className="info-usuario">
                <img src= {Perfil} className="foto de perfil" alt="foto mulher feliz"/>
                <h2>Usuario Feliz</h2>
                <p>Publicado em 26/04/2025</p>
                <p className="active">...</p>
                </div>

                <div className="card-content">
                    <p> Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
                </div>
            </div>
        </section>
        </>
    );
}