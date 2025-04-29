import { Fragment } from "react";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Cadastro from "../../components/cadastro/Cadastro";
import Lista from "../../components/lista/Lista";

const CadastroFilme = () => {
    return(
        <Fragment>
            <Header/>
            <main>
             <Cadastro tituloCadastro="Cadastro de Filme"
             digiteText="Digite o nome do Filme"/>
             <Lista/>
            </main>
            <Footer/>
        </Fragment>

        // Ou só <> </> resolveria também
        // <>
        //     <Header/>
        //     <Footer/>
        // </>
    )
}

export default CadastroFilme;