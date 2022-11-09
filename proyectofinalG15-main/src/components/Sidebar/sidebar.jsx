import React, { useState } from "react";
import NavBar from "../NavBar/NavBar";
import { NavLink } from "react-router-dom";
import style from "./Sidebar.module.css";
import {
  getUser,
  putUser,
  searchUserLocal,
  putProduct,
  getForName,
  getProducts,
  getOrdersProducts,
  getOrders,
} from "../../redux/action";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//import { findRenderedComponentWithType } from "react-dom/test-utils";
// import { FiMinusCircle } from "react-icons/fi";
import { FiSearch } from "react-icons/fi";
import { Dropdown } from "flowbite-react";

const Sidebar = () => {
  const dispach = useDispatch();
  const user = useSelector((state) => state.user);
  const users = useSelector((state) => state.users);
  const allProducts = useSelector((state) => state.productsAll);
  const ordersProducts = useSelector((state) => state.ordersProducts);
  const orders = useSelector((state) => state.orders);

  // const res = ordersProducts.map((x, i) => {
  //   if (x.orderOrderId === orders[i]?.order_id)
  //     return {
  //       product: x.productId,
  //       emailDePersona: orders[i].email,
  //       precio: x.price,
  //       idDeLaOrden: x.orderOrderId,
  //       quantity: x.quantity,
  //     };
  // });

  // console.log(res, "acaaaaaaaaaaa");

  // const [productEse, setProductEse] = useState("");
  // function handelCualquiera(id) {
  //   setProductEse(res);
  // }

  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  function handelBanProduct(id) {
    dispach(putProduct({ value: "false" }, id));
    setTimeout(function () {
      window.location.reload(true);
    }, 1000);
  }

  function handelDesBanProduct(id) {
    dispach(putProduct({ value: "true" }, id));
    setTimeout(function () {
      window.location.reload(true);
    }, 1000);
  }

  function handelBan(id) {
    dispatch(putUser(id, { role: "inactive" }));
    setTimeout(function () {
      window.location.reload(true);
    }, 1000);
  }

  function searchUser(e) {
    e.preventDefault();
    dispatch(searchUserLocal(search));
    setSearch("");
  }

  function searchProducts(e) {
    e.preventDefault();
    dispach(getForName(search));
    setSearch("");
  }

  function handelSearch(e) {
    setSearch(e.target.value);
  }
  function recargar() {
    dispatch(getUser(user.token));
    dispatch(getProducts());
  }

  useEffect(() => {
    dispatch(getUser(user.token));
    dispatch(getProducts());
    dispatch(getOrdersProducts());
    dispatch(getOrders());
  }, [dispatch]);

  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  console.log(users, "imagen");

  return (
    <div className="bg-white">
      <NavBar />
      <div className={style.content}>
        <div className="w-full">
          <NavLink to="/formulario" className={style.butons}>
            Crear Producto
          </NavLink>
        </div>
        <div className={style.tabs}>
          <ul>
            <li
              onClick={() => {
                toggleTab(1);
                recargar();
              }}
            >
              Lista de usuarios
            </li>
            <li
              onClick={() => {
                toggleTab(2);
                recargar();
              }}
            >
              Listas de productos
            </li>
            <li
              onClick={() => {
                toggleTab(3);
                recargar();
              }}
            >
              Ordendes de compra
            </li>
          </ul>
        </div>

        <div
          className={
            toggleState === 1 ? style.contentsInfo : style.contentsInfoNo
          }
        >
          <h5>Lista de usuarios</h5>
          <form
            action=""
            onSubmit={(e) => searchUser(e)}
            className={style.search}
          >
            <input
              type="text"
              placeholder="Buscar por nombre de usuario..."
              value={search}
              onChange={(e) => handelSearch(e)}
              className={style.inputSearch}
            />

            <button type="submit" name="serach" className=" h-10">
              <FiSearch size="30" />
            </button>
          </form>
          {users &&
            users.map((element) => {
              return (
                <div
                  className={
                    element.role === "inactive"
                      ? style.contentUsersB
                      : style.contentUsers
                  }
                >
                  <p>
                    <b>Nombre de usuario:</b> {element.userName}
                  </p>
                  <p>
                    <b>Id:</b> {element.id}
                  </p>
                  <p>
                    <b>Email:</b> {element.email}
                  </p>
                  <p>
                    <b>Estado:</b> {element.role}
                  </p>
                  <button onClick={() => handelBan(element.id)}>Banear</button>
                </div>
              );
            })}
        </div>
        <div
          className={
            toggleState === 2 ? style.contentsInfo : style.contentsInfoNo
          }
        >
          <h5>Lista de productos</h5>

          <form
            action=""
            onSubmit={(e) => searchProducts(e)}
            className={style.search}
          >
            <input
              type="text"
              placeholder="Buscar producto..."
              value={search}
              onChange={(e) => handelSearch(e)}
              className={style.inputSearch}
            />

            <button type="submit" name="serach" className=" h-10">
              <FiSearch size="30" />
            </button>
          </form>
          {allProducts &&
            allProducts.map((element) => {
              return (
                <div
                  className={
                    element.value === true
                      ? style.contentProducts
                      : style.contentProductsDes
                  }
                >
                  <p>
                    <b>Nombre de producto:</b> {element.name}
                  </p>
                  <p>
                    <b>Imagen:</b>
                    <img src={element.mainImage} alt="" />
                  </p>
                  <p>
                    <b>Id:</b> {element.id}
                  </p>
                  <p>
                    <b>Actividad:</b>{" "}
                    {element.value === true ? "Activo" : "Deshabilitado"}
                  </p>

                  <NavLink
                    // className="bg-red-700 text-white  py-2 px-2 rounded-3xl rounded-3xl"
                    onClick={() => handelBanProduct(element.id)}
                    className={
                      element.value === true
                        ? style.butonsCards
                        : style.butonsCardsDes
                    }
                  >
                    Deshabilitar
                  </NavLink>
                  <NavLink
                    // className="bg-red-700 text-white  py-2 px-2 rounded-3xl rounded-3xl"
                    onClick={() => handelDesBanProduct(element.id)}
                    className={
                      element.value === false
                        ? style.butonsCards
                        : style.butonsCardsDes
                    }
                  >
                    Habilitar
                  </NavLink>

                  <NavLink
                    to={`/editproduct/${element.id}`}
                    // className="bg-red-700 text-white py-2 px-2 rounded-3xl rounded-3xl"
                    className={style.butonsCards}
                  >
                    Editar
                  </NavLink>
                </div>
              );
            })}
        </div>
        <div
          className={
            toggleState === 3 ? style.contentsOrder : style.contentsOrderNo
          }
        >
          <h5>Ordenes de compra</h5>
          {orders &&
            orders.map((element) => {
              let res = ordersProducts.filter(
                (x) => x.orderOrderId === element.order_id
              );
              console.log(res, "holaaaaaaaaaaaa");
              return (
                <div className={style.contentOderProduct}>
                  <Dropdown
                    label="Detalles"
                    inline={true}
                    // onClick={() => handelCualquiera(element.order_id)}
                  >
                    <Dropdown.Item>
                      <div>
                        <p>
                          <b>cantidad: </b> {res[0].quantity}
                        </p>
                        <p>
                          <b>Id del producto: </b> {res[0].productId}
                        </p>
                      </div>
                    </Dropdown.Item>
                  </Dropdown>
                  <p>
                    <b>Id de la orden:</b> {element?.order_id}
                  </p>
                  <p>
                    <b>Estado de la orden:</b> {element?.status}
                  </p>
                  <p>
                    <b>Nombre de el usuario:</b>{" "}
                    {element?.firstName + " " + element?.lastName}
                  </p>
                  <p>
                    <b>Email de el usuario:</b> {element?.email}
                  </p>

                  {/* <button onClick={() => handelBan(element.id)}>Banear</button> */}
                </div>
              );
            })}
          {/* <form
            action=""
            onSubmit={(e) => searchUser(e)}
            className={style.search}
          >
            <input
              type="text"
              placeholder="Buscar por nombre de usuario..."
              value={search}
              onChange={(e) => handelSearch(e)}
              className={style.inputSearch}
            />

            <button type="submit" name="serach" className=" h-10">
              <FiSearch size="30" />
            </button>
          </form> */}
          {/* {users &&
            users.map((element) => {
              return (
                <div className={style.contentUsers}>
                  <p>
                    <b>Nombre de usuario:</b> {element.userName}
                  </p>
                  <p>
                    <b>Id:</b> {element.id}
                  </p>
                  <p>
                    <b>Email:</b> {element.email}
                  </p>
                  <p>
                    <b>Estado:</b> {element.role}
                  </p>
                  <button onClick={() => handelBan(element.id)}>Banear</button>
                </div>
              );
            })} */}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
