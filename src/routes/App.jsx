import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProviderCart } from "@hooks/useShoppingCart";
import { ProviderAuth } from "@hooks/useAuth";
import Layout from "@containers/Layout";
import Home from "@pages/Home";
import Login from "@containers/Login";
import "@styles/global.scss";

const App = () => {
  return (
    <ProviderCart>
      <ProviderAuth>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/:category" element={<Home />} />
              <Route path="/signin" element={<Login />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </ProviderAuth>
    </ProviderCart>
  );
};

export default App;
