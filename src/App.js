import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import api from './services/api';
import './styles.css';

function App() {

  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});

  async function handleSearch(){
    //https://viacep.com.br/ws/01001000/json/
    if(input === ''){
      alert('Preencha algum CEP!')
      return;
    }

    try{
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput('');
    }
    catch{
      alert("Ops erro ao buscar :(");
      setInput('');
    }
  }

  return (
    <div className="container">
      <h1 className='title'>Buscador de CEP</h1>
      <div className='containerInput'>
        <input 
          type='text'
          placeholder='Digite seu CEP'
          value={input}
          onChange={ (e) => setInput(e.target.value)}
          />
          <button className='searchButton' onClick={handleSearch}>
            <FiSearch size={25} color="#FFF"></FiSearch>
          </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className='main'>
          <h2>CEP: {cep.cep}</h2>

          <span>{cep.logradouro}</span>
          {cep.complemento && (
            <span>Comeplemento: {cep.complemento}</span>
          )}
          <span>{cep.bairro}</span>
          <span>{cep.localidade} - {cep.uf}</span>
        </main>
      )}
    </div>
  );
}

export default App;
