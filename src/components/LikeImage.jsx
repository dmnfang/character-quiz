import { useState } from 'react';
import { likeImagePath, LIKE_EMOJI } from '../data.js';
import styles from './LikeImage.module.css';

export default function LikeImage({ category, value, size = 'md' }) {
  const [imgError, setImgError] = useState(false);
  const sizeClass = styles[size] || styles.md;
  if (imgError) return <span className={`${styles.fallback} ${sizeClass}`}>{LIKE_EMOJI[value]}</span>;
  return <img src={likeImagePath(category, value)} alt={value} className={`${styles.img} ${sizeClass}`} onError={() => setImgError(true)} />;
}