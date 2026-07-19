import { useState, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { CATEGORIES, CATEGORY_COLORS, displayLike } from '../data.js';
import CharacterAvatar from '../components/CharacterAvatar.jsx';
import AnimalIcon from '../components/AnimalIcon.jsx';
import LikeImage from '../components/LikeImage.jsx';
import Arrow from '../components/Arrow.jsx';
import styles from './QuizScreen.module.css';

const CATS = ['color', 'sport', 'food', 'subject'];

export default function QuizScreen({ game, onDone }) {
  const { characters, quizOrder, count } = game;
  const [qIdx, setQIdx] = useState(0);
  const [flipped, setFlipped] = useState([]);
  const [phase, setPhase] = useState('flip');
  const [guess, setGuess] = useState(null);
  const [results, setResults] = useState([]);
  const [nextReady, setNextReady] = useState(false);
  // In easy mode, track which character ids are greyed out (answered)
  const [greyedOut, setGreyedOut] = useState(new Set());

  const charIdx = quizOrder[qIdx];
  const char = characters[charIdx];

  const flipTile = useCallback((cat) => {
    if (phase !== 'flip') return;
    if (flipped.includes(cat)) return;
    if (flipped.length >= 2) return;
    const next = [...flipped, cat];
    setFlipped(next);
    if (next.length === 2) setTimeout(() => setPhase('guess'), 600);
  }, [phase, flipped]);

  const makeGuess = useCallback((guessedChar) => {
    if (phase !== 'guess') return;
    setGuess(guessedChar);
    setPhase('result');
    setNextReady(false);
    const correct = guessedChar.id === char.id;
    if (correct) {
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.5 }, colors: ['#E8875A','#F5D76E','#6DBF82','#6AADE4','#A48EE0'] });
    }
    const newResults = [...results, { charIdx, correct }];
    setResults(newResults);
    // Grey out the correct answer after each question
    setGreyedOut(prev => new Set([...prev, char.id]));
    setTimeout(() => setNextReady(true), 2000);
  }, [phase, char, results, charIdx]);

  const nextQuestion = useCallback(() => {
    if (!nextReady) return;
    const next = qIdx + 1;
    if (next >= count) { onDone(results); return; }
    setQIdx(next);
    setFlipped([]);
    setPhase('flip');
    setGuess(null);
    setNextReady(false);
  }, [qIdx, results, onDone, nextReady]);

  const correct = phase === 'result' && guess && guess.id === char.id;

  return (
    <div className={styles.screen}>
      <div className={styles.header}>
        <span className={styles.qnum}>Q{qIdx + 1} / {count}</span>
        <div className={styles.scoreDots}>
          {results.map((r, i) => <div key={i} className={`${styles.scoreDot} ${r.correct ? styles.correct : styles.wrong}`} />)}
          {Array(count - results.length).fill(0).map((_, i) => <div key={i + results.length} className={styles.scoreDot} />)}
        </div>
        <span className={styles.scoreLabel}>{results.filter(r=>r.correct).length} / {results.length}</span>
      </div>

      <div className={styles.main}>
        {/* Left panel */}
        <div className={`${styles.leftPanel} ${phase === 'result' && !correct ? styles.leftPanelWrong : ''}`}>
          {phase === 'result' && correct && <div className={styles.revealBurst}>✨</div>}
          {phase === 'result' && !correct
            ? <div className={styles.wrongX}>✗</div>
            : (
              <>
                <div className={styles.avatarWrap}>
                  <CharacterAvatar char={char} hidden={phase !== 'result'} />
                </div>
                {phase === 'result' && <p className={styles.revealName}>{char.name}</p>}
                {phase !== 'result' && (
                  <p className={styles.hintText}>
                    {phase === 'flip' ? `Tap ${2 - flipped.length} tile${flipped.length === 1 ? '' : 's'} to reveal` : 'Who is it?'}
                  </p>
                )}
              </>
            )
          }
        </div>

        {/* Right panel */}
        <div className={styles.rightPanel}>
          <div className={styles.tileGrid}>
            {CATS.map(cat => {
              const isFlipped = flipped.includes(cat);
              const val = char.likes[cat];
              return (
                <div key={cat} className={styles.tileWrapper} onClick={() => flipTile(cat)}>
                  <div className={`${styles.tile} ${isFlipped ? styles.tileFlipped : ''}`}>
                    <div className={styles.tileFront}>
                      <p className={styles.tilePrompt}>
                        What <span className={styles.tilePromptCat}>{CATEGORIES[cat].label.toLowerCase()}</span> do you like?
                      </p>
                    </div>
                    <div className={styles.tileBack} style={{ borderColor: CATEGORY_COLORS[cat] }}>
                      <div className={styles.tileImgWrap}>
                        <LikeImage category={cat} value={val} size="fill" />
                      </div>
                      <span className={styles.tileRevealVal} style={{ color: CATEGORY_COLORS[cat] }}>{displayLike(val)}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className={`${styles.nameButtonsArea} ${phase !== 'flip' ? styles.nameButtonsVisible : ''}`}>
            <div
              className={styles.nameButtons}
              style={{ gridTemplateColumns: `repeat(${count <= 4 ? 2 : count <= 6 ? 3 : 4}, 1fr)` }}
            >
              {characters.map(c => {
                const isGreyed = greyedOut.has(c.id);
                return (
                  <button
                    key={c.id}
                    className={[
                      styles.nameBtn,
                      phase === 'result' && c.id === char.id ? styles.nameBtnCorrect : '',
                      phase === 'result' && guess && c.id === guess.id && c.id !== char.id ? styles.nameBtnWrong : '',
                      isGreyed ? styles.nameBtnGreyed : '',
                    ].join(' ')}
                    onClick={() => makeGuess(c)}
                    disabled={phase === 'result' || isGreyed}
                    style={{ '--char-color': c.color }}
                  >
                    <div className={styles.nameBtnImgWrap}>
                      <AnimalIcon char={c} size="fill" />
                    </div>
                    <span className={styles.nameBtnLabel}>{c.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {phase === 'result' && (
        <div className={styles.footer}>
          <button className={`${styles.nextBtn} ${!nextReady ? styles.nextBtnWaiting : ''}`} onClick={nextQuestion} disabled={!nextReady}>
            {qIdx < count - 1 ? <>Next Question <Arrow direction="right" size={24} /></> : <>See Results 🏆</>}
          </button>
        </div>
      )}
    </div>
  );
}