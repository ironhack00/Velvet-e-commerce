import React from "react";
import style from "./Cart.module.css";
import { MdOutlineDelete } from "react-icons/md";
import { NavLink } from "react-router-dom";

export default function Cart({ data, deleteCart }) {
  const { id, name, price, mainImage, cantidad } = data;
  return (
    <div className={style.content}>
      <div className={style.contentButonDelate}>
        <MdOutlineDelete
          size="30px"
          className={style.butonDelate}
          onClick={() => deleteCart(id)}
        />
        <button onClick={() => deleteCart(id, true)}></button>
      </div>
      <img src={mainImage} alt="" />
      <div className={style.preceTitle}>
        <h3>{name}</h3>
        <p>
          $ {price} x {cantidad} = {price * cantidad}
        </p>
      </div>
      <div className={style.butons}>
        <NavLink to={`/product/${id}`} className={style.viewDetail}>
          Ver detalles
        </NavLink>
      </div>
    </div>
  );
}
