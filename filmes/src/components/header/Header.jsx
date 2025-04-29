import "./Header.css"
import Logo from "../../assets/img/logo.svg"
import { Link } from "react-router-dom";

const Header = () => {
    return(
        <header>
            <div className="layout_grid cabecalho">
                <Link to="/">
                    {/* Ao clicar no link, ele vai te direcionar a tela de login */}
                    <img src={Logo} alt="Logo do Filmoteca" />
                </Link>

            <nav className="nav_header">
                <Link className="link_header" to="/Filme">Filme</Link>
                <Link className="link_header" to="/Genero">Gênero</Link>
            </nav>
            </div>
        </header>
    )
}

export default Header;