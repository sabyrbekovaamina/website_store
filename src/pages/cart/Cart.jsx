import React, { useEffect } from "react";
import { useProduct } from "../../context/MainContext";
import scss from "./Cart.module.scss";
import { NavLink, useNavigate } from "react-router-dom";

const Cart = () => {
  const { order, readOrder, deleteOrder, changeCount, addCheck } = useProduct();

  useEffect(() => {
    readOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // внутри компонента Cart:
  const navigate = useNavigate();

  const handleCheckout = async () => {
    // ✅ Отправляем по одному, не одновременно
    for (const item of order) {
      await addCheck({
        item: item.item,
        count: item.count || 1,
      });
    }
    navigate("/check");
  };

  // ✅ БАГ 1 исправлен: добавлены скобки для правильного приоритета операций
  const totalPrice = order.reduce(
    (sum, item) => sum + item.item.price * (item.count || 1),
    0,
  );

  return (
    <div className={scss.cart}>
      <h2>Cart</h2>

      {order.length === 0 ? (
        <p>Корзина пуста</p>
      ) : (
        <>
          {/* ✅ БАГ 2 исправлен: список товаров отдельно от итога */}
          {order.map((item) => (
            <div className={scss.cart__item} key={item._id}>
              <div className={scss.main_item}>
                <img src={item.item.img} alt={item.item.name} />

                <div className={scss.cart__info}>
                  <h3>{item.item.name}</h3>
                  <p>{item.item.price * (item.count || 1)} $</p>

                  <div className={scss.cart__counter}>
                    <button onClick={() => changeCount(item._id, "dec")}>
                      -
                    </button>
                    <span>{item.count || 1}</span>
                    <button onClick={() => changeCount(item._id, "inc")}>
                      +
                    </button>
                  </div>
                </div>

                <button
                  className={scss.cart__right}
                  onClick={() => deleteOrder(item._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

          {/* ✅ БАГ 2 исправлен: одна кнопка в конце, вне .map */}
          {/* ✅ БАГ 3 исправлен: передаём весь order, а не один item */}
          <div className={scss.cart__total}>
            <h3>Total: {totalPrice} $</h3>
            <button onClick={handleCheckout}>Proceed to checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
