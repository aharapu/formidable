import { Typography } from "@mui/material";
import FeatureForm from "./components/FeatureForm";

function App() {
  return (
    <>
      <Typography align="center" variant="h1">
        Formidable tickets
      </Typography>
      {/* TODO -> render FeatureForm here ONLY when button is clicked */}
      <FeatureForm />
    </>
  );
}

export default App;
