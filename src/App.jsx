import { useState } from 'react';
import { buildGame } from './gameLogic.js';
import TitleScreen from './screens/TitleScreen.jsx';
import SlideshowScreen from './screens/SlideshowScreen.jsx';
import QuizScreen from './screens/QuizScreen.jsx';
import EndScreen from './screens/EndScreen.jsx';
import './index.css';

export default function App() {
  const [screen, setScreen] = useState('title'); // title | slideshow | quiz | end
  const [game, setGame] = useState(null);
  const [results, setResults] = useState([]); // { charIndex, correct }[]

  function startGame() {
    setGame(buildGame());
    setResults([]);
    setScreen('slideshow');
  }

  function startQuiz() {
    setScreen('quiz');
  }

  function finishQuiz(r) {
    setResults(r);
    setScreen('end');
  }

  function restart() {
    setGame(null);
    setScreen('title');
  }

  return (
    <>
      {screen === 'title'      && <TitleScreen onStart={startGame} />}
      {screen === 'slideshow'  && game && <SlideshowScreen game={game} onDone={startQuiz} />}
      {screen === 'quiz'       && game && <QuizScreen game={game} onDone={finishQuiz} />}
      {screen === 'end'        && game && <EndScreen game={game} results={results} onRestart={restart} />}
    </>
  );
}
