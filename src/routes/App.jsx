import { BrowserRouter as Router } from "react-router-dom";
import Layout from "@containers/Layout";
import "@styles/global.scss";

const App = () => {
  return (
    <Router>
      <Layout></Layout>
    </Router>
  );
};

export default App;
