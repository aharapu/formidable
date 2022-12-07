import React from "react";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";

import {
  Button,
  Paper,
  Grid,
  TextField,
  IconButton,
  Typography,
} from "@mui/material";

import { dependencyInput } from "../main";

export default function Preview() {
  const dependecyCurrentValue = useRecoilValue(dependencyInput);
  const handleCopyClick = (evt) => {
    const clipboardContent = `
        <p>
            I am some text <strong>some is strong</strong> and <em>some is em</em>
            <br />
            It <br />
            <h2 style="color: #006644">is</h2>
            <h3>is</h3>
            <h4>is</h4>
            <h5>is</h5>
             <br />
            multiline <br />
            and <span style="color: #006644; font-size: 30px;">contains styled spans</span>
          </p>
        `;

    var type = "text/html";
    var blob = new Blob([clipboardContent], { type });
    var data = [new ClipboardItem({ [type]: blob })];

    navigator.clipboard.write(data).then(
      function () {
        /* success */
        alert("o mers");
      },
      function () {
        alert("we have buba");
        /* failure */
      }
    );
  };

  // TODO -> use state to create an elaborate preview with colors and such
  return (
    <>
      <div>Preview</div>
      <p>{dependecyCurrentValue}</p>
      <Button onClick={handleCopyClick}>Copy to clipboard</Button>
    </>
  );
}
