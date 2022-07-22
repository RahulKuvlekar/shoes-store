import { NavLink, useLocation } from "react-router-dom";
import {
  HiOutlineHeart,
  HiHeart,
} from "react-icons/hi";
import { BiSearchAlt } from "react-icons/bi";
import { RiUser3Line, RiUser3Fill,RiShoppingCart2Line,RiShoppingCart2Fill } from "react-icons/ri";
import "./NavigationBar.css";
import { useProductContext } from "../../Hooks/useProductContext";

const NavigationBar = () => {
  const {
    productState: { myCart, myWishlist },
  } = useProductContext();

  const { pathname } = useLocation();

  const cartCount = Object.values(myCart)?.reduce(
    (prev, curr) => prev + curr.quantity,
    0
  );

  const wishlistCount = Object.values(myWishlist)?.length;

  return (
    <header className="nav-bar">
      <nav className="nav-bar-container">
        <div className="nav-section jus">
          <div className="burger-menu">
            <div className="line1"></div>
            <div className="line2"></div>
            <div className="line3"></div>
          </div>

          <div className="nav-logo-title">
            <NavLink className="link-no-style nav-logo" to="/">
              <img src="./Images/mainLogo.png" alt="ShoesStore" />
            </NavLink>
          </div>
          <ul className="nav-pill nav-menu">
            <li className="list-inline-item">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? `nav-active link-no-style` : `link-no-style`
                }
              >
                Home
              </NavLink>
            </li>
            <li className="list-inline-item">
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  isActive ? `nav-active link-no-style` : `link-no-style`
                }
              >
                Explore
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="nav-section">
          {/* <SearchBar /> */}
          {/* <label className="search-bar">
            <span className="search-bar-btn" type="submit">
              <i className="fa fa-search"> </i>
            </span>
            <input
              className="search-bar-input"
              type="text"
              placeholder="Type to search"
              name="search"
            />
          </label> */}

          <ul className="nav-pill nav-btn-icons">
            <li className="list-inline-item">
              <button className={`nav-icon-btn`}>
                <span className="nav-icon">
                  <BiSearchAlt />
                </span>
              </button>
            </li>
            <li className="list-inline-item">
              <NavLink
                to="/wishlist"
                className={`nav-icon-btn ${wishlistCount ? "nav-badge" : ""}`}
                data-count={wishlistCount}
              >
                <span className="nav-icon">
                  {pathname === "/wishlist" ? (
                    <HiHeart className="nav-active" />
                  ) : (
                    <HiOutlineHeart />
                  )}
                </span>
              </NavLink>
            </li>
            <li className="list-inline-item">
              <NavLink
                to="/cart"
                className={`nav-icon-btn ${cartCount ? "nav-badge" : ""}`}
                data-count={cartCount}
              >
                <span className="nav-icon">
                  {pathname === "/cart" ? (
                    <RiShoppingCart2Fill className="nav-active" />
                  ) : (
                    <RiShoppingCart2Line />
                  )}
                </span>
              </NavLink>
            </li>
            <li className="list-inline-item">
              <NavLink to="/profile" className={`nav-icon-btn`}>
                <span className="nav-icon">
                  {pathname === "/profile" ? (
                    <RiUser3Fill className="nav-active" />
                  ) : (
                    <RiUser3Line />
                  )}
                </span>
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default NavigationBar;
