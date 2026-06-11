import styles from './TitleScreen.module.css';

export default function TitleScreen({ onStart }) {
  return (
    <div className={styles.screen}>
      <div className={styles.card}>
        <div className={styles.emoji}>🎌</div>
        <h1 className={styles.title}>Character Quiz</h1>
        <p className={styles.sub}>Who likes what?</p>
        <button className={styles.btn} onClick={onStart}>
          Start Game ✨
        </button>
      </div>
    </div>
  );
}
