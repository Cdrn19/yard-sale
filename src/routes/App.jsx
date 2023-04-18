import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ProviderCart } from "@hooks/useShoppingCart";
import { ProviderAuth } from "@hooks/useAuth";
import { AuthRoute } from "@hooks/useAuthRoute";
import Layout from "@containers/Layout";
import Home from "@pages/Home";
import SignIn from "@pages/SignIn";
import CreateAccount from "@pages/CreateAccount";
import PasswordRecovery from "@pages/PasswordRecovery";
import Account from "@pages/Account";
import Checkout from "@pages/Checkout";
import NotFound from "@pages/NotFound";
import "@styles/global.scss";

const App = () => {
  return (
    <HelmetProvider>
      <ProviderCart>
        <ProviderAuth>
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/category/:category" element={<Home />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<CreateAccount />} />
                <Route
                  path="/passwordRecovery"
                  element={<PasswordRecovery />}
                />
                <Route path="/checkout" element={<Checkout />} />
                <Route
                  path="/account"
                  element={
                    <AuthRoute>
                      <Account />
                    </AuthRoute>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </ProviderAuth>
      </ProviderCart>
    </HelmetProvider>
  );
};

export default App;
