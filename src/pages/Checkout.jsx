import { useShoppingCart } from "@hooks/useShoppingCart";
import OrderItem from "@components/OrderItem";
import SEO from "@components/SEO";
import "@styles/Checkout.scss";

const Checkout = () => {
  const { state } = useShoppingCart();

  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const currentDate = `${month}.${day}.${year}`;

  const sumCart = () => {
    const reducer = (accumulator, currentValue) =>
      accumulator + currentValue.price;
    const sum = state.cart.reduce(reducer, 0);
    return sum;
  };

  return (
    <>
      <SEO title="Checkout" />
      <div className="checkout">
        <div className="checkout__container">
          <h1 className="checkout__container--title">My order</h1>
          <div className="checkout__content">
            <div className="checkout__content--order">
              <p>
                <span>{currentDate}</span>
                <span>
                  {state.cart.length}{" "}
                  {state.cart.length <= 1 ? "article" : "articles"}
                </span>
              </p>
              <p>{sumCart()} USD</p>
            </div>
          </div>
          {state.cart.map((product) => (
            <OrderItem key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Checkout;
