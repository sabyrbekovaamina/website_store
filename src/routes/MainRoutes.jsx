import React from "react";
import Home from "../pages/home/Home";
import Contact from "../pages/contact/Contact";
import About from "../pages/about/About";
import Login from "../pages/auth/login/Login";
import Heart from "../pages/heart/Heart";
import Cart from "../pages/cart/Cart";
import { Route, Routes } from "react-router-dom";
import Add from "../pages/add/Add";
import Check from "../pages/check/Check";
import Register from "../pages/auth/register/Register";

const MainRoutes = () => {
  const routes = [
    {
      link: "/home",
      element: <Home />,
    },
    {
      link: "/add",
      element: <Add />,
    },
    {
      link: "/contact",
      element: <Contact />,
    },
    {
      link: "/about",
      element: <About />,
    },
    {
      link: "/signUp",
      element: <Login />,
    },
    {
      link: "/heart",
      element: <Heart />,
    },
    {
      link: "/cart",
      element: <Cart />,
    },
    {
      link: "/check",
      element: <Check />,
    },
    {
      link: "/register",
      element: <Register />,
    },
  ];
  return (
    <div>
      <Routes>
        {routes.map((item) => (
          <Route path={item.link} element={item.element} />
        ))}
      </Routes>
    </div>
  );
};
export default MainRoutes;
