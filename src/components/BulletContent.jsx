import React, { useState } from "react";
import { useRecoilState } from "recoil";

import {
  Button,
  Paper,
  Grid,
  TextField,
  IconButton,
  Typography,
} from "@mui/material";
import { v4 as createId } from "uuid";

import { dependencyInput } from "../main";

export function BulletContent({ textFieldLabel, textFieldPlaceholder }) {
  // TODO -> move state to parent and make this as dumb as possible
  // const [inputContent, setInputContent] = useState("");
  const [inputContent, setInputContent] = useRecoilState(dependencyInput);
  const [items, setItems] = useState([]);

  const handleAddItem = () => {
    setItems((prev) => [...prev, { value: inputContent, id: createId() }]);
    setInputContent("");
  };

  const handleKeyDown = (e) => {
    e.keyCode === 13 && handleAddItem();
  };

  return (
    <Grid container item xs={12}>
      <Paper
        style={{ width: "100%", padding: "15px", backgroundColor: "lightblue" }}
        height={3}
      >
        <Grid item xs={12}>
          <TextField
            label={textFieldLabel}
            placeholder={textFieldPlaceholder} // TODO -> pass an array and provide pseudorandom placeholders
            fullWidth
            value={inputContent}
            onChange={(e) => setInputContent(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </Grid>
        <Grid item xs={12}>
          <IconButton onClick={handleAddItem}>(+)</IconButton>
        </Grid>
        {items.map(({ id, value }) => (
          <React.Fragment key={id}>
            <Grid item xs={2}></Grid>
            <Grid item xs={10}>
              <Typography>{value}</Typography>
            </Grid>
          </React.Fragment>
        ))}
      </Paper>
    </Grid>
  );
}
