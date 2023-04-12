import { useRef, useState } from "react";
import { useAuth } from "@hooks/useAuth";
import "@styles/Account.scss";

const Account = () => {
  const [editToggle, setEditToggle] = useState(true);

  const form = useRef(null);
  const auth = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();
    setEditToggle(!editToggle);
    const formData = new FormData(form.current);
    const data = {};
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    name && (data.name = name);
    email && (data.email = email);
    password && (data.password = password);
    Object.keys(data).length && auth.update(data);
  };

  return (
    <div className="account">
      <div className="account__container">
        <h1 className="account__title">My account</h1>
        <form action="/" className="account__form" ref={form}>
          <div>
            <label
              htmlFor="name"
              className={`account__form--label ${auth.error >= 400 && "error"}`}
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={auth.user.name}
              autoComplete="on"
              disabled={editToggle}
              className={`account__form--input input-name ${
                auth.error >= 400 && "error"
              }`}
            />
            <label
              htmlFor="email"
              className={`account__form--label ${auth.error >= 400 && "error"}`}
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              defaultValue={auth.user.email}
              autoComplete="on"
              disabled={editToggle}
              className={`account__form--input input-email ${
                auth.error >= 400 && "error"
              }`}
            />
            <label
              htmlFor="password"
              className={`account__form--label ${auth.error >= 400 && "error"}`}
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="*********"
              autoComplete="on"
              disabled={editToggle}
              className={`account__form--input input-password ${
                auth.error >= 400 && "error"
              }`}
            />
          </div>
          <p className="account__form--input-error">
            {auth.error >= 400 &&
              "Password must be longer than or equal to 4 characters"}
          </p>
          <button
            className={`account__form--login-button ${
              editToggle ? null : `active`
            }`}
            onClick={handleSubmit}
          >
            {editToggle ? "Edit" : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Account;
