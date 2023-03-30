import { useState } from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import ProductList from "@containers/ProductList";
import "@styles/Search.scss";

import searchIcon from "@icons/search.svg";
import arrow from "@icons/arrow.svg";

const Search = ({ products }) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    const value = event.target.value;
    setValue(value);
  };

  const onSearch = () => {
    return products.filter((product) => {
      return (
        product.title
          ?.toString()
          .toLowerCase()
          .indexOf(value.toString().toLowerCase().trim()) > -1
      );
    });
  };

  return (
    <>
      <div className="search">
        <div className="search__container">
          <div className="search__input">
            <img src={searchIcon} alt="search" />
            <input
              placeholder="Search product"
              type="text"
              value={value}
              onChange={onChange}
            />
          </div>
        </div>
        <div className="search__dropdown">{}</div>
        <div className="search__nav">
          <ul>
            <li>
              <NavLink to="/">All</NavLink>
            </li>
            <li>
              <NavLink to="/clothes">Clothes</NavLink>
            </li>
            <li>
              <NavLink to="/electronics">Electronics</NavLink>
            </li>
            <li>
              <NavLink to="/furnitures">Furnitures</NavLink>
            </li>
            <li>
              <NavLink to="/toys">Toys</NavLink>
            </li>
            <li>
              <NavLink to="/others">Others</NavLink>
            </li>
          </ul>
        </div>
        <div className="search__container--filter">
          <h5>Order:</h5>
          <div className="search__button--filter">
            <button>Most recent</button>
            <img src={arrow} alt="arrow" />
          </div>
        </div>
      </div>
      <ProductList products={onSearch(value)} />
    </>
  );
};

Search.propTypes = {
  products: PropTypes.array,
};

export default Search;
