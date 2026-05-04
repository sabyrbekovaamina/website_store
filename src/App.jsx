import React from "react";
import Layout from "./components/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div>
      <Layout />
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default App;
