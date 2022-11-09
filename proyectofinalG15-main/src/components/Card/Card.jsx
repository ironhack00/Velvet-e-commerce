import React from "react";
import style from "./Card.module.css";
import { NavLink } from "react-router-dom";
import { MdOutlineShoppingCart } from "react-icons/md";
import { AiFillHeart } from "react-icons/ai";
import { addToCart, putProduct, addToFavorite } from "../../redux/action";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";

export default function Card({ name, image, price, id, sizes, categories }) {
  const dispach = useDispatch();
  const user = useSelector((state) => state.user);
  const favorite = useSelector((state) => state.favorite);

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

  const addFavorite = (id) => {
    console.log(id, "holaa");
    const compro = favorite.filter((element) => element.id === id);
    if (compro.length > 0) {
      return swal({
        title: "Este producto ya se encuentra añadido",
        icon: "error",
      });
    }
    dispach(addToFavorite(id));
    swal({
      title: "Producto agregado a favoritos exitosamente",
      icon: "success",
      button: "Aceptar",
      className: "swal-modal",
      className: "swal-overlay",
      className: "swal-title",
    });
  };

  function handelBan() {
    dispach(putProduct({ value: "false" }, id));
    setTimeout(function () {
      window.location.reload(true);
    }, 1000);
  }

  return (
    <div className={style.content}>
      <MdOutlineShoppingCart
        className={style.carrito}
        size="40px"
        onClick={() => addCart(id)}
      />
      <NavLink to={`/product/${id}`} className={style.link}>
        <img
          src={
            image ||
            "https://static.wikia.nocookie.net/ben10/images/a/a2/Sinimagen.png/revision/latest?cb=20170610100405&path-prefix=es"
          }
          alt=""
          className={style.fondo}
        />
      </NavLink>
      <div className={style.contentInfo}>
        <div className={style.fondoRotado}></div>
        <div className={style.contnetMeGusta}>
          <AiFillHeart
            className={style.meGusta}
            size="30px"
            onClick={() => addFavorite(id)}
          />
        </div>
        <NavLink to={`/product/${id}`} className={style.link}>
          <h5>{name}</h5>
          <div className={style.talasPrecio}>
            <div className={style.tallas}>
              {sizes &&
                sizes.map((e) => {
                  return <p key={e}>{e}</p>;
                })}
            </div>
            <h6>$USD {price}</h6>
          </div>
        </NavLink>
      </div>
      {user.role == "admin" ? (
        <div className={style.admin}>
          <NavLink
            to={`/editproduct/${id}`}
            className="bg-emerald-300 py-2 px-2 rounded-3xl rounded-3xl"
          >
            Editar
          </NavLink>
          <NavLink
            className="bg-emerald-300 py-2 px-2 rounded-3xl rounded-3xl"
            onClick={() => handelBan()}
          >
            Deshabilitar
          </NavLink>
        </div>
      ) : null}
    </div>
  );
}
