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
  const n = characters.length;
  const cats = Object.keys(CATEGORIES);
  const assignments = characters.map(() => ({}));

  cats.forEach(cat => {
    const items = shuffle([...CATEGORIES[cat].items]);
    const charIndices = shuffle([...Array(n).keys()]);

    // One forced shared pair
    assignments[charIndices[0]][cat] = items[0];
    assignments[charIndices[1]][cat] = items[0];

    // Rest get unique items
    charIndices.slice(2).forEach((ci, i) => {
      assignments[ci][cat] = items[i + 1];
    });
  });

  return characters.map((char, i) => ({ ...char, likes: assignments[i] }));
}

export function buildGame(count = 8) {
  const selectedChars = pick(CHARACTERS, count);
  const withLikes = assignLikes(selectedChars);
  const quizOrder = shuffle([...Array(count).keys()]);
  return { characters: withLikes, quizOrder, count };
}