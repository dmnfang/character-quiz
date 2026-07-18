import { CHARACTERS, CATEGORIES } from './data.js';

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pick(arr, n) { return shuffle(arr).slice(0, n); }

export function assignLikes(characters) {
  const cats = Object.keys(CATEGORIES);
  const assignments = characters.map(() => ({}));
  cats.forEach(cat => {
    const items = shuffle([...CATEGORIES[cat].items]);
    const charIndices = shuffle([...Array(8).keys()]);
    const pair1Chars = [charIndices[0], charIndices[1]];
    const pair2Chars = [charIndices[2], charIndices[3]];
    const restChars  = charIndices.slice(4);
    pair1Chars.forEach(i => { assignments[i][cat] = items[0]; });
    pair2Chars.forEach(i => { assignments[i][cat] = items[1]; });
    let idx = 2;
    restChars.forEach(i => { assignments[i][cat] = items[idx++]; });
  });
  const valid = characters.every((_, i) =>
    characters.some((_, j) => {
      if (i === j) return false;
      return cats.filter(cat => assignments[i][cat] === assignments[j][cat]).length >= 2;
    })
  );
  if (!valid) {
    assignments[1][cats[0]] = assignments[0][cats[0]];
    assignments[1][cats[1]] = assignments[0][cats[1]];
  }
  return characters.map((char, i) => ({ ...char, likes: assignments[i] }));
}

export function buildGame() {
  const selectedChars = pick(CHARACTERS, 8);
  const withLikes = assignLikes(selectedChars);
  const quizOrder = shuffle([...Array(8).keys()]);
  return { characters: withLikes, quizOrder };
}