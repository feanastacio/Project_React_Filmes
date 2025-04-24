import "./Lista.css"

const Lista = () => {
    return (
        <section>
            <h1>Lista dos Filmes</h1>
            <hr />
            <div className="tabela">
                <table>
                    {/* Cabeçalho da tabela */}
                    <thead>
                        {/* tr - table row (linha tabela) */}
                        <tr className="cabecalho">
                            {/* th - table head (cabeça da tabela) */}
                            <th>Nome</th>
                            <th>Gênero</th>
                            <th>Editar</th>
                            <th>Excluir</th>
                        </tr>
                    </thead>
                    {/* tbody => corpo da tabela */}
                    <tbody>
                        
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default Lista;