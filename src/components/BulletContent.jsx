import React, { useState } from "react";

import {
  Paper,
  Grid,
  TextField,
  IconButton,
  Typography,
  FormControlLabel,
  Switch,
  InputAdornment,
  Tooltip,
} from "@mui/material";
import {
  AddCircleOutline,
  DeleteForever,
  WarningRounded,
  ClearRounded,
  AddCircle,
} from "@mui/icons-material";
// import AddCircleIcon from '@mui/icons-material/AddCircle';
// import ClearRoundedIcon from "@mui/icons-material/ClearRounded";

import { getRandomExclamation } from "./FeatureForm/utils";
import { ORANGE } from "../constants";

export function BulletContent({
  textFieldLabel = "Default Input Label",
  textFieldPlaceholder = "Default Input Placeholder",
  textFieldShowError = null,
  textFieldError = "",
  textFieldOnBlur = () => {},
  onAdd = (inputString) => {},
  onDelete = (id) => {},
  items = [], // item shape is { id: UUID, value: String }
  showToggle: isUsingToggle = false,
  toggleLabel = "Default Toggle Label",
  onToggleChange = (isChecked) => {},
}) {
  const [showInput, setShowInput] = useState(false);
  const [inputContent, setInputContent] = useState("");
  const [showWarning, setShowWarning] = useState(false);

  const handleAddItem = () => {
    const trimmedInput = inputContent.trim();
    if (!trimmedInput) return;
    onAdd(trimmedInput);
    setInputContent("");
    setShowWarning(false);
  };

  const handleKeyDown = (e) => {
    e.keyCode === 13 && handleAddItem();
  };

  const handleSwitchChange = (e) => {
    const isChecked = e.target.checked;
    setShowInput(isChecked);
    onToggleChange(isChecked);
  };

  const handleTextFieldChange = (e) => {
    console.log("exec handleTextFieldChange");
    const val = e.target.value;
    setInputContent(val);
    setShowWarning(false);
  };

  const handleTextFieldBlur = () => {
    const trimmedInput = inputContent.trim();
    const shouldWarn = Boolean(trimmedInput);
    if (shouldWarn) {
      setShowWarning(true);
    }
    textFieldOnBlur(shouldWarn);
  };

  const isInputVisible = isUsingToggle ? showInput : true;

  const InputProps = {
    endAdornment: showWarning ? (
      <InputAdornment position="end">
        <Tooltip
          arrow
          placement="top"
          title={`${getRandomExclamation()}This text has not been added!`}
        >
          <WarningRounded
          // TODO -> add cursor default?
          />
        </Tooltip>
      </InputAdornment>
    ) : undefined,
  };

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
        <>
          <Grid item xs={12}>
            <TextField
              label={textFieldLabel}
              placeholder={textFieldPlaceholder}
              fullWidth
              value={inputContent}
              onChange={handleTextFieldChange}
              onKeyDown={handleKeyDown}
              error={textFieldShowError}
              helperText={textFieldError}
              onBlur={handleTextFieldBlur}
              InputProps={InputProps}
              size="small"
            />
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="center">
            <IconButton
              onClick={handleAddItem}
              style={{ margin: "-30px 0 -16px" }}
            >
              <AddCircle
                style={{ width: "29px", height: "29px", color: ORANGE }}
              />
            </IconButton>
          </Grid>
          {items.map(({ id, value }) => (
            <React.Fragment key={id}>
              <Grid
                item
                xs={12}
                display="flex"
                alignItems="center"
                style={{ paddingLeft: "50px", paddingTop: "16px" }}
              >
                <TextField
                  label={textFieldLabel}
                  value={value}
                  fullWidth
                  size="small"
                />
                <IconButton onClick={() => onDelete(id)}>
                  <ClearRounded style={{ width: "24px", height: "24px" }} />
                </IconButton>
              </Grid>
            </React.Fragment>
          ))}
        </>
      )}
    </>
  );
}
