import React from 'react';
import whatsappIcon from '../../assets/images/icons/whatsapp.svg';
import './styles.css';

function TeacherItem () {
    return (
        <article className="teacher-item">
            <header>
                <img src="https://avatars1.githubusercontent.com/u/58356555?s=460&u=662b6e4642018e5c94c2ff6f3ad30cf6f5fc2f14&v=4" alt="Kelvin"/>
                <div>
                    <strong>Kelvin de Miranda Barros</strong>
                    <span>Programação</span>
                </div>
            </header>

            <p>
                Entusiasta de programação.
            </p>

            <footer>
                <p>
                    Preço/hora:
                    <strong>R$ 20,00</strong>
                </p>
                <button type='button'>
                    <img src={ whatsappIcon } alt="Whatsapp"/>
                    Entrar em contato
                </button>
            </footer>
        </article>
    );
}

export default TeacherItem;
