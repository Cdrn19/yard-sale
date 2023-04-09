import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProviderCart } from "@hooks/useShoppingCart";
import { ProviderAuth } from "@hooks/useAuth";
import { AuthRoute } from "@hooks/useAuthRoute";
import Layout from "@containers/Layout";
import Home from "@pages/Home";
import Login from "@containers/Login";
import CreateAccount from "@pages/CreateAccount";
import PasswordRecovery from "@pages/PasswordRecovery";
import Account from "@pages/Account";
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
              <Route path="/signup" element={<CreateAccount />} />
              <Route path="/passwordRecovery" element={<PasswordRecovery />} />
              <Route
                path="/account"
                element={
                  <AuthRoute>
                    <Account />
                  </AuthRoute>
                }
              />
            </Routes>
          </Layout>
        </BrowserRouter>
      </ProviderAuth>
    </ProviderCart>
  );
};

export default App;
