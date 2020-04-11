import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: `Repository ${Date.now()}`,
      url: "http://github.com/brunoc-cardoso",
      techs: ["ReactJS", "NodeJS", "React Native"]
    });

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`/repositories/${id}`);

      setRepositories(repositories.filter(repository => repository.id !== id));
    } catch(err) {
      alert('Error deleting repository! Try again.');
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        { repositories.map(repository => (
            <li key={repository.id}>{repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
              </button>
            </li>
          ))
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
