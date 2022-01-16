import highSchoolWords from "./highSchoolWords";
import juniorHighSchoolWords from "./juniorHighSchoolWords";
import otherWords from "./otherWords";

export const candidates = uniq(juniorHighSchoolWords);

export const dictionary = uniq([
  ...juniorHighSchoolWords,
  ...highSchoolWords,
  ...otherWords,
]);

export const getRandomly = (words: string[]): string => {
  return words[Math.floor(Math.random() * words.length)];
};

export const chooseRandomly = (
  words: string[],
  len: number,
  choosen: string[] = []
): string[] => {
  if (choosen.length === len) {
    return choosen;
  }
  const word = getRandomly(words);
  if (choosen.includes(word)) {
    return chooseRandomly(words, len, choosen);
  }
  return chooseRandomly(words, len, [...choosen, word]);
};

function uniq(words: string[]): string[] {
  return words.reduce((acc, word) => {
    if (acc.includes(word)) {
      return acc;
    }
    return acc.concat(word);
  }, [] as string[]);
}
