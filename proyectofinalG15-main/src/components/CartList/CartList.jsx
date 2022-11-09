import React from "react";
import Cart from "../Cart/Cart";
import style from "./CartList.module.css";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, removeOneProduct, removeAll } from "../../redux/action";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import swal from "sweetalert";

export default function CartList() {
  const cartState = useSelector((state) => state.cart);
  const total = useSelector((state) => state.cartTotal);
  const dispach = useDispatch();

  const deleteCart = (id, todos = false) => {
    if (todos) {
      dispach(removeAll(id));
      swal("todos los productos eliminados");
    } else {
      dispach(removeOneProduct(id));
      swal({
        title: "Producto eliminado correctamente",
        icon: "success",
        className: "swal-title",
        className: "swal-modal",
      });
    }
  };

  return (
    <div className={style.cart}>
      {cartState.length < 1 ? (
        <div className="flex items-center flex-col">
          <MdOutlineRemoveShoppingCart size="40" />
          <h6>Carrito vacio</h6>
        </div>
      ) : (
        cartState.slice(0, 3).map((ele) => {
          return <Cart key={ele.id} data={ele} deleteCart={deleteCart} />;
        })
      )}
      <div className={style.contentAll}>
        {cartState.length < 1 ? null : (
          <NavLink to="/carrito" className={style.viewAll}>
            Mostrar todos
          </NavLink>
        )}
      </div>
      {/* {cartState.length < 1 ? null : (
        <div>{<h2>Total de compra ${total}</h2>}</div>
      )} */}
    </div>
  );
}
