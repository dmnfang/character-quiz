// Animal pool — 15+ animals, 8 picked randomly per game
export const CHARACTERS = [
  { id: 'bear',     name: 'Bear',     emoji: '🐻', color: '#C8A882' },
  { id: 'cat',      name: 'Cat',      emoji: '🐱', color: '#E8875A' },
  { id: 'dog',      name: 'Dog',      emoji: '🐶', color: '#D9A86C' },
  { id: 'rabbit',   name: 'Rabbit',   emoji: '🐰', color: '#F4A0A0' },
  { id: 'fox',      name: 'Fox',      emoji: '🦊', color: '#E8875A' },
  { id: 'panda',    name: 'Panda',    emoji: '🐼', color: '#7A7060' },
  { id: 'lion',     name: 'Lion',     emoji: '🦁', color: '#F5D76E' },
  { id: 'tiger',    name: 'Tiger',    emoji: '🐯', color: '#F0A04B' },
  { id: 'elephant', name: 'Elephant', emoji: '🐘', color: '#A0AEC0' },
  { id: 'monkey',   name: 'Monkey',   emoji: '🐵', color: '#C8956D' },
  { id: 'penguin',  name: 'Penguin',  emoji: '🐧', color: '#6AADE4' },
  { id: 'koala',    name: 'Koala',    emoji: '🐨', color: '#A8A8A8' },
  { id: 'owl',      name: 'Owl',      emoji: '🦉', color: '#A48EE0' },
  { id: 'hedgehog', name: 'Hedgehog', emoji: '🦔', color: '#C8A882' },
  { id: 'raccoon',  name: 'Raccoon',  emoji: '🦝', color: '#9B8B7A' },
  { id: 'sheep',    name: 'Sheep',    emoji: '🐑', color: '#F0EBE0' },
  { id: 'horse',    name: 'Horse',    emoji: '🐴', color: '#B08968' },
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
