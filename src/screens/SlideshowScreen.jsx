import { useState } from 'react';
import { LIKE_EMOJI, CATEGORIES, CATEGORY_COLORS } from '../data.js';
import CharacterAvatar from '../components/CharacterAvatar.jsx';
import styles from './SlideshowScreen.module.css';

export default function SlideshowScreen({ game, onDone }) {
  const [idx, setIdx] = useState(0);
  const char = game.characters[idx];
  const total = game.characters.length;

  function next() {
    if (idx < total - 1) setIdx(idx + 1);
    else onDone();
  }
  function prev() { if (idx > 0) setIdx(idx - 1); }

  return (
    <div className={styles.screen}>
      <div className={styles.header}>
        <span className={styles.progress}>{idx + 1} / {total}</span>
        <div className={styles.dots}>
          {game.characters.map((_, i) => (
            <div key={i} className={`${styles.dot} ${i === idx ? styles.dotActive : i < idx ? styles.dotDone : ''}`} />
          ))}
        </div>
      </div>

      <div className={styles.slide} key={char.id}>
        {/* Left */}
        <div className={styles.leftPanel}>
          <CharacterAvatar char={char} size="xxl" />
          <p className={styles.greeting}>
            Hello, my name is<br />
            <span className={styles.charName}>{char.name}!</span>
          </p>
        </div>

        {/* Right */}
        <div className={styles.rightPanel}>
          <p className={styles.ilike}>I like...</p>
          <div className={styles.likeGrid}>
            {Object.entries(char.likes).map(([cat, val]) => (
              <div key={cat} className={styles.likeCard} style={{ background: CATEGORY_COLORS[cat] }}>
                <div className={styles.likeEmoji}>{LIKE_EMOJI[val]}</div>
                <div className={styles.likeVal}>{val}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.nav}>
        <button className={styles.navBtn} onClick={prev} disabled={idx === 0}>← Back</button>
        <button className={`${styles.navBtn} ${styles.navNext}`} onClick={next}>
          {idx === total - 1 ? 'Start Quiz! 🎯' : 'Next →'}
        </button>
      </div>
    </div>
  );
}