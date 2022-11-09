import { CONSTANTES } from "./constantes";
import swal from "sweetalert";

let initialState = {
  productsAll: [],
  filterProducts: [],
  detailProduct: {},
  filterPrice: [],
  estadoType: [],
  cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
  cartTotal: localStorage.getItem("cartTotal")
    ? JSON.parse(localStorage.getItem("cartTotal"))
    : 0,
  cartTotalItems: JSON.parse(localStorage.getItem("cartTotalItems")) || 0,
  reviewsProducts: [],
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : {},

  orders: [],
  ordersProducts: [],
  users: [],

  favorite: localStorage.getItem("favorite")
    ? JSON.parse(localStorage.getItem("favorite"))
    : [],
  favoriteTotalItems:
    JSON.parse(localStorage.getItem("favoriteTotalItems")) || 0,
};

function setInLocalStorage(key, state) {
  localStorage.setItem(key, JSON.stringify(state));
  return state;
}

function calcularTotal(arrayDeProduct) {
  if (!arrayDeProduct.length) return 0;
  let total = 0;
  for (let i = 0; i < arrayDeProduct.length; i++) {
    total = total + arrayDeProduct[i].price * arrayDeProduct[i].cantidad;
  }
  return total;
}

export default function reducer(state = initialState, { payload, type }) {
  switch (type) {
    case "GET_PRODUCTS":
      return { ...state, productsAll: payload, filterProducts: payload };
    case "AGREGAR":
   
      return initialState.productsAll.push(payload)
    case "GET_ID":
      return {
        ...state,
        detailProduct: payload,
      };

    case CONSTANTES.SEARCH_NAME:
      console.log("ACA ESTA PAYLOAD ", payload);
      if (!payload) {
        return alert("NO SE ENCUENTRA UN PRODUCTO CON ESE NOMBRE");
      } else {
        console.log("ENCONTRE ALGO ", payload);
        return {
          ...state,
          productsAll: payload,
        };
      }

    case "FILTER_BY_CATEGORYS":
      let info = state.filterProducts;
      var dataC =
        payload === "all"
          ? info
          : info.filter((e) =>
              e.categories.map((e) => e.name).includes(payload)
            );
      return {
        ...state,
        productsAll: dataC,
        filterPrice: dataC,
      };

    case "ORDER_PRICE":
      console.log(payload);
      let orderPrice = state.filterPrice;
      let infoPrice = orderPrice.filter((e) => e.price <= payload);
      console.log(infoPrice);
      let orderPrice2 = state.filterProducts;
      let infoPrice2 = orderPrice2.filter((e) => e.price <= payload);

      let orderPrice3 = state.estadoType;
      let infoPrice3 = orderPrice3.filter((e) => e.price <= payload);
      return {
        ...state,
        productsAll: infoPrice3.length
          ? infoPrice3
          : infoPrice.length
          ? infoPrice
          : infoPrice2,
      };

    case "FILTER_SIZE":
      let filterSize = state.filterPrice;
      let filtrado =
        payload === "all"
          ? filterSize
          : filterSize.filter((e) => e.sizes.includes(payload));

      let filterSize2 = state.filterProducts;
      let filtrado2 =
        payload === "all"
          ? filterSize2
          : filterSize2.filter((e) => e.sizes.includes(payload));

      let filterSize3 = state.estadoType;
      let filtrado3 =
        payload === "all"
          ? filterSize3
          : filterSize3.filter((e) => e.sizes.includes(payload));
      return {
        ...state,
        productsAll: filtrado3.length
          ? filtrado3
          : filtrado.length
          ? filtrado
          : filtrado2,
      };

    case "FILTER_TYPE":
      let filterType = state.filterPrice;
      let filtradoo =
        payload === "all"
          ? filterType
          : filterType.filter((e) => e.type === payload);

      let filterType2 = state.filterProducts;
      let filtradoo2 =
        payload === "all"
          ? filterType2
          : filterType2.filter((e) => e.type === payload);

      return {
        ...state,
        productsAll: filtradoo.length ? filtradoo : filtradoo2,
        estadoType: filtradoo.length ? filtradoo : filtradoo2,
      };

    case "PRODUCT_CREATE":
      return {
        ...state,
      };
    case "RECETA_NO_CREADA":
      return {
        ...state,
        productCreado: payload,
      };

    //--------------------------//
    case CONSTANTES.ADD_TO_CART:
      const product = state.productsAll.find((ele) => ele.id === payload);
      const itemExist = state.cart.find((ele) => ele.id === product.id);

      const controlStock = (qty) => {
        console.log("aca esta el name", product.name);
        console.log("ACA ESTA EL STOCK ", product.stock);
        return qty > product.stock ? product.stock : qty;
      };

      let newCart = itemExist
        ? state.cart.map((ele) =>
            itemExist.id === ele.id
              ? { ...ele, cantidad: controlStock(ele.cantidad + 1) }
              : ele
          )
        : [...state.cart, { ...product, cantidad: controlStock(1) }];

      return {
        ...state,
        cart: setInLocalStorage("cart", newCart),
        cartTotal: setInLocalStorage("cartTotal", calcularTotal(newCart)),
        cartTotalItems: setInLocalStorage(
          "cartTotalItems",
          newCart.reduce((acc, ele) => acc + ele.cantidad, 0)
        ),
      };
    case CONSTANTES.DELETE_ONE_PRODUCT:
      const productExist = state.cart.find((ele) => ele.id === payload);

      if (productExist) {
        const newCart2 = state.cart.filter((ele) => ele.id === payload)[0];
        const newCartAuxiliar = state.cart.filter((ele) => ele.id !== payload);
        if (newCart2.cantidad > 1) {
          newCart2.cantidad = newCart2.cantidad - 1;
          newCartAuxiliar.push(newCart2);
        }
        return {
          ...state,
          cart: setInLocalStorage("cart", newCartAuxiliar),
          cartTotal: setInLocalStorage(
            "cartTotal",
            calcularTotal(newCartAuxiliar)
          ),
          cartTotalItems: setInLocalStorage(
            "cartTotalItems",
            newCartAuxiliar.reduce((acc, ele) => acc + ele.cantidad, 0)
          ),
        };
      }

    case CONSTANTES.DELETE_ALL_PRODUCT:
      const existProduct = state.cart.find((ele) => ele.id === payload);
      const newCart3 = existProduct
        ? state.cart.filter((item) => item.id !== existProduct.id)
        : state.cart;
      return {
        ...state,
        cart: setInLocalStorage("cart", newCart3),
        cartTotal: setInLocalStorage("cartTotal", calcularTotal(newCart3)),
        cartTotalItems: setInLocalStorage(
          "cartTotalItems",
          state.cart.reduce((acc, ele) => acc + ele.cantidad, 0)
        ),
      };

    case CONSTANTES.CLEAR_CART:
      return {
        ...state,
        cart: setInLocalStorage("cart", []),
        cartTotal: setInLocalStorage("cartTotal", 0),
        cartTotalItems: setInLocalStorage("cartTotalItems", 0),
      };
    case CONSTANTES.DESMONTAR_DETALLE:
      return {
        ...state,
        detailProduct: {},
      };

    case CONSTANTES.GET_ALL_REVIEW:
      return {
        ...state,
        reviewsProducts: payload,
      };

    case CONSTANTES.POST_PRODUCT:
      return {
        ...state,
      };

    case CONSTANTES.POST_IMAGES:
      return {
        ...state,
      };

    case "ADD_TO_FAVORITE":
      const productFav = state.productsAll.find((ele) => ele.id === payload);
      // const itemExist = state.cart.find((ele) => ele.id === product.id);

      let newFav = [...state.favorite, { ...productFav }];

      return {
        ...state,
        favorite: setInLocalStorage("favorite", newFav),
        favoriteTotalItems: setInLocalStorage(
          "favoriteTotalItems",
          state.favorite.length + 1
        ),
      };

    case "DELETE_ONE_FAVORITE":
      const productFavDelete = state.productsAll.find(
        (ele) => ele.id === payload
      );
      let newfavoriteList = state.favorite.filter(
        (element) => element.id !== productFavDelete.id
      );
      // const itemExist = state.cart.find((ele) => ele.id === product.id);

      return {
        ...state,
        favorite: setInLocalStorage("favorite", newfavoriteList),
        favoriteTotalItems: setInLocalStorage(
          "favoriteTotalItems",
          state.favorite.length - 1
        ),
      };

    case "SEARCH_USER_FOR_NAME":
      let users = state.users;
      let filterForName = users.filter(
        (element) => element.userName == payload
      );
      return { ...state, users: filterForName };

    case "LOGIN":
      return { ...state, user: setInLocalStorage("user", payload) };

    case "CLEAR_USER":
      return { ...state, user: setInLocalStorage("user", {}) };

    case CONSTANTES.GET_USER:
      console.log(payload);
      return {
        ...state,
        users: payload,
      };

    case CONSTANTES.GET_USER_ID:
      console.log("hola", state.users, payload);
      let a = state.users.filter((e) => e.id === payload);
      console.log("soy a ", a);
      return {
        ...state,
        user: a[0],
      };

    //------------ORDERS-----------------
    case CONSTANTES.GET_ODERS:
      return {
        ...state,
        orders: payload,
      };

    case "GET_ORDER_PRODUCTS":
      return { ...state, ordersProducts: payload };

    default:
      return { ...state };
  }
}
