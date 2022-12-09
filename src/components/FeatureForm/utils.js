const noWhatContentErr =
  "It's not so clear what this ticket is about. Try to describe your intent in a few words.";

export function getRandomExclamation() {
  // TODO -> have more options (Hm..., Oh noes!, Ouch!, Really? )
  return "Whoops! ";
}

export function validateWhat(what = "") {
  if (!what || typeof what !== "string") {
    return getRandomExclamation() + noWhatContentErr;
  }

  const trimmedWhat = what.trim();
  if (!trimmedWhat) {
    return getRandomExclamation() + noWhatContentErr;
  }

  const nrOfWords = trimmedWhat.split(" ").length;
  if (nrOfWords < 5) {
    const suffix = nrOfWords === 1 ? " word is" : " words are";
    return (
      getRandomExclamation() +
      `I'm not convinced ${
        nrOfWords.toString(10) + suffix
      } enough for a clear message. Five words should be enough.`
    );
  }

  return null;
}

export function validateACs(ACs) {
  if (ACs.length < 1) {
    return (
      getRandomExclamation() +
      "Surely you can't accept anything and everything!"
    );
  }
}
