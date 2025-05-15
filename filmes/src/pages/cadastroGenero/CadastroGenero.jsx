import { use, useEffect, useState } from "react";

// importando a api
import api from "../../Services/services";

// 
import Swal from 'sweetalert2'

// import axios from "axios";

// importação de componentes:
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Cadastro from "../../components/cadastro/Cadastro";
import Lista from "../../components/lista/Lista";
import './CadastroGenero.css'
import { data } from "react-router-dom";

const CadastroGenero = () => {

    // nome do genero
    const [genero, setGenero] = useState("");
    const [listaGenero, setListaGenero] = useState([]);
    const [excluiGenero, setExcluirGenero] = useState([]);

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

    // async function excluirGenero(e){
    //     e.preventDefault();
    //     try {
    //         await api.delete("genero", {nome: genero, id: genero})
    //         alerta("sucess", "Gênero deletado com sucesso!")
    //         setExcluirGenero("");
    //     } catch (error) {
    //         alerta("error", "Erro! Entre em contato com o suporte")
    //         console.log(error);
    //     }
    // }

    async function listarGenero(){
        try{
            // await - Aguarda ter uma  resposta da solicitação
            const resposta = await api.get("genero")
            // console.log(resposta.data[3]);
            setListaGenero(resposta.data);           
        }catch(error){
           console.log(error);
        }
    }

    async function excluirGenero(generoId){
        await api.delete(`genero/${generoId.idGenero}`)
        alerte("success", "Gênero deletado com sucesso!")
        setExcluirGenero("");
    }

    useEffect(() => {    
        listarGenero();
    }, [listarGenero])
    // fim de teste

    function alerte(icone,mensagem){
            // Alerta - começo
        Swal.fire({
            title: "Você tem certeza?",
            text: "Após a confirmação não vai ter como reverter",
            icon: "Perigo",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim, quero deletar!"
        }).then(async(result) => {
             if (result.isConfirmed) {
                await Swal.fire({
                    title: "Deletado!",
                    text: "Seu gênero foi deletado com sucesso",
                    icon: "success"
                });
            }
        });
             // Alerta - fim 
    }

    // function CadastroGenero(){
    //     alert("Entrou dentro da func cadastrarGenero")    
    // }

    // UseEffect(<function>, <dependency>)
    // useEffect(() => {
    //     console.log(genero);
    // }, [genero]);    
    
    // Assim que a página renderizar,, o método listarGenero() será chamado
    // teste: validar o que esta sendo sendo passado como resposta em listarGenero

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
                    // atribuir para lista, o meu estado atual:
                    lista={listaGenero}
                    funcExcluir = {excluirGenero}
                />
            </main>
            <Footer />
        </>
    )
}

export default CadastroGenero;