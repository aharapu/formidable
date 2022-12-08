const noWhatContentErr =
  "It's not so clear what this ticket is about. Try to describe your intent in a few words.";

export function validateWhat(what = "") {
  if (!what || typeof what !== "string") {
    return noWhatContentErr;
  }

  const trimmedWhat = what.trim();
  if (!trimmedWhat) {
    return noWhatContentErr;
  }

  const nrOfWords = trimmedWhat.split(" ").length;
  if (nrOfWords < 5) {
    const suffix = nrOfWords === 1 ? " word is" : " words are";
    return `I'm not convinced ${
      nrOfWords.toString(10) + suffix
    } enough for a clear message. Five words should be enough.`;
  }

  return null;
}
