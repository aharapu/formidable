import React from "react";
import {
  Box,
  Button,
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
} from "@mui/icons-material";

export function TestingInstructions({
  items,
  onChange = (changeType, data) => {},
}) {
  const handleAddTest = () => {
    onChange("add-test");
  };

  const handleDeleteTest = (scenarioId) => {
    onChange("delete-test", { scenarioId });
  };

  const handleScenarioNameChange = (e, scenarioId) => {
    onChange("edit-scenario-name", {
      scenarioId,
      scenarioName: e.target.value,
    });
  };

  const handleAddGiven = () => {
    onChange();
  };

  const handleDeleteGiven = (id) => {
    onChange();
  };

  console.log("items", items);

  return (
    <>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={handleAddTest}>
          Add Test
        </Button>
      </Grid>
      {items.map((item) => (
        <React.Fragment key={item.scenarioId}>
          <Grid item xs={12} display="flex" alignItems="center">
            <IconButton onClick={() => handleDeleteTest(item.scenarioId)}>
              <DeleteForever />
            </IconButton>
            <TextField
              label="scenario name"
              value={item.scenarioName}
              fullWidth
              onChange={(e) => handleScenarioNameChange(e, item.scenarioId)}
            />
          </Grid>
          {item.given.map((g, idx) => (
            <Grid
              key={g.id}
              item
              xs={12}
              style={{
                paddingLeft: "100px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <TextField
                value="Given"
                disabled
                style={{
                  width: "80px",
                  opacity: idx === 0 ? 1 : 0,
                  marginRight: "10px",
                }}
              />
              <TextField
                value={g.value}
                style={{ flexGrow: 1 }}
                InputProps={{
                  startAdornment:
                    idx !== 0 ? (
                      <InputAdornment
                        position="start"
                        style={{ paddingRight: "10px" }}
                      >
                        <strong>AND</strong>
                      </InputAdornment>
                    ) : null,
                }}
              />
              <IconButton
                onClick={idx === 0 ? handleAddGiven : handleDeleteGiven}
              >
                {idx === 0 ? <AddCircleOutline /> : <DeleteForever />}
              </IconButton>
            </Grid>
          ))}
          {item.when.map((w, idx) => (
            <Grid
              key={w.id}
              item
              xs={12}
              style={{
                paddingLeft: "100px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <TextField
                value="When"
                disabled
                style={{
                  width: "80px",
                  opacity: idx === 0 ? 1 : 0,
                  marginRight: "10px",
                }}
              />
              <TextField
                value={w.value}
                style={{ flexGrow: 1 }}
                InputProps={{
                  startAdornment:
                    idx !== 0 ? (
                      <InputAdornment style={{ paddingRight: "10px" }}>
                        <strong>AND</strong>
                      </InputAdornment>
                    ) : null,
                }}
              />
              <IconButton
                onClick={idx === 0 ? handleAddGiven : handleDeleteGiven}
              >
                {idx === 0 ? <AddCircleOutline /> : <DeleteForever />}
              </IconButton>
            </Grid>
          ))}
          {item.then.map((t, idx) => (
            <Grid
              key={t.id}
              item
              xs={12}
              style={{
                paddingLeft: "100px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <TextField
                value="Then"
                disabled
                style={{
                  width: "80px",
                  opacity: idx === 0 ? 1 : 0,
                  marginRight: "10px",
                }}
              />
              <TextField
                value={t.value}
                style={{ flexGrow: 1 }}
                InputProps={{
                  startAdornment:
                    idx !== 0 ? (
                      <InputAdornment style={{ paddingRight: "10px" }}>
                        <strong>AND</strong>
                      </InputAdornment>
                    ) : null,
                }}
              />
              <IconButton
                onClick={idx === 0 ? handleAddGiven : handleDeleteGiven}
              >
                {idx === 0 ? <AddCircleOutline /> : <DeleteForever />}
              </IconButton>
            </Grid>
          ))}
        </React.Fragment>
      ))}
    </>
  );
}
