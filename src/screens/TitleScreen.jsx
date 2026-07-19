import { useState } from 'react';
import styles from './TitleScreen.module.css';

const COUNTS = [4, 6, 8];

export default function TitleScreen({ onStart }) {
  const [count, setCount] = useState(8);
  return (
    <div className={styles.screen}>
      <div className={styles.card}>
        <div className={styles.emoji}>🎌</div>
        <h1 className={styles.title}>Character Quiz</h1>
        <p className={styles.sub}>Who likes what?</p>
        <div className={styles.countSection}>
          <p className={styles.countLabel}>How many characters?</p>
          <div className={styles.toggle}>
            {COUNTS.map(n => (
              <button
                key={n}
                className={`${styles.toggleBtn} ${count === n ? styles.toggleActive : ''}`}
                onClick={() => setCount(n)}
              >{n}</button>
            ))}
          </div>
        </div>
        <button className={styles.btn} onClick={() => onStart(count)}>
          Start Game ✨
        </button>
      </div>
    </div>
  );
}