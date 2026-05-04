import React, { useEffect, useState, useMemo } from "react";
import { useProduct } from "../../context/MainContext";
import scss from "./Home.module.scss";

import phone from "../../image/Category-CellPhone.svg";
import comp from "../../image/Category-Computer.svg";
import smart from "../../image/Category-SmartWatch.svg";
import headph from "../../image/Category-Headphone.svg";
import game from "../../image/Category-Gamepad.svg";
import camera from "../../image/584abf212912007028bd9334.png";
import { NavLink } from "react-router-dom";

const images = [
  "https://www.nextpit.com/img/Best_Smartphones_October_2023.jpg",
  "https://omolo.fr/cdn/shop/articles/best-laptop-brands-20230420-3-medium.jpg?v=1709128804",
  "https://static.independent.co.uk/2024/11/01/16/best-tablets-1-november-2024.jpg",
];

const getDiscountPrice = (price, discount) => {
  const d = Number(discount) || 0;
  return d > 0 ? Math.round(price - (price * d) / 100) : price;
};

const Home = () => {
  const { product, readProduct, deleteProduct, addOrder } = useProduct();

  const [category, setCategory] = useState("all");
  const [index, setIndex] = useState(0);
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    readProduct();
  }, []);

  // TIMER
  useEffect(() => {
    const endTime = Date.now() + 3 * 24 * 60 * 60 * 1000;
    const timer = setInterval(() => {
      const diff = endTime - Date.now();
      if (diff <= 0) return clearInterval(timer);
      setTime({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // SLIDER
  useEffect(() => {
    const slider = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 2500);
    return () => clearInterval(slider);
  }, []);

  // Товары со скидкой
  const flashProducts = useMemo(() => {
    if (!product) return [];
    return product.filter((item) => Number(item.discount) > 0);
  }, [product]);

  // Все товары с фильтром
  const filteredProducts = useMemo(() => {
    if (!product) return [];
    return product.filter(
      (item) => category === "all" || item.category === category,
    );
  }, [product, category]);

  // Карточка товара
  const ProductCard = ({ item }) => (
    <div className={scss.card}>
      <div className={scss.imgWrapper}>
        <img src={item.img} alt={item.name} />
        {item.discount > 0 && (
          <div className={scss.badge}>-{item.discount}%</div>
        )}
      </div>

      <h3>{item.name}</h3>

      <p>
        {item.discount > 0 ? (
          <>
            <span className={scss.old}>{item.price} $</span>
            <span className={scss.new}>
              {getDiscountPrice(item.price, item.discount)} $
            </span>
          </>
        ) : (
          <span>{item.price} $</span>
        )}
      </p>

      <div className={scss.actions}>
        <button onClick={() => deleteProduct(item._id)}>Delete</button>
        <button onClick={() => addOrder({ item })}>Add to cart</button>
      </div>
    </div>
  );

  return (
    <div className="container">
      <div className={scss.home}>
        {/* TOP: SIDEBAR + SLIDER */}
        <div className={scss.top}>
          <div className={scss.text}>
            <h5>
              Woman's Fashion <span>›</span>
            </h5>
            <h5>
              Men's Fashion <span>›</span>
            </h5>
            <h5>Electronics</h5>
            <h5>Home & Lifestyle</h5>
            <h5>Medicine</h5>
            <h5>Sports & Outdoor</h5>
            <h5>Baby's & Toys</h5>
            <h5>Groceries & Pets</h5>
            <h5>Health & Beauty</h5>
          </div>
          <hr />
          <div className={scss.slider}>
            <img src={images[index]} alt="banner" />
          </div>
        </div>

        {/* FLASH SALES */}
        <div className={scss.flashSection}>
          <div className={scss.sectionHeader}>
            <div className={scss.left}>
              <div className={scss.tag}>
                <div className={scss.redBar} />
                <span>Today's</span>
              </div>
              <h2>Flash Sales</h2>
              <div className={scss.timer}>
                <div className={scss.timeUnit}>
                  <label>Days</label>
                  <span>{String(time.days).padStart(2, "0")}</span>
                </div>
                <span className={scss.colon}>:</span>
                <div className={scss.timeUnit}>
                  <label>Hours</label>
                  <span>{String(time.hours).padStart(2, "0")}</span>
                </div>
                <span className={scss.colon}>:</span>
                <div className={scss.timeUnit}>
                  <label>Minutes</label>
                  <span>{String(time.minutes).padStart(2, "0")}</span>
                </div>
                <span className={scss.colon}>:</span>
                <div className={scss.timeUnit}>
                  <label>Seconds</label>
                  <span>{String(time.seconds).padStart(2, "0")}</span>
                </div>
              </div>
            </div>
            <div className={scss.arrows}>
              <button>&#8592;</button>
              <button>&#8594;</button>
            </div>
          </div>

          {flashProducts.length === 0 ? (
            <p className={scss.empty}>
              Нет товаров со скидкой. Добавьте товар с discount &gt; 0
            </p>
          ) : (
            <div className={scss.grid}>
              {flashProducts.map((item) => (
                <ProductCard key={item._id} item={item} />
              ))}
            </div>
          )}

          <div className={scss.viewAll}>
            <button>View All Products</button>
          </div>
        </div>

        <hr className={scss.divider} />

        {/* BROWSE BY CATEGORY */}
        <div className={scss.categorySection}>
          <div className={scss.sectionHeader}>
            <div className={scss.left}>
              <div className={scss.tag}>
                <div className={scss.redBar} />
                <span>Categories</span>
              </div>
              <h2>Browse By Category</h2>
            </div>
            <div className={scss.arrows}>
              <button>&#8592;</button>
              <button>&#8594;</button>
            </div>
          </div>
        </div>

        {/* FILTERS */}
        <div className={scss.filters}>
          {[
            { key: "all", label: "All" },
            { key: "phones", label: "Phones", icon: phone },
            { key: "computers", label: "Computers", icon: comp },
            { key: "smartwatch", label: "SmartWatch", icon: smart },
            { key: "camera", label: "Camera", icon: camera },
            { key: "headphones", label: "HeadPhones", icon: headph },
            { key: "gaming", label: "Gaming", icon: game },
          ].map((btn) => (
            <button
              key={btn.key}
              className={category === btn.key ? scss.active : ""}
              onClick={() => setCategory(btn.key)}
            >
              {btn.icon && <img src={btn.icon} alt="" />}
              {btn.label}
            </button>
          ))}
        </div>

        <hr className={scss.divider} />

        {/* ALL PRODUCTS */}
        <div className={scss.sectionHeader}>
          <div className={scss.left}>
            <div className={scss.tag}>
              <div className={scss.redBar} />
              <span>This Month</span>
            </div>
            <h2>Best Selling Products</h2>
          </div>
          <div className={scss.arrows}>
            <button>View All</button>
          </div>
        </div>

        <div className={scss.grid}>
          {filteredProducts.map((item) => (
            <ProductCard key={item._id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
