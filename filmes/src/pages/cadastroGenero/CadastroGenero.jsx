import { useEffect, useState } from "react";

// importando a api
import api from "../../Services/services";

// 
import Swal from 'sweetalert2'

// importação de componentes:
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Cadastro from "../../components/cadastro/Cadastro";
import Lista from "../../components/lista/Lista";
import './CadastroGenero.css'

const CadastroGenero = () => {

    // nome do genero
    const [genero, setGenero] = useState("");

    function alerta(icone,mensagem){
        // Alerta - começo
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });
                Toast.fire({
                    icon: icone,
                    title: mensagem
                });

                // Alerta - fim 
    }

    async function cadastrarGenero(e) {
        e.preventDefault();
        // Vereficar se o input esta vindo vazio
        if (genero.trim() != "") {
            try {
                // cadastrar um gênero: post
                await api.post("genero", { nome: genero });
                // alert("obaaaa, cadastrou!!!!")
                alerta("success", "Cadastro realizado com sucesso!")
                setGenero("");
            } catch (error) {
                // alert("deu ruimmmmm!!!");
                alerta("error", "Erro! Entre em contato com o suporte")
                console.log(error);
            }
        } else {
           alerta("error", "Erro! Preencha o campo.")
        }
        // try => tentar(o esperado)
        // catch => lança a exceção
    }

    // function CadastroGenero(){
    //     alert("Entrou dentro da func cadastrarGenero")    
    // }

    // UseEffect(<function>, <dependency>)
    // useEffect(() => {
    //     console.log(genero);
    // }, [genero]);               

    return (
        <>
            <Header />
            <main>
                <Cadastro
                    tituloCadastro="Cadastro de Gênero"
                    visibilidade="none"
                    placeholder="Genero"

                    // Atribuindo função:
                    funcCadastro={cadastrarGenero}
                    // Atribuindo o valor do input: 
                    valorInput={genero}
                    // Atribuindo a função que atualiza o meu genero:
                    setValorInput={setGenero}
                />
                <Lista
                    nomeLista="Lista de Gêneros"
                    visible="none"
                />
            </main>
            <Footer />
        </>
    )
}

export default CadastroGenero;