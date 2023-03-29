const API = process.env.API;
const VERSION = process.env.VERSION;

const endPoints = {
  auth: {
    login: `${API}/${VERSION}/auth/login`,
    profile: `${API}/${VERSION}/auth/profile`,
  },
  products: {
    all: `${API}/${VERSION}/products`,
  },
};

export default endPoints;
