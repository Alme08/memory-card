import { useState, useEffect } from 'react';
import Card from './components/card';

function App() {
  const [data, setData] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [clickedCards, setClickedCards] = useState([]);
  const [level, setLevel] = useState(0);
  const [loading, setLoading] = useState(true);
  const [errorLoading, setErrorLoading] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const promises = [];
        const random = [];

        while (random.length < (((level * 5) + 5))) {
          const number = Math.floor(Math.random() * 152) + 1;
          if (!random.includes(number))random.push(number);
        }

        for (let i = 0; i < ((level * 5) + 5); i += 1) promises.push(fetch(`https://pokeapi.co/api/v2/pokemon/${random[i]}`));

        const responses = await Promise.all(promises);
        const jsonResponses = await Promise.all(responses.map((response) => response.json()));
        setData(jsonResponses);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setErrorLoading(true);
      }
    };

    setLoading(true);
    setClickedCards([]);
    fetchData();
  }, [level]);

  const randomArray = () => {
    const randomData = [...data];
    for (let i = randomData.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [randomData[i], randomData[j]] = [randomData[j], randomData[i]];
    }
    setData(randomData);
  };

  const handleCardClick = (cardId) => {
    // If the card has already been clicked, reset the current score and the clicked card array
    if (clickedCards.includes(cardId)) {
      setGameOver(true);
    } else {
      const newScore = score + 1;
      setScore(newScore);
      setClickedCards([...clickedCards, cardId]);

      if (newScore > bestScore) setBestScore(newScore);
      if (clickedCards.length === ((level * 5) + 4)) setLevel(level + 1);
    }
    randomArray();
  };

  if (loading) {
    return (
      <h1>Loading...</h1>
    );
  }

  if (errorLoading) {
    return (
      <h1>Error</h1>
    );
  }

  if (gameOver) {
    return (
      <div>
        <h1>Game Over</h1>
        <p>
          Your score:
          {' '}
          {score}
        </p>
        <p>
          Best score:
          {' '}
          {bestScore}
        </p>
        <button
          type="button"
          onClick={() => {
            setScore(0);
            setLevel(0);
            setGameOver(false);
          }}
        >
          Restart

        </button>
      </div>
    );
  }
  return (
    <>
      <p>
        Score:
        {' '}
        {score}
      </p>
      <p>
        Best score:
        {' '}
        {bestScore}
      </p>
      <div>
        {
        data.map((pok) => <Card key={pok.id} pok={pok} handleCardClick={handleCardClick} />)
      }
      </div>
    </>
  );
}

export default App;
