import Rotas from './Routes/routes';
import { useEffect, useState } from 'react';
import './App.css';
// import Login from './pages/login/Login';
// import CadastroFilme from './pages/cadastroFilme/CadastroFilme';

function App() {

  const [itens, setItens] = useState([])

  useEffect(() => {
    const fetchData = async () =>{
      const result = await fetch('http://localhost:${apiporta}/api/')
        .then(response => response.json())
        .then((data => data))
      setItens(result)
    }
    fetchData()
  }, [])

  return (
      <Rotas/>
  );
}
// exporta de forma padrão o app
export default App;