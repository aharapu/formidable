import React from "react";
import { FormControlLabel, Checkbox, Grid } from "@mui/material";

export function FormCheckbox({ value, label = "Default Label", onChange }) {
  return (
    <Grid item xs={12}>
      <FormControlLabel
        control={
          <Checkbox
            sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
            checked={value}
            onChange={(e) => onChange(e.target.checked)}
          />
        }
        label={label}
      />
    </Grid>
  );
}
