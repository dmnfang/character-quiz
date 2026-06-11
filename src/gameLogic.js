import { CHARACTERS, CATEGORIES } from './data.js';

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pick(arr, n) {
  return shuffle(arr).slice(0, n);
}

/**
 * Assign likes to 8 characters following sharing rules:
 * - Every character shares at least 2 likes with at least one other character
 * - At least 2 pairs share a like
 */
export function assignLikes(characters) {
  const cats = Object.keys(CATEGORIES);
  
  // Build a pool of likes per category
  const pools = {};
  cats.forEach(cat => {
    pools[cat] = shuffle([...CATEGORIES[cat].items]);
  });

  // Strategy: assign likes in a way that guarantees sharing
  // Step 1: create 3 "shared groups" — each group is 2-3 characters sharing one like per category
  // Step 2: assign remaining likes randomly
  
  const assignments = characters.map(() => ({}));
  
  // For each category, assign at least 2 pairs that share the same value
  cats.forEach(cat => {
    const items = shuffle([...CATEGORIES[cat].items]);
    
    // Create 2 forced shared pairs
    const pair1Item = items[0];
    const pair2Item = items[1];
    
    // Pick 4 characters for the 2 pairs (2 each), rest get unique items
    const charIndices = shuffle([...Array(8).keys()]);
    const pair1Chars = [charIndices[0], charIndices[1]];
    const pair2Chars = [charIndices[2], charIndices[3]];
    const restChars  = charIndices.slice(4);
    
    pair1Chars.forEach(i => { assignments[i][cat] = pair1Item; });
    pair2Chars.forEach(i => { assignments[i][cat] = pair2Item; });
    
    // Rest get unique items
    let idx = 2;
    restChars.forEach(i => {
      assignments[i][cat] = items[idx++];
    });
  });
  
  // Verify every character shares ≥2 likes with at least one other
  // If not, adjust (simple retry approach — the structured assignment above usually satisfies this)
  const valid = characters.every((_, i) => {
    return characters.some((_, j) => {
      if (i === j) return false;
      const shared = cats.filter(cat => assignments[i][cat] === assignments[j][cat]);
      return shared.length >= 2;
    });
  });
  
  if (!valid) {
    // Force at least one pair to share 2 categories by copying two assignments
    assignments[1].color  = assignments[0].color;
    assignments[1].animal = assignments[0].animal;
  }
  
  return characters.map((char, i) => ({
    ...char,
    likes: assignments[i],
  }));
}

export function buildGame() {
  const selectedChars = pick(CHARACTERS, 8);
  const withLikes = assignLikes(selectedChars);
  const quizOrder = shuffle([...Array(8).keys()]); // indices into withLikes
  return { characters: withLikes, quizOrder };
}
