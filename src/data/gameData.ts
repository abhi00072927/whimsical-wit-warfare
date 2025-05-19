
export interface GameWord {
  word: string;
  clue: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export const gameWords: GameWord[] = [
  {
    word: "BANANA PHONE",
    clue: "A fruity device for making calls",
    category: "Silly Items",
    difficulty: "easy"
  },
  {
    word: "COUCH POTATO",
    clue: "A vegetable that watches TV all day",
    category: "Silly People",
    difficulty: "easy"
  },
  {
    word: "DISCO NOODLE",
    clue: "A pasta that loves to dance",
    category: "Food Fun",
    difficulty: "medium"
  },
  {
    word: "BUBBLE TROUBLE",
    clue: "When your soap suds cause problems",
    category: "Silly Phrases",
    difficulty: "medium"
  },
  {
    word: "FUNKY MONKEY",
    clue: "A primate with great dance moves",
    category: "Animals",
    difficulty: "easy"
  },
  {
    word: "NOODLE DOODLE",
    clue: "A drawing made of pasta",
    category: "Art",
    difficulty: "medium"
  },
  {
    word: "SNAIL MAIL",
    clue: "Corresponds at a gastropod's pace",
    category: "Communication",
    difficulty: "easy"
  },
  {
    word: "JELLY BELLY",
    clue: "A stomach full of fruit preserves",
    category: "Body Parts",
    difficulty: "easy"
  },
  {
    word: "TICKLE PICKLE",
    clue: "A cucumber that makes you laugh",
    category: "Food Fun",
    difficulty: "medium"
  },
  {
    word: "GIGGLE WIGGLE",
    clue: "When you laugh so hard you squirm",
    category: "Actions",
    difficulty: "medium"
  },
  {
    word: "SILLY BILLY",
    clue: "A person who's extremely foolish",
    category: "Silly People",
    difficulty: "easy"
  },
  {
    word: "FLUFFY PUFFY",
    clue: "Something soft and inflated",
    category: "Textures",
    difficulty: "medium"
  },
  {
    word: "WOBBLY BOBBLY",
    clue: "An object that jiggles and shakes",
    category: "Movements",
    difficulty: "hard"
  },
  {
    word: "LUMPY GRUMPY",
    clue: "An uneven surface with a bad attitude",
    category: "Moods",
    difficulty: "hard"
  },
  {
    word: "TEENY WEENY",
    clue: "Extremely small in size",
    category: "Dimensions",
    difficulty: "easy"
  }
];

export const getRandomGameWord = (): GameWord => {
  const randomIndex = Math.floor(Math.random() * gameWords.length);
  return gameWords[randomIndex];
};

export const getRandomGameWords = (count: number): GameWord[] => {
  const shuffled = [...gameWords].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
