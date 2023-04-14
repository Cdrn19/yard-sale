import PropTypes from "prop-types";
import close from "@icons/icon_close.png";
import "@styles/OrderItem.scss";

const OrderItem = ({ product, handleRemove }) => {
  return (
    <div className="order-item">
      <figure>
        <img src={product.images[0]} alt={product.title} />
      </figure>
      <p className="order-item--title">{product.title}</p>
      <p className="order-item--price">{product.price} USD</p>
      {handleRemove && (
        <img
          src={close}
          className="order-item__icon-close"
          alt="close"
          onClick={() => handleRemove(product.id)}
        />
      )}
    </div>
  );
};

OrderItem.propTypes = {
  product: PropTypes.object,
  handleRemove: PropTypes.func,
};

export default OrderItem;
