import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@hooks/useAuth";
import SEO from "@components/SEO";
import "@styles/CreateAccount.scss";

const CreateAccount = () => {
  const [toggle, setToggle] = useState([
    {
      name: false,
      email: false,
      password: false,
    },
  ]);
  const form = useRef(null);
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    auth.user && navigate("/");
  }, [auth.user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setToggle([{ name: false, email: false, password: false }]);
    const formData = new FormData(form.current);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      avatar: "https://null.null/null.png",
    };
    if (data.name && data.email && data.password) {
      !auth.isLoading && auth.signUp(data);
      setToggle([{ name: false, email: false, password: false }]);
    } else if (!data.name || !data.email || !data.password) {
      !data.name ? (toggle.name = true) : (toggle.name = false);
      !data.email ? (toggle.email = true) : (toggle.email = false);
      !data.password ? (toggle.password = true) : (toggle.password = false);
      setToggle([toggle]);
    }
  };

  return (
    <>
      <SEO title="Create Account" />
      <div className="create-account">
        <div className="create-account__container">
          <h1 className="create-account__title">My account</h1>
          <form action="/" className="create-account__form" ref={form}>
            <div>
              <label
                htmlFor="name"
                className={`create-account__form--label ${
                  (auth.error === 400 || toggle[0].name) && "error"
                }`}
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Yard Sale"
                autoComplete="on"
                className={`create-account__form--input input-name ${
                  (auth.error === 400 || toggle[0].name) && "error"
                }`}
              />
              <label
                htmlFor="email"
                className={`create-account__form--label ${
                  (auth.error === 400 || toggle[0].email) && "error"
                }`}
              >
                Email
              </label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="hello@yardsale.com"
                autoComplete="on"
                className={`create-account__form--input input-email ${
                  (auth.error === 400 || toggle[0].email) && "error"
                }`}
              />
              <label
                htmlFor="password"
                className={`create-account__form--label ${
                  (auth.error === 400 || toggle[0].password) && "error"
                }`}
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="*********"
                autoComplete="on"
                className={`create-account__form--input input-password ${
                  (auth.error === 400 || toggle[0].password) && "error"
                }`}
              />
            </div>
            <p className="create-account__form--input-error">
              {auth.error === 400 &&
                "Password must be longer than or equal to 4 characters"}
            </p>
            <button
              className={`create-account__form--login-button ${
                auth.isLoading ? `active` : null
              }`}
              onClick={handleSubmit}
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateAccount;
