import { useState } from 'react';
import { CATEGORY_COLORS } from '../data.js';
import CharacterAvatar from '../components/CharacterAvatar.jsx';
import LikeImage from '../components/LikeImage.jsx';
import styles from './SlideshowScreen.module.css';

const VOWEL_START = ['a','e','i','o','u'];
function article(name) {
  return VOWEL_START.includes(name[0].toLowerCase()) ? 'an' : 'a';
}

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
            Hello, I'm {article(char.name)}<br />
            <span className={styles.charName}>{char.name}!</span>
          </p>
        </div>

        {/* Right */}
        <div className={styles.rightPanel}>
          <p className={styles.ilike}>I like...</p>
          <div className={styles.likeGrid}>
            {Object.entries(char.likes).map(([cat, val]) => (
              <div key={cat} className={styles.likeCard} style={{ background: CATEGORY_COLORS[cat] }}>
                <LikeImage category={cat} value={val} size="lg" />
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
