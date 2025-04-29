import { Fragment } from "react";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Cadastro from "../../components/cadastro/Cadastro";
import Lista from "../../components/lista/Lista";

const CadastroGenero = () => {
    return(
        <>
            <Header/>
            <main>
             <Cadastro tituloCadastro="Cadastro de Gênero"
             visibilidade = "none"
             digiteText="Digite o Gênero"/>
             <Lista/>
            </main>
            <Footer/>
        </>
    )
}

export default CadastroGenero;