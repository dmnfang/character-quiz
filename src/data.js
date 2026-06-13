// Animal pool — 20 animals, 8 picked randomly per game
export const CHARACTERS = [
  { id: 'bear',        name: 'Bear',        emoji: '🐻', color: '#C8A882' },
  { id: 'boar',        name: 'Boar',        emoji: '🐗', color: '#B5765C' },
  { id: 'cat',         name: 'Cat',         emoji: '🐱', color: '#E8875A' },
  { id: 'chicken',     name: 'Chicken',     emoji: '🐔', color: '#F5D76E' },
  { id: 'cow',         name: 'Cow',         emoji: '🐮', color: '#F0EBE0' },
  { id: 'dog',         name: 'Dog',         emoji: '🐶', color: '#D9A86C' },
  { id: 'elephant',    name: 'Elephant',    emoji: '🐘', color: '#A0AEC0' },
  { id: 'fox',         name: 'Fox',         emoji: '🦊', color: '#ED9B6B' },
  { id: 'horse',       name: 'Horse',       emoji: '🐴', color: '#B08968' },
  { id: 'koala',       name: 'Koala',       emoji: '🐨', color: '#A8A8A8' },
  { id: 'lion',        name: 'Lion',        emoji: '🦁', color: '#F0C419' },
  { id: 'monkey',      name: 'Monkey',      emoji: '🐵', color: '#C8956D' },
  { id: 'mouse',       name: 'Mouse',       emoji: '🐭', color: '#E0CDB8' },
  { id: 'panda',       name: 'Panda',       emoji: '🐼', color: '#7A7060' },
  { id: 'penguin',     name: 'Penguin',     emoji: '🐧', color: '#6AADE4' },
  { id: 'pig',         name: 'Pig',         emoji: '🐷', color: '#F4A0A0' },
  { id: 'rabbit',      name: 'Rabbit',      emoji: '🐰', color: '#F7C5C5' },
  { id: 'raccoon-dog', name: 'Raccoon Dog', emoji: '🦝', color: '#9B8B7A' },
  { id: 'sheep',       name: 'Sheep',       emoji: '🐑', color: '#E8E0D0' },
  { id: 'wolf',        name: 'Wolf',        emoji: '🐺', color: '#8A95A5' },
];

export const CATEGORIES = {
  color:   { label: 'Color',   icon: '🎨', items: ['red','yellow','pink','green','purple','orange','blue','black','white','brown'] },
  sport:   { label: 'Sport',   icon: '⚽', items: ['soccer','baseball','basketball','tennis','volleyball','badminton','table tennis','swimming','dodgeball','rugby'] },
  food:    { label: 'Food',    icon: '🍎', items: ['apple','orange','strawberry','banana','ramen','sushi','pizza','curry','chocolate','cake'] },
  subject: { label: 'Subject', icon: '📚', items: ['english','math','japanese','science','social studies','art','music','P.E.','home economics','calligraphy'] },
};

// Emoji fallbacks (shown if image fails to load)
export const LIKE_EMOJI = {
  // colors
  red:'🔴', yellow:'🟡', pink:'🩷', green:'🟢', purple:'🟣',
  orange:'🟠', blue:'🔵', black:'⚫', white:'⚪', brown:'🟤',
  // sports
  soccer:'⚽', baseball:'⚾', basketball:'🏀', tennis:'🎾', volleyball:'🏐',
  badminton:'🏸', 'table tennis':'🏓', swimming:'🏊', dodgeball:'🎯', rugby:'🏉',
  // foods
  apple:'🍎', orange:'🍊', strawberry:'🍓', banana:'🍌', ramen:'🍜',
  sushi:'🍣', pizza:'🍕', curry:'🍛', chocolate:'🍫', cake:'🎂',
  // subjects
  english:'🔤', math:'➕', japanese:'🇯🇵', science:'🔬', 'social studies':'🌍',
  art:'🎨', music:'🎵', 'P.E.':'⚽', 'home economics':'🍳', calligraphy:'🖌️',
};

// BG colors for category tiles
export const CATEGORY_COLORS = {
  color:   '#A48EE0',
  sport:   '#6AADE4',
  food:    '#6DBF82',
  subject: '#E8875A',
};

// Display casing for like values — lowercase except special cases like "P.E."
const KEEP_CASE = new Set(['P.E.']);
export function displayLike(value) {
  return KEEP_CASE.has(value) ? value : value.toLowerCase();
}

// Convert a like value into a URL-safe slug for image filenames
export function slug(value) {
  return value.toLowerCase().replace(/\./g, '').replace(/\s+/g, '-');
}

// Image path helpers — drop matching PNGs into these locations
export function animalImagePath(id) {
  return `${import.meta.env.BASE_URL}images/animals/${id}.png`;
}

export function likeImagePath(category, value) {
  return `${import.meta.env.BASE_URL}images/likes/${category}/${slug(value)}.png`;
}