export const CHARACTERS = [
  { id: 'doraemon',    name: 'Doraemon',      emoji: '🔵', color: '#4A90D9' },
  { id: 'pikachu',    name: 'Pikachu',        emoji: '⚡', color: '#F5D76E' },
  { id: 'anpanman',   name: 'Anpanman',       emoji: '🍞', color: '#E8875A' },
  { id: 'totoro',     name: 'Totoro',         emoji: '🌿', color: '#6DBF82' },
  { id: 'kiki',       name: 'Kiki',           emoji: '🧹', color: '#2E2C28' },
  { id: 'kitty',      name: 'Hello Kitty',    emoji: '🎀', color: '#F48FB1' },
  { id: 'rilakkuma', name: 'Rilakkuma',       emoji: '🐻', color: '#C8A882' },
  { id: 'kirby',      name: 'Kirby',          emoji: '⭐', color: '#F48CB1' },
  { id: 'mario',      name: 'Mario',          emoji: '🍄', color: '#E05C5C' },
  { id: 'shinchan',   name: 'Shin-chan',       emoji: '🌻', color: '#F5D76E' },
  { id: 'maruko',     name: 'Chibi Maruko',   emoji: '🌸', color: '#F4A0A0' },
  { id: 'sazae',      name: 'Sazae-san',      emoji: '🐚', color: '#7ECECA' },
  { id: 'conan',      name: 'Conan',          emoji: '🔍', color: '#6AADE4' },
  { id: 'nobita',     name: 'Nobita',         emoji: '👓', color: '#A48EE0' },
  { id: 'luffy',      name: 'Luffy',          emoji: '⚓', color: '#E05C5C' },
];

export const CATEGORIES = {
  color:  { label: 'Color',  icon: '🎨', items: ['red','yellow','pink','green','purple','orange','blue','black','white','brown'] },
  sport:  { label: 'Sport',  icon: '⚽', items: ['soccer','baseball','basketball','tennis','volleyball','badminton','table tennis','swimming','dodgeball','rugby'] },
  food:   { label: 'Food',   icon: '🍎', items: ['apple','orange','strawberry','banana','ramen','sushi','pizza','curry','chocolate','cake'] },
  animal: { label: 'Animal', icon: '🐱', items: ['cat','dog','rabbit','bear','panda','fox','penguin','hamster','turtle','frog'] },
};

// Emoji maps for likes
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
  // animals
  cat:'🐱', dog:'🐶', rabbit:'🐰', bear:'🐻', panda:'🐼',
  fox:'🦊', penguin:'🐧', hamster:'🐹', turtle:'🐢', frog:'🐸',
};

// BG colors for category tiles
export const CATEGORY_COLORS = {
  color:  '#A48EE0',
  sport:  '#6AADE4',
  food:   '#6DBF82',
  animal: '#E8875A',
};
