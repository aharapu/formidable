import { Button, Paper, Grid, TextField } from "@mui/material";
import { DARK_BLUE } from "../constants";

export default function FeatureForm() {
  const handleCopyClick = (evt) => {
    const text = `
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
    var blob = new Blob([text], { type });
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

  return (
    <Paper
      style={{ margin: "0 auto", maxWidth: "800px", padding: "20px" }}
      elevation={3}
    >
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <TextField
            label="The What"
            placeholder="Provide a description of the issue, as if you are explaining what is being seen and what is expected to a colleague."
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="The What"
            placeholder="Provide a description of the issue, as if you are explaining what is being seen and what is expected to a colleague."
            fullWidth
          />
        </Grid>
      </Grid>
      <hr />
      <h3>Preview: </h3>
      <p
        style={{
          border: "2px solid black",
          borderRadius: "5px",
          padding: "10px",
        }}
      >
        I am some text <strong>some is strong</strong> and <em>some is em</em>
        <br />
        It <br />
        is <br />
        multiline <br />
        and <span style={{ color: DARK_BLUE }}>contains styled spans</span>
      </p>
      <Button onClick={handleCopyClick}>Copy to clipboard</Button>
    </Paper>
  );
}