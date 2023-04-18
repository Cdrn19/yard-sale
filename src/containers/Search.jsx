import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import ProductList from "@containers/ProductList";
import "@styles/Search.scss";

import searchIcon from "@icons/search.svg";
import arrow from "@icons/arrow.svg";

const Search = ({ products }) => {
  const [value, setValue] = useState("");
  const [toggle, setToggle] = useState(false);
  const [filteredBy, setFilteredBy] = useState("Most Recent");
  const refFilter = useRef(null);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
  }, []);

  const handleClickOutside = (e) => {
    if (!refFilter?.current?.contains(e.target)) {
      setToggle(false);
    }
  };

  const filterToggle = (button) => {
    setToggle(!toggle);
    setFilteredBy(button);
    filter(button);
  };

  const filter = (filter) => {
    switch (filter) {
      case "Price: low to high":
        products.sort((a, b) => a.price - b.price);
        break;
      case "Price: high to low":
        products.sort((a, b) => b.price - a.price);
        break;
      default:
        products.sort((a, b) => b.creationAt - a.creationAt);
        break;
    }
  };

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
            <img src={searchIcon} alt="search" width="15" height="15" />
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
              <NavLink to="/category/clothes">Clothes</NavLink>
            </li>
            <li>
              <NavLink to="/category/electronics">Electronics</NavLink>
            </li>
            <li>
              <NavLink to="/category/furnitures">Furnitures</NavLink>
            </li>
            <li>
              <NavLink to="/category/toys">Toys</NavLink>
            </li>
            <li>
              <NavLink to="/category/others">Others</NavLink>
            </li>
          </ul>
        </div>
        <div className="search__container--filter" ref={refFilter}>
          <h5>Order:</h5>
          <div className="search__button--filter">
            <button onClick={() => filterToggle(filteredBy)}>
              {filteredBy}
            </button>
            <img src={arrow} alt="arrow" width="6" height="10.28" />
            <>
              {toggle && (
                <ul>
                  <li>
                    <button onClick={() => filterToggle("Most recent")}>
                      Most recent
                    </button>
                  </li>
                  <li>
                    <button onClick={() => filterToggle("Price: low to high")}>
                      Price: low to high
                    </button>
                  </li>
                  <li>
                    <button onClick={() => filterToggle("Price: high to low")}>
                      Price: high to low
                    </button>
                  </li>
                </ul>
              )}
            </>
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
