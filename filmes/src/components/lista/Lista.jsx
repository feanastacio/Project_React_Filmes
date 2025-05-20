import "./Lista.css";

import Editar from "../../assets/img/pen-to-square-solid.svg";
import Excluir from "../../assets/img/trash-can-regular.svg";

const Lista = (props) => {
    return(
        <section className="layout_grid listagem">
            <h1>{props.nomeLista}</h1>
            <hr/>
            <div className="tabela">
                <table>
                    {/* cabeçalho da tabela */}
                    <thead>
                        {/* tr => table row */}
                        <tr className="table_cabecalho">
                            {/* th => table head */}
                            <th>Nome</th>
                            <th style={{display:props.visible}} >Gênero</th>
                            <th>Editar</th>
                            <th>Excluir</th>
                        </tr>
                    </thead>
                    {/* tbody => corpo da tabela */}
                    <tbody>
                    {props.lista && props.lista.length > 0 ? (
                        // vamos mapear os itens da lista 
                        props.lista.map((item) => (
                            <tr className="item_lista" key={item.idGenero}>
                                <td data-cell="Nome">
                                    {item.nome}
                                </td>
                                <td style={{display:props.visible}} data-cell="Gênero">Ação</td>
                                <td data-cell="Editar"><img src={Editar} alt="Caneta" onClick={()=> (props.funcEditar(item))} /></td>
                                <td data-cell="Excluir"><img src={Excluir} alt="Lixeira" onClick={()=> (props.funcExcluir(item))}/></td>
                            </tr>
                        ))): (
                        <p>Nenhum genero encontrado</p>
                        )
                    }
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default Lista;