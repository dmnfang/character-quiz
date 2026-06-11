import confetti from 'canvas-confetti';
import { useEffect } from 'react';
import CharacterAvatar from '../components/CharacterAvatar.jsx';
import styles from './EndScreen.module.css';

export default function EndScreen({ game, results, onRestart }) {
  const { characters, quizOrder } = game;
  const score = results.filter(r => r.correct).length;
  const total = results.length;

  useEffect(() => {
    if (score >= 6) {
      confetti({ particleCount: 200, spread: 100, origin: { y: 0.4 } });
    }
  }, []);

  const medal = score === 8 ? '🥇' : score >= 6 ? '🥈' : score >= 4 ? '🥉' : '💪';
  const msg   = score === 8 ? 'Perfect score!'
              : score >= 6 ? 'Great job!'
              : score >= 4 ? 'Not bad!'
              : 'Keep practicing!';

  return (
    <div className={styles.screen}>
      <div className={styles.hero}>
        <div className={styles.medal}>{medal}</div>
        <h1 className={styles.score}>{score} / {total}</h1>
        <p className={styles.msg}>{msg}</p>
      </div>

      <div className={styles.grid}>
        {quizOrder.map((charIdx, qi) => {
          const char = characters[charIdx];
          const correct = results[qi]?.correct;
          return (
            <div key={char.id} className={`${styles.card} ${correct ? styles.cardCorrect : styles.cardWrong}`}>
              <div className={styles.cardNum}>Q{qi + 1}</div>
              <CharacterAvatar char={char} size="md" />
              <div className={styles.cardName}>{char.name}</div>
              <div className={styles.cardResult}>{correct ? '✓' : '✗'}</div>
            </div>
          );
        })}
      </div>

      <div className={styles.footer}>
        <button className={styles.restartBtn} onClick={onRestart}>
          Play Again 🎯
        </button>
      </div>
    </div>
  );
}
