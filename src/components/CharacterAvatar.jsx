import { useState } from 'react';
import { animalImagePath } from '../data.js';
import styles from './CharacterAvatar.module.css';

// Fills its parent container — wrap in a sized box from the parent layout.
// The circle stays square (aspect-ratio: 1) and shrinks to fit within
// whichever dimension of the parent is smaller.
export default function CharacterAvatar({ char, hidden = false }) {
  const [imgError, setImgError] = useState(false);

  if (hidden) {
    return (
      <div className={styles.avatar} style={{ background: '#B0A898' }}>
        <span className={styles.qmark}>?</span>
      </div>
    );
  }

  if (imgError) {
    return (
      <div className={styles.avatar} style={{ background: '#fff' }}>
        <span className={styles.emoji}>{char.emoji}</span>
      </div>
    );
  }

  return (
    <div className={styles.avatar} style={{ background: '#fff' }}>
      <img
        src={animalImagePath(char.id)}
        alt={char.name}
        className={styles.img}
        onError={() => setImgError(true)}
      />
    </div>
  );
}