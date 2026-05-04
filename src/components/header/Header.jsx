import React from "react";
import scss from "./Header.module.scss";
import search from "../../image/Vector (3).svg";
import heart from "../../image/Wishlist.svg";
import cart from "../../image/Cart1 with buy.svg";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();

  const getInitial = () => {
    if (user?.displayName) return user.displayName[0].toUpperCase();
    if (user?.email) return user.email[0].toUpperCase();
    return "U";
  };

  const getColor = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return `hsl(${hash % 360}, 60%, 50%)`;
  };

  return (
    <div>
      <div className={scss.header}>
        <div className={scss.shop}>
          <h5>
            Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
          </h5>
          <a href="">ShopNow</a>
        </div>
        <div className={scss.check}>
          <h4>English</h4>
          <input type="checkbox" />
        </div>
      </div>
      <div className="container">
        <div className={scss.header2}>
          <div className={scss.logo}>
            <h2>Exclusive</h2>
          </div>
          <div className={scss.nav}>
            <NavLink to="/home">
              <h3>Home</h3>
            </NavLink>
            <NavLink to="/contact">
              <h3>Contact</h3>
            </NavLink>
            <NavLink to="/about">
              <h3>About</h3>
            </NavLink>
            <NavLink to="/signUp">
              <h3>Sign Up</h3>
            </NavLink>
            <NavLink to="/add">
              <h3>Add</h3>
            </NavLink>
          </div>
          <div className={scss.icons}>
            <div className={scss.searchWrapper}>
              <input
                className={scss.searchInput}
                placeholder="What are you looking for?"
              />
              <img src={search} alt="search" className={scss.searchIcon} />
            </div>

            <div className={scss.navicon}>
              <NavLink to="/heart">
                <img src={heart} alt="" />
              </NavLink>

              <NavLink to="/cart">
                <img src={cart} alt="" />
              </NavLink>
            </div>

            {/* AUTH SECTION */}
            {user ? (
              <>
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="avatar"
                    className={scss.avatarImg}
                  />
                ) : (
                  <div
                    className={scss.avatar}
                    style={{
                      "--avatar-bg": getColor(user.email || "user"),
                    }}
                  >
                    {getInitial()}
                  </div>
                )}

                <button onClick={logout}>Logout</button>
              </>
            ) : (
              <NavLink to="/signUp">
                <h3>Sign Up</h3>
              </NavLink>
            )}
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default Header;
