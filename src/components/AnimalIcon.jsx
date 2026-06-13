import { useState } from 'react';
import { animalImagePath } from '../data.js';
import styles from './AnimalIcon.module.css';

// Small inline animal icon for buttons/lists — image with emoji fallback
export default function AnimalIcon({ char, size = 'sm' }) {
  const [imgError, setImgError] = useState(false);
  const sizeClass = styles[size] || styles.sm;

  if (imgError) {
    return <span className={`${styles.fallback} ${sizeClass}`}>{char.emoji}</span>;
  }

  return (
    <img
      src={animalImagePath(char.id)}
      alt={char.name}
      className={`${styles.img} ${sizeClass}`}
      onError={() => setImgError(true)}
    />
  );
}
