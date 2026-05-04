import axios from "axios";
import React, { createContext, useContext, useState } from "react";

// ✅ Вынесены за пределы компонента — не пересоздаются при каждом рендере
const API = "https://api-crud.elcho.dev/api/v1/b4178-81c11-8e60d/shop";
const ORDER_API = "https://api-crud.elcho.dev/api/v1/d6545-0f415-15797/cart";
const CHECK_API = "https://api-crud.elcho.dev/api/v1/62e1c-6a6f2-efed0/check";

const productContext = createContext(null);
export const useProduct = () => useContext(productContext);

const MainContext = ({ children }) => {
  const [product, setProduct] = useState([]);
  const [order, setOrder] = useState([]);
  const [check, setCheck] = useState([]);

  // — Product —

  async function addProduct(newProduct) {
    try {
      console.log("addProduct вызван с:", newProduct);
      await axios.post(API, newProduct);
      await readProduct();
    } catch (error) {
      console.error("addProduct error:", error);
    }
  }

  async function readProduct() {
    try {
      const { data } = await axios.get(API);
      setProduct(data.data);
    } catch (error) {
      console.error("readProduct error:", error);
    }
  }

  async function deleteProduct(id) {
    try {
      await axios.delete(`${API}/${id}`);
      await readProduct();
    } catch (error) {
      console.error("deleteProduct error:", error);
    }
  }

  // — Order —

  async function addOrder(newOrder) {
    try {
      await axios.post(ORDER_API, newOrder);
      await readOrder();
    } catch (error) {
      console.error("addOrder error:", error);
    }
  }

  async function readOrder() {
    try {
      const { data } = await axios.get(ORDER_API);
      setOrder(data.data);
    } catch (error) {
      console.error("readOrder error:", error);
    }
  }

  async function deleteOrder(id) {
    try {
      await axios.delete(`${ORDER_API}/${id}`);
      await readOrder();
    } catch (error) {
      console.error("deleteOrder error:", error);
    }
  }

  const changeCount = (id, type) => {
    setOrder((prev) =>
      prev.map((el) => {
        if (el._id !== id) return el;
        const count = el.count || 1;
        if (type === "inc") return { ...el, count: count + 1 };
        if (type === "dec" && count > 1) return { ...el, count: count - 1 };
        return el;
      }),
    );
  };

  // — Check —

  async function addCheck(newCheck) {
    try {
      await axios.post(CHECK_API, newCheck);
      await readCheck();
    } catch (error) {
      console.error("addCheck error:", error);
    }
  }

  async function readCheck() {
    try {
      const res = await axios.get(CHECK_API);
      setCheck(res?.data?.data ?? []);
    } catch (error) {
      console.error("readCheck error:", error);
      setCheck([]);
    }
  }

  async function deleteCheck(id) {
    try {
      await axios.delete(`${CHECK_API}/${id}`);
      await readCheck();
    } catch (error) {
      console.error("deleteCheck error:", error);
    }
  }

  // ✅ БАГ 1 исправлен: "CHECK_API${item._id}" → `${CHECK_API}/${item._id}`
  // ✅ БАГ 2 исправлен: res.data → res.data.data
  const clearCheck = async () => {
    try {
      const res = await axios.get(CHECK_API);
      await Promise.all(
        res.data.data.map((item) => axios.delete(`${CHECK_API}/${item._id}`)),
      );
      setCheck([]);
    } catch (error) {
      console.error("clearCheck error:", error);
    }
  };

  const values = {
    product,
    readProduct,
    addProduct,
    deleteProduct,
    order,
    readOrder,
    addOrder,
    deleteOrder,
    changeCount,
    check,
    readCheck,
    addCheck,
    deleteCheck,
    clearCheck,
  };

  return (
    <productContext.Provider value={values}>{children}</productContext.Provider>
  );
};

export default MainContext;
