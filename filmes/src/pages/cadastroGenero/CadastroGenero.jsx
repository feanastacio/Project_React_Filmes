import { use, useEffect, useState } from "react";

import api from "../../Services/services"; // importando a api

import Swal from 'sweetalert2'

// importação de componentes:
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Cadastro from "../../components/cadastro/Cadastro";
import Lista from "../../components/lista/Lista";
import './CadastroGenero.css'
import { data } from "react-router-dom";

const CadastroGenero = () => {

    // nome do genero
    // Só criamos o useState quando precisamos guardar uma informação que muda e que o React precisa acompanhar
    // Quem que eu vou manipular???
    const [genero, setGenero] = useState("");
    const [listaGenero, setListaGenero] = useState([]);

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

    async function cadastrarGenero(e) {
        e.preventDefault();
        // Vereficar se o input esta vindo vazio
        if (genero.trim() != "") {
            try {
                // cadastrar um gênero: post
                await api.post("genero", { nome: genero });
                // alert("obaaaa, cadastrou!!!!")
                alertar("success", "Cadastro realizado com sucesso!")
                setGenero("");
                listaGenero(); //Atualiza minha lista assim que algo é adicionado
            } catch (error) {
                // alert("deu ruimmmmm!!!");
                alertar("error", "Erro! Entre em contato com o suporte")
                console.log(error);
            }
        } else {
            alertar("error", "Erro! Preencha o campo.")
        }
        // try => tentar(o esperado)
        // catch => lança a exceção
    }

    async function listarGenero() {
        try {
            // await - Aguarda ter uma  resposta da solicitação
            const resposta = await api.get("genero")
            // console.log(resposta.data[3]);
            setListaGenero(resposta.data);
        } catch (error) {
            console.log(error);
        }
    }

    async function excluirGenero(generoId) {
        Swal.fire({
            title: "Você tem certeza?",
            text: "Você não vai conseguir reverter isso!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim, quero deletar!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await api.delete(`genero/${generoId.idGenero}`);
                    alertar("success", "Gênero excluido com sucesso!")
                    listaGenero();
                } catch (error) {
                    console.log(error);
                }
                // Swal.fire({
                //     title: "Deletado!",
                //     text: "seu arquivo foi apagado com sucesso!",
                //     icon: "success"
                // });
            }
        });
        // Alerta - fim        
    }

    async function editarGenero(genero) {
        // console.log(genero);  //Serve para aparecer no inspecionar
        const { value: novoGenero } = await Swal.fire({
            title: "Modifique o seu gênero: ",
            input: "text",
            inputLabel: "Novo Gênero",
            inputValue: genero.nome, // é o valor que já vai vim preenchido tenho do campo
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                    return "Esse campo precisa estar preenchido!";
                }
            }
        });
        if (novoGenero) {
            try {
                api.put(`genero/${genero.idGenero}`, {nome: novoGenero});
                Swal.fire(`O gênero foi modificado ${novoGenero}`);
                listaGenero();
            } catch (error) {
                console.log(error);
            }
        }
    }

    useEffect(() => {
        // ao nascer
        // alterada(excluir, editar um item ou adicionar) 
        // alertar("sucess", "Lista modificada")
        listarGenero(); // Assim que minha tela for recrregada vai ser chamada minha função listarGenero, fazendo com que apareça na tela
    }, [listaGenero])  // fim de teste

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
                    tipoLista = "genero"
                    lista={listaGenero}
                    funcExcluir={excluirGenero}
                    funcEditar={editarGenero}
                />
            </main>
            <Footer />
        </>
    )
}

export default CadastroGenero;