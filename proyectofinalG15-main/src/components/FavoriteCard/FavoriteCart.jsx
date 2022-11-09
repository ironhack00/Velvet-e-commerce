import React from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/action";
import style from "./FavoriteCart.module.css";
import swal from "sweetalert";

export default function FavoriteCart({ data, deleteFavorite }) {
  const { id, name, mainImage } = data;
  const dispach = useDispatch();

  const addCart = (id) => {
    console.log(id);
    dispach(addToCart(id));
    swal({
      title: "Producto agregado al carrito",
      icon: "success",
      button: "Aceptar",
      className: "swal-modal",
      className: "swal-overlay",
      className: "swal-title",
    });
  };

  return (
    <div className={style.content}>
      <img src={mainImage} alt="imagen de el peroducto" />
      <h3>{name}</h3>
      <div className={style.carrito}>
        <MdOutlineShoppingCart size="30" onClick={() => addCart(id)} />

        <MdOutlineDelete
          size="30px"
          className={style.butonDelate}
          onClick={() => deleteFavorite(id)}
        />
      </div>
    </div>
  );
}
