import { useState } from 'react';
import { animalImagePath } from '../data.js';
import styles from './CharacterAvatar.module.css';

export default function CharacterAvatar({ char, size = 'md', hidden = false }) {
  const [imgError, setImgError] = useState(false);
  const sizeClass = styles[size] || styles.md;

  if (hidden) {
    return (
      <div className={`${styles.avatar} ${sizeClass}`} style={{ background: '#B0A898' }}>
        <span className={styles.qmark}>?</span>
      </div>
    );
  }

  if (imgError) {
    return (
      <div className={`${styles.avatar} ${sizeClass}`} style={{ background: '#fff' }}>
        <span className={styles.emoji}>{char.emoji}</span>
      </div>
    );
  }

  return (
    <div className={`${styles.avatar} ${sizeClass}`} style={{ background: '#fff' }}>
      <img
        src={animalImagePath(char.id)}
        alt={char.name}
        className={styles.img}
        onError={() => setImgError(true)}
      />
    </div>
  );
}