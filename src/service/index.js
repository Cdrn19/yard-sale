const API = process.env.API;
const VERSION = process.env.VERSION;

const endPoints = {
  auth: {
    login: `${API}/${VERSION}/auth/login`,
    profile: `${API}/${VERSION}/auth/profile`,
  },
  users: {
    create: `${API}/${VERSION}/users`,
    update: `${API}/${VERSION}/users/`,
    check: `${API}/${VERSION}/users/is-available`,
  },
  products: {
    all: `${API}/${VERSION}/products`,
  },
  categories: {
    clothes: `${API}/${VERSION}/categories/1/products`,
    electronics: `${API}/${VERSION}/categories/2/products`,
    furnitures: `${API}/${VERSION}/categories/3/products`,
    toys: `${API}/${VERSION}/categories/4/products`,
    others: `${API}/${VERSION}/categories/5/products`,
  },
};

export default endPoints;
