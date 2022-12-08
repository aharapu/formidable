import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";

// TODO -> remove
export const dependencyInput = atom({
  key: "dependencyInput", // unique ID (with respect to other atoms/selectors)
  default: "", // default value (aka initial value)
});

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

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>
);
