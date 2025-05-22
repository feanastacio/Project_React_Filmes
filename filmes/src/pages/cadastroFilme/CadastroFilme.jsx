import { useEffect, useState } from "react";

import api from "../../Services/services"; // importando a api

import Swal from 'sweetalert2'

import { Fragment } from "react";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Cadastro from "../../components/cadastro/Cadastro";
import Lista from "../../components/lista/Lista";

const CadastroFilme = () => {

    const [listaGenero, setListaGenero] = useState([]);
    const [genero, setGenero] = useState("");
    const [filme, setFilme] = useState("");
    const [listaFilme, setListaFilme] = useState([]);

    function alertar(icone, mensagem) {
        // alertar - começo
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
        // alertar - fim 
    }

    async function cadastrarFilme(e){
        // Tratamento de exceção
        e.preventDefault();
        if (filme.trim() !== "") {
            try {
                await api.post("filme", {titulo: filme, idGenero: genero});
                alertar("success", "Cadastro realizado com sucesso!")
                setFilme("");
                setGenero("");
            } catch (error) {
                console.log(error);  
            } 
        } else{
            alertar("error", "Erro! Preencha os campos.")
        }
        // alert("foi chamado o cadastrarfilme")
    }

    async function listarFilme() {
        try {
            const resposta = await api.get("filme") 
            setListaFilme(resposta.data);
        } catch (error) {
            console.log(error);
        }
    }

    async function listarGenero(){ // funcao para trazer os generos no meu select
        try {
            const resposta = await api.get("genero");
            setListaGenero(resposta.data); 
        } catch (error) {
            console.log(error);   
        }
    }

    useEffect(() => {
        listarFilme();
        listarGenero();
    },[]);


    return(
        <Fragment>
            <Header/>
            <main>
                <Cadastro 
                    tituloCadastro="Cadastro de Filme"
                    digiteText="Digite o nome do Filme"
                    lista = {listaGenero}
                    funcCadastro = {cadastrarFilme}
                    valorInput = {filme}
                    setValorInput = {setFilme}
                    valorSelect = {genero}
                    setValorSelect = {setGenero}
                />
                <Lista 
                    nomeLista="Lista de Filmes"
                    tipoLista = "filme"
                    lista = {listaFilme}
                />
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