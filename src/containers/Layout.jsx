import Header from "@components/Header";
import PropTypes from "prop-types";

const Layout = ({ children }) => {
  return (
    <div className="Layout">
      <Header />
      {children}
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.element,
};

export default Layout;
