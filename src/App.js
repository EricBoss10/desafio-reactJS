import React, {useEffect, useState} from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setReporitories] = useState([]);

  useEffect(()=>{
    api.get('/repositories').then(response =>{
      setReporitories(response.data);
    });
  },[]);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: 'Desafio Eric ReactJs',
      url: 'https://github.com/rocketseat/Eric',
      techs: ['Node.js','ReactJS']
    });

    const repository = response.data

    setReporitories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`,);
    
    setReporitories(repositories.filter(
      repository => repository.id !== id
    ))
    
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => <li key={repository.id}>
          {repository.title}
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>)}
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
