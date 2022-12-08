import React, { useState } from "react";

import {
  Paper,
  Grid,
  TextField,
  IconButton,
  Typography,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { AddCircleOutline, DeleteForever } from "@mui/icons-material";

export function BulletContent({
  textFieldLabel = "Default Input Label",
  textFieldPlaceholder = "Default Input Placeholder",
  onAdd = (inputString) => {},
  onDelete = (id) => {},
  items = [], // item shape is { id: UUID, value: String }
  showToggle: isUsingToggle = false,
  toggleLabel = "Default Toggle Label",
  onToggleChange = (isChecked) => {},
}) {
  const [showInput, setShowInput] = useState(false);
  const [inputContent, setInputContent] = useState("");

  const handleAddItem = () => {
    const trimmedInput = inputContent.trim();
    if (!trimmedInput) return;
    onAdd(trimmedInput);
    setInputContent("");
  };

  const handleKeyDown = (e) => {
    e.keyCode === 13 && handleAddItem();
  };

  const handleSwitchChange = (e) => {
    const isChecked = e.target.checked;
    setShowInput(isChecked);
    onToggleChange(isChecked);
  };

  const isInputVisible = isUsingToggle ? showInput : true;

  return (
    <>
      {isUsingToggle && (
        <Grid container item xs={12}>
          <FormControlLabel
            control={
              <Switch
                size="medium"
                value={showInput}
                onChange={handleSwitchChange}
              />
            }
            label={toggleLabel}
          />
        </Grid>
      )}
      {isInputVisible && (
        <Grid container item xs={12}>
          <Paper
            style={{
              width: "100%",
              padding: "15px",
              backgroundColor: "lightblue",
            }}
            height={3}
          >
            <Grid item xs={12}>
              <TextField
                label={textFieldLabel}
                placeholder={textFieldPlaceholder}
                fullWidth
                value={inputContent}
                onChange={(e) => setInputContent(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="center">
              <IconButton onClick={handleAddItem}>
                <AddCircleOutline />
              </IconButton>
            </Grid>
            {items.map(({ id, value }) => (
              <React.Fragment key={id}>
                <Grid
                  item
                  xs={12}
                  paddingLeft={2}
                  display="flex"
                  alignItems="center"
                >
                  <IconButton onClick={() => onDelete(id)}>
                    <DeleteForever />
                  </IconButton>
                  <Typography>{value}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Paper>
        </Grid>
      )}
    </>
  );
}
