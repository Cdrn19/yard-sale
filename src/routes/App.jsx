import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProviderCart } from "@hooks/useShoppingCart";
import { ProviderAuth } from "@hooks/useAuth";
import Layout from "@containers/Layout";
import Home from "@pages/Home";
import Login from "@pages/Login";
import "@styles/global.scss";

const App = () => {
  return (
    <ProviderCart>
      <ProviderAuth>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </ProviderAuth>
    </ProviderCart>
  );
};

export default App;
