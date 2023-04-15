import levenshtein from "js-levenshtein";

class UtilityServiceBase {
  getLlevenshteinDistance(text1: string, text2: string) {
    console.log({ test1: text1.toLowerCase(), test2: text2.toLowerCase() });
    return levenshtein(text1.toLowerCase(), text2.toLowerCase());
  }
}

export const UtilService = new UtilityServiceBase();
