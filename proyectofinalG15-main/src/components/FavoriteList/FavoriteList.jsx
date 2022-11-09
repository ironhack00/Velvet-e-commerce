import React from "react";
import style from "./FavoriteList.module.css";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IoHeartDislikeOutline } from "react-icons/io5";

import {
  clearCart,
  removeOneProductFavorite,
  removeAllFavorite,
} from "../../redux/action";
import swal from "sweetalert";
import FavoriteCart from "../FavoriteCard/FavoriteCart";

export default function CartList() {
  const favorite = useSelector((state) => state.favorite);
  const favoriteTotal = useSelector((state) => state.favoriteTotal);
  const user = useSelector((state) => state.user);
  const dispach = useDispatch();

  const deleteFavorite = (id, favoriteTotal = false) => {
    if (favoriteTotal) {
      dispach(removeAllFavorite(id));
      swal("todos los productos eliminados");
    } else {
      dispach(removeOneProductFavorite(id));
      swal({
        title: "Producto eliminado correctamente",
        icon: "success",
        className: "swal-title",
        className: "swal-modal",
      });
    }
  };

  return (
    <div className={style.list}>
      {favorite.length < 1 ? (
        <div className="flex flex-col items-center">
          <IoHeartDislikeOutline size="30" />
          <h6>Favoritos vacio</h6>
        </div>
      ) : (
        favorite.map((ele) => (
          <FavoriteCart data={ele} deleteFavorite={deleteFavorite} />
        ))
      )}

      <div className={style.viewAll}>
        {favorite.length < 1 || Object.entries(user).length === 0 ? null : (
          <NavLink to={`/user/${user.id}`} className={style.viewAll}>
            Mostrar todos
          </NavLink>
        )}
      </div>
    </div>
  );
}
