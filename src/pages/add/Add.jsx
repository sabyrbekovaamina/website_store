import React, { useState } from "react";
import { useProduct } from "../../context/MainContext";
import scss from "./Add.module.scss";

const Add = () => {
  const { addProduct } = useProduct();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [img, setImg] = useState("");
  const [discount, setDiscount] = useState("");
  const [category, setCategory] = useState("");

  const handleClick = () => {
    // 🔴 проверка на пустые поля (ВАЖНО: discount=0 допустим)
    // if (
    //   name.trim() === "" ||
    //   price === "" ||
    //   img.trim() === "" ||
    //   category === "" ||
    //   discount === ""
    // ) {
    //   alert("Заполните все поля");
    //   return;
    // }

    // 🔴 проверка цены
    if (Number(price) <= 0) {
      alert("Цена должна быть больше 0");
      return;
    }

    // 🔴 проверка скидки
    if (Number(discount) < 0 || Number(discount) > 100) {
      alert("Скидка должна быть от 0 до 100%");
      return;
    }

    const obj = {
      name: name.trim(),
      price: Number(price),
      img: img.trim(),
      category,
      discount: Number(discount),
    };

    console.log("Отправляем товар:", obj);

    addProduct(obj);

    // 🔄 очистка формы
    setName("");
    setPrice("");
    setImg("");
    setCategory("");
    setDiscount("");
  };

  return (
    <div className={scss.add}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
        placeholder="name"
      />

      <input
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        type="number"
        placeholder="price"
      />

      <input
        value={img}
        onChange={(e) => setImg(e.target.value)}
        type="text"
        placeholder="img"
      />

      <input
        value={discount}
        onChange={(e) => setDiscount(e.target.value)}
        type="number"
        placeholder="discount %"
        min="0"
        max="100"
      />

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Select category</option>
        <option value="phones">Phones</option>
        <option value="computers">Computers</option>
        <option value="smartwatch">SmartWatch</option>
        <option value="camera">Camera</option>
        <option value="headphones">HeadPhones</option>
        <option value="gaming">Gaming</option>
      </select>

      <button onClick={handleClick}>create</button>
    </div>
  );
};

export default Add;
