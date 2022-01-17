import { expect, test } from "vitest";
import { candidates, dictionaryWords } from ".";

candidates.forEach((word) => {
  test(`${word} is contained in dictionaryWords`, () => {
    expect(dictionaryWords).contain(word);
  });
});
