import React from "react";
import { useParams, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUser,
  putUser,
  getUserId,
  removeAll,
  removeOneProduct,
  login,
  clearUser,
} from "../../redux/action";
import NavBar from "../NavBar/NavBar";
import style from "./PutUser.module.css";
import Cart from "../Cart/Cart";
import swal from "sweetalert";
import { Toast } from "flowbite-react";
import { HiOutlineMail } from "react-icons/hi";
import FavoriteList from "../FavoriteList/FavoriteList";
import OrderList from "../OrderList/OrderList";
import OrderCard from "../OrderCard/OrderCard";
import axios from "axios";

const PutUser = () => {
  const dispatch = useDispatch();
  let params = useParams();
  const user = useSelector((state) => state.user);
  const cartState = useSelector((state) => state.cart);

  //----------Order--------------//

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

  //----------------------------//

  useEffect(() => {
    dispatch(getUser());
  }, []);

  const [input, setInput] = useState({
    userName: "",
    email: "",
    phoneNumber: "",
    image: "",
  });
  const [visiblee, setVisiblee] = useState(false);

  const deleteCart = (id, todos = false) => {
    if (todos) {
      dispatch(removeAll(id));
      swal("todos los productos eliminados");
    } else {
      dispatch(removeOneProduct(id));
      swal({
        title: "Producto eliminado correctamente",
        icon: "success",
        className: "swal-title",
        className: "swal-modal",
      });
    }
  };

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  const z = (e) => {
    e.preventDefault();
    let id = params.id;
    dispatch(getUserId(id));
  };

  function handleSubmit(e, use) {
    e.preventDefault();
    dispatch(putUser(id, input));
    swal({
      title: "Usuario modificado correctamente",
      text: "Vuelve a iniciar sesion para ver los cambios",
      icon: "success",
      className: "swal-title",
      className: "swal-modal",
    });
  }

  //----------------manipuladores de imagen----------------

  const [mainImageEdit, setMainImageEdit] = useState("");
  input.image = mainImageEdit;

  console.log(input.image, "este es el body");

  const handleFiles = (e) => {
    setMainImageEdit(e.target.files[0]);
  };

  const handleAPI = async () => {
    const url = "https://velvet.up.railway.app/product/image";
    let formData = new FormData();
    formData.append("imagen1", mainImageEdit);
    const pedidoCloudUno = await axios.post(url, formData);
    setMainImageEdit(pedidoCloudUno.data);
  };
  const { email, id, phoneNumber, userName, image } = user;

  return (
    <div className="bg-white">
      <NavBar />

      <div className={style.content}>
        {user.role == "inactive" ? (
          <Toast>
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-500 dark:bg-blue-800 dark:text-blue-200">
              <NavLink to={`/verification/${user.id}`}>
                <HiOutlineMail size="30" />
              </NavLink>
            </div>
            <NavLink to={`/verification/${user.id}`}>
              <div className="ml-3 text-sm font-normal"> Confirmar email</div>
            </NavLink>
            <Toast.Toggle />
          </Toast>
        ) : null}

        <div className={style.contentPerfile}>
          <div>
            <div className={style.perileImage}>
              {input.image.length ? (
                <img src={image} alt="perfil" />
              ) : (
                <img src={image} />
              )}
              <div>
                <input
                  type="file"
                  name="imagen1"
                  onChange={(e) => handleFiles(e)}
                ></input>
                <div>
                  <button onClick={handleAPI}>SUBIR IMAGEN</button>
                </div>
              </div>
            </div>
          </div>

          <form>
            {/* <button onClick={z}>bton</button> */}
            <div className={style.inputs}>
              <p>Nombre se usuario:</p>
              <h6 className="text-gray-500">{userName}</h6>
              <input
                id="nombreInput"
                type="text"
                name="userName"
                value={input.userName}
                placeholder={userName}
                onChange={(e) => handleChange(e)}
                className={visiblee == false ? style.invisible : style.visible}
              />
            </div>

            <div className={style.inputs}>
              <p>Email:</p>
              <h6 className="text-gray-500">{email}</h6>

              <input
                id="emailInput"
                type="text"
                name="email"
                value={input.email}
                placeholder={email}
                onChange={(e) => handleChange(e)}
                className={visiblee == false ? style.invisible : style.visible}
              />
            </div>

            <div className={style.inputs}>
              <p>Numero de telofono:</p>
              <h6 className="text-gray-500">{phoneNumber}</h6>

              <input
                id="numeberInput"
                type="text"
                name="phoneNumber"
                value={input.phoneNumber}
                placeholder={phoneNumber}
                onChange={(e) => handleChange(e)}
                className={visiblee == false ? style.invisible : style.visible}
              />
            </div>

            <p
              onClick={() => setVisiblee(true)}
              className="cursor-pointer text-blue-700"
            >
              cambiar datos
            </p>
            {input.userName.length > 0 ||
            input.email.length > 0 ||
            input.phoneNumber.length > 0 ||
            input.image.length > 0 ? (
              <button
                className={style.butonApli}
                onClick={(e) => {
                  handleSubmit(e);
                }}
              >
                Confirmar cambios
              </button>
            ) : null}
          </form>
        </div>
        <div className={style.contentCarrFav}>
          <div className={style.carrito}>
            <h5>Carrito</h5>
            {cartState.length < 1 ? (
              <h6>Carrito vacio</h6>
            ) : (
              cartState.slice(0, 3).map((ele) => {
                return <Cart key={ele.id} data={ele} deleteCart={deleteCart} />;
              })
            )}
            <NavLink to="/carrito" className={style.viewAll}>
              Mostrar todos
            </NavLink>
          </div>

          <div className={style.favoritos}>
            <h5>Favoritos</h5>
            <FavoriteList />
          </div>

          <div className={style.products}>
            <h5>Productos comprados</h5>
            {products.map((element) => {
              return (
                <OrderCard name={element.name} image={element.mainImage} />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PutUser;
