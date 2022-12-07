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

export const dependencyInput = atom({
  key: "dependencyInput", // unique ID (with respect to other atoms/selectors)
  default: "", // default value (aka initial value)
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>
);
