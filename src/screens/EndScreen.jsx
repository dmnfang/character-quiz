import confetti from 'canvas-confetti';
import { useEffect } from 'react';
import AnimalIcon from '../components/AnimalIcon.jsx';
import styles from './EndScreen.module.css';

function gridCols(count) {
  if (count <= 4) return 2;
  if (count <= 6) return 3;
  return 4;
}

export default function EndScreen({ game, results, onRestart }) {
  const { characters, quizOrder, count } = game;
  const score = results.filter(r => r.correct).length;
  const total = results.length;
  const perfect = score === total;

  useEffect(() => {
    if (score >= total * 0.75) confetti({ particleCount: 200, spread: 100, origin: { y: 0.4 } });
  }, []);

  const medal = perfect ? '🥇' : score >= total * 0.75 ? '🥈' : score >= total * 0.5 ? '🥉' : '💪';
  const msg = perfect ? 'Perfect score!' : score >= total * 0.75 ? 'Great job!' : score >= total * 0.5 ? 'Not bad!' : 'Keep practicing!';
  const cols = gridCols(count);

  return (
    <div className={styles.screen}>
      <div className={styles.hero}>
        <div className={styles.medal}>{medal}</div>
        <h1 className={styles.score}>{score} / {total}</h1>
        <p className={styles.msg}>{msg}</p>
      </div>
      <div className={styles.grid} style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
        {quizOrder.map((charIdx, qi) => {
          const char = characters[charIdx];
          const correct = results[qi]?.correct;
          return (
            <div key={char.id} className={`${styles.card} ${correct ? styles.cardCorrect : styles.cardWrong}`}>
              <div className={styles.cardNum}>Q{qi + 1}</div>
              <div className={styles.cardResult}>{correct ? '✓' : '✗'}</div>
              <div className={styles.cardImgWrap}><AnimalIcon char={char} size="fill" /></div>
              <div className={styles.cardName}>{char.name}</div>
            </div>
          );
        })}
      </div>
      <div className={styles.footer}>
        <button className={styles.restartBtn} onClick={onRestart}>Play Again 🎯</button>
      </div>
    </div>
  );
}