import { useState, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { LIKE_EMOJI, CATEGORIES, CATEGORY_COLORS } from '../data.js';
import CharacterAvatar from '../components/CharacterAvatar.jsx';
import styles from './QuizScreen.module.css';

const CATS = ['color', 'sport', 'food', 'animal'];

export default function QuizScreen({ game, onDone }) {
  const { characters, quizOrder } = game;
  const [qIdx, setQIdx] = useState(0);       // index into quizOrder
  const [flipped, setFlipped] = useState([]); // cat keys revealed
  const [phase, setPhase] = useState('flip'); // flip | guess | result
  const [shaking, setShaking] = useState(false);
  const [guess, setGuess] = useState(null);   // character id or null
  const [results, setResults] = useState([]);

  const charIdx = quizOrder[qIdx];
  const char = characters[charIdx];

  const flipTile = useCallback((cat) => {
    if (phase !== 'flip') return;
    if (flipped.includes(cat)) return;
    if (flipped.length >= 2) return;

    const next = [...flipped, cat];
    setFlipped(next);

    if (next.length === 2) {
      // Trigger shake then show name buttons
      setShaking(true);
      setTimeout(() => {
        setShaking(false);
        setPhase('guess');
      }, 800);
    }
  }, [phase, flipped]);

  const makeGuess = useCallback((guessedChar) => {
    if (phase !== 'guess') return;
    setGuess(guessedChar);
    setPhase('result');
    const correct = guessedChar.id === char.id;
    if (correct) {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#E8875A', '#F5D76E', '#6DBF82', '#6AADE4', '#A48EE0'],
      });
    }
    const newResults = [...results, { charIdx, correct }];
    setResults(newResults);
  }, [phase, char, results, charIdx]);

  const nextQuestion = useCallback(() => {
    const next = qIdx + 1;
    if (next >= 8) {
      onDone(results);
    } else {
      setQIdx(next);
      setFlipped([]);
      setPhase('flip');
      setGuess(null);
      setShaking(false);
    }
  }, [qIdx, results, onDone]);

  const correct = phase === 'result' && guess && guess.id === char.id;

  return (
    <div className={styles.screen}>
      {/* Header */}
      <div className={styles.header}>
        <span className={styles.qnum}>Q{qIdx + 1} / 8</span>
        <div className={styles.scoreDots}>
          {results.map((r, i) => (
            <div key={i} className={`${styles.scoreDot} ${r.correct ? styles.correct : styles.wrong}`} />
          ))}
          {Array(8 - results.length).fill(0).map((_, i) => (
            <div key={i + results.length} className={styles.scoreDot} />
          ))}
        </div>
        <span className={styles.scoreLabel}>{results.filter(r=>r.correct).length} / {results.length}</span>
      </div>

      <div className={styles.main}>
        {/* Left — hidden character */}
        <div className={styles.leftPanel}>
          {phase === 'result' && correct && (
            <div className={styles.revealBurst}>✨</div>
          )}
          {phase === 'result' && !correct && (
            <div className={styles.wrongX}>✗</div>
          )}
          <CharacterAvatar char={char} size="xl" hidden={phase !== 'result'} />
          {phase === 'result' && (
            <p className={styles.revealName} style={{ color: char.color }}>
              {char.name}
            </p>
          )}
          {phase !== 'result' && (
            <p className={styles.hintText}>
              {phase === 'flip'
                ? `Tap ${2 - flipped.length} tile${flipped.length === 1 ? '' : 's'} to reveal`
                : 'Who is it?'}
            </p>
          )}
        </div>

        {/* Right — category tiles */}
        <div className={styles.rightPanel}>
          <div className={styles.tileGrid}>
            {CATS.map(cat => {
              const isFlipped = flipped.includes(cat);
              const val = char.likes[cat];
              return (
                <div
                  key={cat}
                  className={`${styles.tileWrapper} ${isFlipped && shaking ? styles.shake : ''}`}
                  onClick={() => flipTile(cat)}
                >
                  <div className={`${styles.tile} ${isFlipped ? styles.tileFlipped : ''}`}>
                    {/* Front (face down) */}
                    <div className={styles.tileFront}>
                      <span className={styles.tileCatIcon}>{CATEGORIES[cat].icon}</span>
                      <span className={styles.tileCatLabel}>{CATEGORIES[cat].label}</span>
                    </div>
                    {/* Back (revealed) */}
                    <div className={styles.tileBack} style={{ background: CATEGORY_COLORS[cat] }}>
                      <span className={styles.tileRevealEmoji}>{LIKE_EMOJI[val]}</span>
                      <span className={styles.tileRevealVal}>{val}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Name buttons — slide up when phase=guess or result */}
          <div className={`${styles.nameButtonsArea} ${phase !== 'flip' ? styles.nameButtonsVisible : ''}`}>
            <p className={styles.guessLabel}>Who is it?</p>
            <div className={styles.nameButtons}>
              {characters.map(c => (
                <button
                  key={c.id}
                  className={`${styles.nameBtn}
                    ${phase === 'result' && c.id === char.id ? styles.nameBtnCorrect : ''}
                    ${phase === 'result' && guess && c.id === guess.id && c.id !== char.id ? styles.nameBtnWrong : ''}
                  `}
                  onClick={() => makeGuess(c)}
                  disabled={phase === 'result'}
                  style={{ '--char-color': c.color }}
                >
                  <span className={styles.nameBtnEmoji}>{c.emoji}</span>
                  {c.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Next button */}
      {phase === 'result' && (
        <div className={styles.footer}>
          <button className={styles.nextBtn} onClick={nextQuestion}>
            {qIdx < 7 ? 'Next Question →' : 'See Results 🏆'}
          </button>
        </div>
      )}
    </div>
  );
}
