import { useState, useEffect } from 'react';
import Card from './components/card';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [score, setScore] = useState(0);
  // const [bestScore, setBestScore] = useState(0);

  const fetchData = async () => {
    try {
      const promises = [];
      const random = [];
      while (random.length < 10) {
        const number = Math.floor(Math.random() * 152) + 1;
        if (!random.includes(number))random.push(number);
      }
      for (let i = 0; i < 10; i += 1) {
        promises.push(fetch(`https://pokeapi.co/api/v2/pokemon/${random[i]}`));
      }
      const responses = await Promise.all(promises);
      const jsonResponses = await Promise.all(responses.map((response) => response.json()));
      setData(jsonResponses);
      setLoading(false);
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <h1>Loading...</h1>
    );
  }

  return (
    <div>
      {
        data.map((pok) => <Card key={pok.id} pok={pok} />)
      }
    </div>
  );
}

export default App;
