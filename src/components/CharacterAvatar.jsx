import styles from './CharacterAvatar.module.css';

export default function CharacterAvatar({ char, size = 'md', hidden = false }) {
  const sizeClass = styles[size] || styles.md;
  return (
    <div className={`${styles.avatar} ${sizeClass}`} style={{ background: hidden ? '#B0A898' : char.color }}>
      {hidden
        ? <span className={styles.qmark}>?</span>
        : <span className={styles.emoji}>{char.emoji}</span>
      }
    </div>
  );
}
