import { differenceInDays } from "date-fns";
import highSchoolWords from "./highSchoolWords";
import juniorHighSchoolWords from "./juniorHighSchoolWords";
import otherWords from "./otherWords";

export const candidates = uniq(juniorHighSchoolWords);

export const dictionary = uniq([
  ...juniorHighSchoolWords,
  ...highSchoolWords,
  ...otherWords,
]);

export const getDailyOne = (words: string[]): string => {
  // 経過日数
  const numOfDaysElapsed = differenceInDays(new Date(), new Date(2022, 0, 16));
  return words[numOfDaysElapsed % words.length];
};

function uniq(words: string[]): string[] {
  return words.reduce((acc, word) => {
    if (acc.includes(word)) {
      return acc;
    }
    return acc.concat(word);
  }, [] as string[]);
}
