import React from "react";
import OrderCard from "../OrderCard/OrderCard";
import style from "./OrderList.module.css";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export default function OrderList() {
  const user = useSelector((state) => state.user);
  const order = useSelector((state) => state.orders);
  const orderProducts = useSelector((state) => state.ordersProducts);
  const productsAll = useSelector((state) => state.productsAll);
  const res = order.filter((element) => element.user_id === user.id);
  const ids = res.map((element) => element.order_id);

  const array = [];
  for (let i = 0; i < orderProducts.length; i++) {
    for (let j = 0; j < orderProducts.length - 1; j++) {
      if (orderProducts[i].orderOrderId == ids[j]) {
        array.push(orderProducts[i]);
      }
    }
  }

  let products = [];
  for (let i = 0; i < productsAll.length; i++) {
    for (let j = 0; j < productsAll.length - 1; j++) {
      if (productsAll[i]?.id == array[j]?.productId) {
        products.push(productsAll[i]);
      }
    }
  }
  console.log(products, "products");
  console.log(array, "array");

  return (
    <div className={style.content}>
      {products.length > 1 ? (
        products.slice(0, 3).map((element) => {
          return <OrderCard name={element.name} image={element.mainImage} />;
        })
      ) : (
        <div className={style.list}>
          <h6>Sin ordenes de compra</h6>
        </div>
      )}

      {array.length < 1 || Object.entries(user).length === 0 ? null : (
        <NavLink to={`/user/${user.id}`} className={style.viewAll}>
          Mostrar todos
        </NavLink>
      )}
    </div>
  );
}
