import { Button } from "@mui/material";

function App() {
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
    <div>
      <h1>Formidable tickets</h1>
      <Button children="Submit" variant="outlined" color="error" />
      <p>
        I am some text <strong>some is strong</strong> and <em>some is em</em>
        <br />
        It <br />
        is <br />
        multiline <br />
        and <span style={{ color: "red" }}>contains styled spans</span>
      </p>
      <Button onClick={handleCopyClick}>Copy to clipboard</Button>
    </div>
  );
}

export default App;
