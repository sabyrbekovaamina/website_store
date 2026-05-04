import React, { useEffect, useState } from "react";
import scss from "./Check.module.scss";
import { useProduct } from "../../context/MainContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

const TOKEN_API = import.meta.env.VITE_TG_TOKEN;
const CHAT_ID = import.meta.env.VITE_TG_CHAT_ID;
const URL_API = `https://api.telegram.org/bot${TOKEN_API}/sendMessage`;

const EMPTY_FORM = { name: "", address: "", city: "", phone: "", email: "" };

const Check = () => {
  const { check, readCheck, clearCheck, deleteCheck } = useProduct();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    readCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getPrice = (el) => el?.item?.price ?? 0;
  const getName = (el) => el?.item?.name ?? "—";
  const getImg = (el) => el?.item?.img ?? null;

  const total = check.reduce(
    (sum, el) => sum + getPrice(el) * (el.count || 1),
    0,
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Удалить один товар
  const handleDeleteItem = async (id) => {
    await deleteCheck(id);
  };

  // ✅ Очистить всё и вернуться назад
  // const handleCancel = async () => {
  //   await clearCheck();
  //   navigate(-1);
  // };

  const sendOrderToTelegram = async () => {
    const { name, address, city, phone, email } = formData;
    if (!name || !address || !city || !phone || !email) {
      toast.warning("Заполните все обязательные поля *");
      return;
    }
    if (check.length === 0) {
      toast.warning("Корзина пуста");
      return;
    }

    setLoading(true);

    let text = `🛒 New order:\n\n`;
    text += `👤 Name: ${name}\n`;
    text += `📍 Address: ${address}\n`;
    text += `🏙 City: ${city}\n`;
    text += `📞 Phone: ${phone}\n`;
    text += `📧 Email: ${email}\n\n`;
    text += `📦 Products:\n`;
    check.forEach((el, i) => {
      text += `${i + 1}) ${getName(el)}\n`;
      text += `   Price: ${getPrice(el)} $\n`;
      text += `   Quantity: ${el.count || 1}\n\n`;
    });
    text += `💰 Total: ${total} $`;

    try {
      await axios.post(URL_API, { chat_id: CHAT_ID, text });

      // ✅ Очищаем check и форму
      await clearCheck();
      setFormData(EMPTY_FORM);

      toast.success("Заказ отправлен ✅");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Ошибка при отправке ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className={scss.check}>
        {/* LEFT — FORM */}
        <div className={scss.form}>
          <h2>Billing Details</h2>
          <input
            name="name"
            placeholder="First Name *"
            value={formData.name}
            onChange={handleChange}
          />
          <input placeholder="Company Name" />
          <input
            name="address"
            placeholder="Street Address *"
            value={formData.address}
            onChange={handleChange}
          />
          <input placeholder="Apartment, floor, etc." />
          <input
            name="city"
            placeholder="Town / City *"
            value={formData.city}
            onChange={handleChange}
          />
          <input
            name="phone"
            placeholder="Phone Number *"
            value={formData.phone}
            onChange={handleChange}
          />
          <input
            name="email"
            placeholder="Email Address *"
            value={formData.email}
            onChange={handleChange}
          />
          <label className={scss.checkbox}>
            <input type="checkbox" />
            Save this information for faster check-out next time
          </label>
        </div>

        {/* RIGHT — ORDER */}
        <div className={scss.order}>
          {check.length === 0 ? (
            <p>Корзина пуста</p>
          ) : (
            check.map((el) => (
              <div key={el._id} className={scss.item}>
                {getImg(el) && <img src={getImg(el)} alt={getName(el)} />}
                <div className={scss.item__info}>
                  <p>{getName(el)}</p>
                  <span>× {el.count || 1}</span>
                </div>
                <span>{getPrice(el) * (el.count || 1)} $</span>

                {/* ✅ Кнопка удалить товар */}
                <button
                  className={scss.item__delete}
                  onClick={() => handleDeleteItem(el._id)}
                  title="Удалить товар"
                >
                  ✕
                </button>
              </div>
            ))
          )}

          <div className={scss.summary}>
            <div>
              <p>Subtotal:</p>
              <span>{total} $</span>
            </div>
            <div>
              <p>Shipping:</p>
              <span>Free</span>
            </div>
            <div className={scss.total}>
              <p>Total:</p>
              <span>{total} $</span>
            </div>
          </div>

          <button
            className={scss.orderBtn}
            onClick={sendOrderToTelegram}
            disabled={loading}
          >
            {loading ? "Отправка..." : "Place Order"}
          </button>

          {/* ✅ Кнопка назад */}
          <button className={scss.backBtn} onClick={() => navigate(-1)}>
            ← Back to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Check;
