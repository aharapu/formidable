import React, { useState } from "react";
import { Grid, TextField, FormControlLabel, Switch } from "@mui/material";

export function FormTextField({
  label,
  placeholder,
  value,
  onChange,
  multiline,
  showToggle: isUsingToggle = false,
  toggleLabel = "Default Toggle Label",
  onToggleChange = (isChecked) => {},
  onBlur = () => {},
  error,
  helperText,
}) {
  const [showInput, setShowInput] = useState(false);

  const handleSwitchChange = (e) => {
    const isChecked = e.target.checked;
    setShowInput(isChecked);
    onToggleChange(isChecked);
  };

  const isInputVisible = isUsingToggle ? showInput : true;

  return (
    <>
      {isUsingToggle && (
        <Grid item xs={12}>
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
        <Grid item xs={12}>
          <TextField
            label={label}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            fullWidth
            multiline={multiline}
            rows={4}
            onBlur={onBlur}
            error={error}
            helperText={helperText}
          />
        </Grid>
      )}
    </>
  );
}
