import { atom } from "recoil";

export const DARK_GREY = "#172F4D";
export const DARK_BLUE = "#0747A6";
export const DARK_TEAL = "#008DA6";
export const DARK_GREEN = "#006644";
export const ORANGE = "#FF991F";
export const DARK_RED = "#BF2600";
export const DARK_PURPLE = "#403294";
export const LIGHT_GRAY = "#97A0AF";
export const BLUE = "#4C9AFF";
export const TEAL = "#00B8D9";
export const GREEN = "#36B37E";
export const YELLOW = "#FFC400";
export const RED = "#FF5630";
export const PURPLE = "#6554C0";
export const WHITE = "#FFFFFF";
export const LIGHT_BLUE = "#B3D4FF";
export const LIGHT_TEAL = "#B3F5FF";
export const LIGHT_GREEN = "#ABF5D1";
export const LIGHT_YELLOW = "#FFF0B3";
export const LIGHT_RED = "#FFBDAD";
export const LIGHT_PURPLE = "#EAE6FF";

export const HOME_PAGE = "HOME_PAGE";
export const FEATURE_PAGE = "FEATURE_PAGE";
export const BUG_PAGE = "BUG_PAGE";

// Navigation state
export const currentPage = atom({
  key: "currentPage", // unique ID (with respect to other atoms/selectors)
  default: HOME_PAGE, // default value (aka initial value)
});

// Feature states
export const featureWhat = atom({
  key: "featureWhat",
  default: "",
});

export const featureACs = atom({
  key: "featureACs",
  default: [],
  /*
  array object shape { id: UUID, value: String }
  */
});

export const featureTechGuide = atom({
  key: "featureTechGuide",
  default: "",
});

export const featureTestInstruct = atom({
  key: "featureTestInstruct",
  default: "",
});

export const featureDeps = atom({
  key: "featureDeps",
  default: [],
  /*
  array object shape { id: UUID, value: String }
  */
});

export const featureFlag = atom({
  key: "featureFlag",
  default: "",
});

export const featureImpactedProj = atom({
  key: "featureImpactedProj",
  default: [],
  /*
  array object shape { id: UUID, value: String }
  */
});

export const featureRequireEdition = atom({
  key: "featureRequireEdition",
  default: [],
  /*
  array object shape { id: UUID, value: String }
  */
});

// TODO -> state for testing instructions

export const featureRequireAutomationTest = atom({
  key: "featureRequireAutomationTest",
  default: false,
});
