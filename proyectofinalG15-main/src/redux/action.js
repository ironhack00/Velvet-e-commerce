import axios from "axios";
import { MdArrowBackIos } from "react-icons/md";
import swal from "sweetalert";
import { CONSTANTES } from "./constantes";


const datosdeploy = "https://velvet.up.railway.app/product";

export function getProducts() {
  return async function (dispatch) {
    try {
      const data = (await axios(datosdeploy)).data;
      return dispatch({ type: "GET_PRODUCTS", payload: data });
    } catch (error) {
      console.log(error, "error en la ruta principal");
    }
  };
}

export function getDetail(id) {
  return async function (dispatch) {
    try {
      let infoId = await axios.get(`${datosdeploy}/${id}`);
      return dispatch({
        type: "GET_ID",
        payload: infoId.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function putProduct(payload, id) {
  console.log(payload, id, "datos de ban");
  return async function (dispatch) {
    let respuesta = await axios.put(
      `https://velvet.up.railway.app/product/${id}`,
      payload
    );
    console.log(respuesta.data, "put products");
  };
}

export const getForName = (name) => {
  return async function (dispatch) {
    try {
      if (name) {
        let respuesta = await axios(
          `https://velvet.up.railway.app/products?search=${name}`
        );
        return dispatch({
          type: CONSTANTES.SEARCH_NAME,
          payload: respuesta.data,
        });
      } else {
        swal("INGRESA UN NOMBRE DEL PRODUCTO");
      }
    } catch (error) {
      console.log("ERROR EN LA LLAMADA POR QUERY NOMBRE ", error);
      alert("NO EXISTE El PRODUCTO QUE BUSCA");
    }
  };
};

export function filterByCategorys(payload) {
  return {
    type: CONSTANTES.FILTER_BY_CATEGORYS,
    payload,
  };
}

export function OrderPrice(payload) {
  return {
    type: "ORDER_PRICE",
    payload,
  };
}

export function filterSize(payload) {
  return {
    type: "FILTER_SIZE",
    payload,
  };
}

export function filterType(payload) {
  return {
    type: "FILTER_TYPE",
    payload,
  };
}
export function agreadoNuevoEstado(payload){
  return{
    type: "AGREGAR",
    payload,
  }
}
export const formularioDeCreacion = async (payload) => {
  try {
    let crearProduct = await axios.post(
      "https://velvet.up.railway.app/product",
      payload
    );
    console.log(crearProduct);
    return {
      type: "PRODUCT_CREATE",
      payload: crearProduct,
    };
  } catch (error) {
    console.log("ERROR EN LA RUTA DE CREACION ", error);
  }
};
//-------------------------------------//

export function addToCart(payload) {
  return {
    type: CONSTANTES.ADD_TO_CART,
    payload,
  };
}
export function removeOneProduct(id) {
  return {
    type: CONSTANTES.DELETE_ONE_PRODUCT,
    payload: id,
  };
}
export function removeAll(id) {
  return {
    type: CONSTANTES.DELETE_ALL_PRODUCT,
    payload: id,
  };
}
export function clearCart() {
  return {
    type: CONSTANTES.CLEAR_CART,
  };
}
//-------------------------//

//----------favorito-----------//

export function addToFavorite(payload) {
  return {
    type: "ADD_TO_FAVORITE",
    payload,
  };
}
export function removeOneProductFavorite(id) {
  return {
    type: "DELETE_ONE_FAVORITE",
    payload: id,
  };
}
export function removeAllFavorite(id) {
  return {
    type: "DELETE_ALL_FAVORITE",
    payload: id,
  };
}

//------------------------------//
export function desmontarDetalle() {
  return {
    type: CONSTANTES.DESMONTAR_DETALLE,
  };
}

export function getAllReviews(payload) {
  return async function (dispatch) {
    let traeReviews = await axios.get(
      `https://velvet.up.railway.app/review/${payload}`
    );
    console.log(traeReviews.data);
    return dispatch({
      type: CONSTANTES.GET_ALL_REVIEW,
      payload: traeReviews.data,
    });
  };
}

///----------POST FORM------------
export function postProducts(payload) {
  console.log(payload, " payload de postProducts");

  return async function (dispatch) {
    const postJson = await axios.post(
      `https://velvet.up.railway.app/product`,
      payload
    );
    return dispatch({
      type: CONSTANTES.POST_PRODUCT,
      payload: postJson,
    });
  };
}

//--------------IMAGENES-------------

export function postImages() {
  // console.log(payload, ' payload de post imagenes');

  return async function (dispatch) {
    const postJson1 = await axios.post(
      `https://velvet.up.railway.app/product/images`
    );
    return dispatch({
      type: CONSTANTES.POST_IMAGES,
    });
  };
}

//-------------LOGIN------------------//
export function login(payload) {
  console.log(payload, "loginnnnn");
  console.log(payload.googleId);
  if (!payload.googleId) {
    return async function (dispatch) {
      const user = await axios.post(
        "https://velvet.up.railway.app/login",
        payload
      );
      console.log(user, "hola");
      // console.log("login respuesta", respuesta.data);
      if (user.data[1]) {
        localStorage.setItem("token", user.data);
        // Para logout localStorage.removeItem("token");
      }

      if (user.data.hasOwnProperty("menssage")) {
        return swal({
          title: "Usuario y/o password son incorrectos",
          icon: "error",
        });
      }
      if (user.data[0].role == "admin") {
        // console.log(user[0], "users admin");

        swal({
          title: "Bienvenido ADMIN",
          icon: "success",
        });
        return dispatch({
          type: "LOGIN",
          payload: {
            role: user.data[0].role,
            email: user.data[0].email,
            id: user.data[0].id,
            userName: user.data[0].userName,
            Token: user.data[1].token,
            image: user.data[0].image,
          },
        });
      }
      swal({
        title: "Ingreasaste correctamente",
        icon: "success",
      });
      return dispatch({
        type: "LOGIN",
        payload: {
          role: user.data[0].role,
          email: user.data[0].email,
          id: user.data[0].id,
          userName: user.data[0].userName,
          Token: user.data[1].token,
          image: user.data[0].image,
        },
      });
    };
  } else {
    return async function (dispatch) {
      const user = await axios.post(
        "https://velvet.up.railway.app/users",
        payload
      );
      if (user.data[1]) {
        localStorage.setItem("token", user.data);
        // Para logout localStorage.removeItem("token");
      }

      if (user.data.hasOwnProperty("menssage")) {
        return swal({
          title: "Usuario y/o password son incorrectos",
          icon: "error",
        });
      }
      if (user.data[0].role == "admin") {
        // console.log(user[0], "users admin");

        swal({
          title: "Bienvenido ADMIN",
          icon: "success",
        });
        return dispatch({
          type: "LOGIN",
          payload: {
            role: user.data[0].role,
            email: user.data[0].email,
            id: user.data[0].id,
            userName: user.data[0].userName,
            Token: user.data[1].token,
            image: user.data[0].image,
          },
        });
      }
      swal({
        title: "Ingreasaste correctamente",
        icon: "success",
      });
      return dispatch({
        type: "LOGIN",
        payload: {
          role: user.data[0].role,
          email: user.data[0].email,
          id: user.data[0].id,
          userName: user.data[0].userName,
          Token: user.data[1].token,
          image: user.data[0].image,
        },
      });
    };
  }
}

export function creatAcount(payload) {
  console.log(payload, "creandoooo");
  return async function (dispatch) {
    const user = await axios.post(
      "https://velvet.up.railway.app/users",
      payload
    );

    if (user.data[1]) {
      localStorage.setItem("token", user.data);
      // Para logout localStorage.removeItem("token");
    }

    if (user.data.hasOwnProperty("menssage")) {
      return swal({
        title: "Usuario y/o password son incorrectos",
        icon: "error",
      });
    }
    if (user.data[0].role == "admin") {
      // console.log(user[0], "users admin");

      swal({
        title: "Bienvenido ADMIN",
        icon: "success",
      });
      return dispatch({
        type: "LOGIN",
        payload: {
          role: user.data[0].role,
          email: user.data[0].email,
          id: user.data[0].id,
          userName: user.data[0].userName,
          Token: user.data[1].token,
          image: user.data[0].image,
        },
      });
    }
    swal({
      title: "Ingreasaste correctamente",
      icon: "success",
    });
    return dispatch({
      type: "LOGIN",
      payload: {
        role: user.data[0].role,
        email: user.data[0].email,
        id: user.data[0].id,
        userName: user.data[0].userName,
        Token: user.data[1].token,
        image: user.data[0].image,
      },
    });
  };
}

export function clearUser(payload) {
  swal({
    title: "Sesion cerrada correctamente",
    icon: "success",
  });
  return { type: "CLEAR_USER", payload };
}
//---------------------Usuarios---------------------//

export const searchUserLocal = (name) => {
  return {
    type: "SEARCH_USER_FOR_NAME",
    payload: name,
  };
};
export const putUser = (id, payload) => {
  return async (dispatch) => {
    console.log("tendria que ser los input", payload);
    let json = await axios.put(
      `https://velvet.up.railway.app/users/${id}`,
      payload
    );
    console.log("esto es el put", json.data);
    return dispatch({
      type: CONSTANTES.PUT_USER,
      payload: json.data,
    });
  };
};

export const getUser = (payload) => {
  return async (dispatch) => {
    let json = await axios.get("https://velvet.up.railway.app/users", {
      headers: { authorization: payload },
    });
    return dispatch({
      type: CONSTANTES.GET_USER,
      payload: json.data,
    });
  };
};
export const Verify = (id, payload) => {
  console.log(payload);
  return async (dispatch) => {
    let json = await axios.put(
      `https://velvet.up.railway.app/verification/${id}`,
      payload
    );
    return dispatch({
      type: "VERIFY",
      payload: json.data,
    });
  };
};
export const getUserId = (id) => {
  return {
    type: CONSTANTES.GET_USER_ID,
    payload: id,
  };
};

//-------------ORDERS--------------------

export const changeStatus = (payload, order_id) => {
  console.log(payload, "<--PAYLOAD", order_id, "<----NUMERO DE ORDEN");
  return async (dispatch) => {
    dispatch();
    let cambiar = await axios.put(
      `https://velvet.up.railway.app/order/${order_id}`,
      { payload }
    );
    console.log(cambiar);
    return dispatch();
  };
};

export const getOrders = (payload) => {
  return async (dispatch) => {
    let traerPedidos = await axios.get(`https://velvet.up.railway.app/order`);
    console.log(traerPedidos);

    return dispatch({
      type: CONSTANTES.GET_ODERS,
      payload: traerPedidos.data,
    });
  };
};

export const getOrdersProducts = (payload) => {
  return async (dispatch) => {
    let traerPedidos = await axios.get(
      `https://velvet.up.railway.app/orderProduct`
    );
    console.log(traerPedidos);

    return dispatch({
      type: "GET_ORDER_PRODUCTS",
      payload: traerPedidos.data,
    });
  };
};

// export function getProducts() {
//   return async function (dispatch) {
//     try {
//       const data = (await axios(datosdeploy)).data;
//       return dispatch({ type: "GET_PRODUCTS", payload: data });
//     } catch (error) {
//       console.log(error, "error en la ruta principal");
//     }
//   };
// }
