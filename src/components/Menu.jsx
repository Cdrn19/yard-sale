import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "@styles/Menu.scss";

const Menu = ({ handleToggle }) => {
  return (
    <div className="Menu">
      <ul>
        <li>
          <Link to="/orders" onClick={() => handleToggle()}>
            My orders
          </Link>
        </li>
        <li>
          <Link to="/account" onClick={() => handleToggle()}>
            My account
          </Link>
        </li>
        <li>
          <button onClick={() => handleToggle()}>Sign out</button>
        </li>
      </ul>
    </div>
  );
};

Menu.propTypes = {
  handleToggle: PropTypes.func,
};

export default Menu;
