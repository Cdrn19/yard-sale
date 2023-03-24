import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProviderAuth } from "@hooks/useAuth";
import Layout from "@containers/Layout";
import Login from "@pages/Login";
import "@styles/global.scss";

const App = () => {
  return (
    <BrowserRouter>
      <ProviderAuth>
        <Layout>
          <Routes>
            <Route path="/login" element={<Login />} />
          </Routes>
        </Layout>
      </ProviderAuth>
    </BrowserRouter>
  );
};

export default App;
