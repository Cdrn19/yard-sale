import { Helmet } from "react-helmet-async";
import PropTypes from "prop-types";

const SEO = ({ title, description, name, type }) => {
  return (
    <Helmet>
      {title && <title>Yard Sale | {title}</title>}
      {description && <meta name="description" content={description} />}
      {type && <meta property="og:type" content={type} />}
      {title && <meta property="og:title" content={title} />}
      {description && <meta property="og:description" content={description} />}
      {name && <meta name="twitter:creator" content={name} />}
      {name && <meta name="twitter:card" content={type} />}
      {title && <meta name="twitter:title" content={title} />}
      {description && <meta name="twitter:description" content={description} />}
    </Helmet>
  );
};

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
};

export default SEO;
