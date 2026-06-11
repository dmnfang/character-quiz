import { useState, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { LIKE_EMOJI, CATEGORIES, CATEGORY_COLORS } from '../data.js';
import CharacterAvatar from '../components/CharacterAvatar.jsx';
import styles from './QuizScreen.module.css';

const CATS = ['color', 'sport', 'food', 'animal'];

export default function QuizScreen({ game, onDone }) {
  const { characters, quizOrder } = game;
  const [qIdx, setQIdx] = useState(0);
  const [flipped, setFlipped] = useState([]);
  const [phase, setPhase] = useState('flip'); // flip | guess | result
  const [shaking, setShaking] = useState(false);
  const [guess, setGuess] = useState(null);
  const [results, setResults] = useState([]);
  const [nextReady, setNextReady] = useState(false);
  // Track which unflipped cat is "highlighted" for the scaffolding prompt
  const [promptCat, setPromptCat] = useState(CATS[0]);

  const charIdx = quizOrder[qIdx];
  const char = characters[charIdx];

  // Unflipped cats — the ones students can still ask about
  const unflipped = CATS.filter(c => !flipped.includes(c));
  // The active prompt cat: cycle through unflipped ones, or null if all done
  const activePrompt = unflipped[0] ?? null;

  const flipTile = useCallback((cat) => {
    if (phase !== 'flip') return;
    if (flipped.includes(cat)) return;
    if (flipped.length >= 2) return;

    const next = [...flipped, cat];
    setFlipped(next);

    if (next.length === 2) {
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
    setNextReady(false);
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
    setTimeout(() => setNextReady(true), 2000);
  }, [phase, char, results, charIdx]);

  const nextQuestion = useCallback(() => {
    if (!nextReady) return;
    const next = qIdx + 1;
    if (next >= 8) {
      onDone(results);
    } else {
      setQIdx(next);
      setFlipped([]);
      setPhase('flip');
      setGuess(null);
      setShaking(false);
      setNextReady(false);
    }
  }, [qIdx, results, onDone, nextReady]);

  const correct = phase === 'result' && guess && guess.id === char.id;

  // Scaffolding: which category label to show in the prompt
  const promptLabel = phase === 'flip' && unflipped.length > 0
    ? CATEGORIES[unflipped[0]].label
    : null;

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
          {phase === 'result' && correct && <div className={styles.revealBurst}>✨</div>}
          {phase === 'result' && !correct && <div className={styles.wrongX}>✗</div>}
          <CharacterAvatar char={char} size="xl" hidden={phase !== 'result'} />
          {phase === 'result' && (
            <p className={styles.revealName} style={{ color: char.color }}>{char.name}</p>
          )}
          {phase !== 'result' && (
            <p className={styles.hintText}>
              {phase === 'flip'
                ? `Tap ${2 - flipped.length} tile${flipped.length === 1 ? '' : 's'} to reveal`
                : 'Who is it?'}
            </p>
          )}
        </div>

        {/* Right — category tiles + prompt + name buttons */}
        <div className={styles.rightPanel}>

          {/* Scaffolding prompt */}
          <div className={`${styles.scaffold} ${phase === 'flip' && flipped.length < 2 ? styles.scaffoldVisible : styles.scaffoldHidden}`}>
            <span className={styles.scaffoldText}>What</span>
            <span className={styles.scaffoldPill}>
              {promptLabel ? `${CATEGORIES[unflipped[0]].icon} ${promptLabel}` : '…'}
            </span>
            <span className={styles.scaffoldText}>do you like?</span>
          </div>

          {/* Tile grid */}
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
                    <div className={styles.tileFront}>
                      <span className={styles.tileCatIcon}>{CATEGORIES[cat].icon}</span>
                      <span className={styles.tileCatLabel}>{CATEGORIES[cat].label}</span>
                    </div>
                    <div className={styles.tileBack} style={{ background: CATEGORY_COLORS[cat] }}>
                      <span className={styles.tileRevealEmoji}>{LIKE_EMOJI[val]}</span>
                      <span className={styles.tileRevealVal}>{val}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Name buttons — slide up after 2 flips */}
          <div className={`${styles.nameButtonsArea} ${phase !== 'flip' ? styles.nameButtonsVisible : ''}`}>
            <p className={styles.guessLabel}>Who is it?</p>
            <div className={styles.nameButtons}>
              {characters.map(c => (
                <button
                  key={c.id}
                  className={[
                    styles.nameBtn,
                    phase === 'result' && c.id === char.id ? styles.nameBtnCorrect : '',
                    phase === 'result' && guess && c.id === guess.id && c.id !== char.id ? styles.nameBtnWrong : '',
                  ].join(' ')}
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
          <button
            className={`${styles.nextBtn} ${!nextReady ? styles.nextBtnWaiting : ''}`}
            onClick={nextQuestion}
            disabled={!nextReady}
          >
            {qIdx < 7 ? 'Next Question →' : 'See Results 🏆'}
          </button>
        </div>
      )}
    </div>
  );
}