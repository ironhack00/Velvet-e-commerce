import React, { useEffect, useState } from "react";
import style from "./EditProducts.module.css";
import { useParams } from "react-router-dom";
import Card from "../Card/Card";
import { useSelector } from "react-redux";
import { getDetail, desmontarDetalle, putProduct } from "../../redux/action";
import { useDispatch } from "react-redux";
import NavBar from "../NavBar/NavBar";
import { IoReload } from "react-icons/io5";
import swal from "sweetalert";
import axios from "axios";
import { Hearts } from "react-loading-icons";

export default function EditProducts() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const product = useSelector((state) => state.detailProduct);
  const [state, setState] = useState(true);

  useEffect(() => {
    dispatch(getDetail(id)).then(() => setState(false));
    return () => {
      dispatch(desmontarDetalle());
    };
  }, [dispatch, id]);

  const [valuesNew, setValuesNew] = useState({
    name: "",
    price: 0,
    stock: 0,
    description: "",

    type: "",
    mainImage: "",
    sizes: [],
    images: [],
    categories: "",
    bestSellers: "false",
  });

  const sizess = [
    "s",
    "m",
    "l",
    "1",
    "1.5",
    "2",
    "36",
    "37",
    "38",
    "39",
    "40",
    "41",
  ];
  //VALIDACIONES:
  const [validador, setValidador] = useState({});

  const validacion = (valuesNew) => {
    let validar = {};
    let noContieneNumero = /[1-9]/;
    let sinEspacios = /[\s]/;

    if (valuesNew.name.length > 50)
      validar.name = "NO PUEDE TENER MAS DE 50 CARACTERES";
    if (valuesNew.name.length < 5)
      validar.name = "NECESITA TENER UN MINIMO DE 5 CARACTERES";
    if (sinEspacios.test(valuesNew.type[0]))
      validar.name = "TIENE QUE PONER TEXTO VALIDO, LOS ESPACIOS NO SE VALEN";
    if (noContieneNumero.test(valuesNew.name))
      validar.name = "NO PUEDE CONTENER NUMEROS";

    if (valuesNew.description.length > 100)
      validar.description = "NO PUEDE TENER MAS DE 100 CARACTERES";
    if (valuesNew.description.length < 20)
      validar.description = "NECESITA TENER UN MINIMO DE 20 CARACTERES";
    if (sinEspacios.test(valuesNew.description[0]))
      validar.description = "NO PUEDE SER ESPACIOS EN BLANCO";

    if (Number(valuesNew.price) < 1)
      validar.price = "TIENE QUE SER UN PRECIO MAYOR A $USD 0 ";
    if (Number(valuesNew.price) > 500)
      validar.price = "NO PUEDE SER MAYOR A $USD 500";

    if (Number(valuesNew.stock) < 1)
      validar.stock = "TIENE QUE SER UN VALOR MAYOR A 0 ";
    if (Number(valuesNew.stock) > 10000000)
      validar.stock = "NO ES RECIONAL LA CANTIDAD QUE INTENTA PONER";

    if (valuesNew.type.length > 15)
      validar.type = "NO PUEDE TENER MAS DE 15 CARACTERES";
    if (valuesNew.type.length < 5)
      validar.type = "NECESITA TENER UN MINIMO DE 5 CARACTERES";
    if (sinEspacios.test(valuesNew.type[0]))
      validar.type = "TIENE QUE PONER TEXTO VALIDO, LOS ESPACIOS NO SE VALEN";
    if (noContieneNumero.test(valuesNew.type))
      validar.type = "NO PUEDE CONTENER NUMEROS";

    return validar;
  };
  //----------------manipuladores de imagen----------------

  const [mainImageEdit, setMainImageEdit] = useState("");
  valuesNew.mainImage = mainImageEdit;

  console.log(valuesNew.mainImage, "este es el body");

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

  const handelEditProduct = (e) => {
    e.preventDefault();
    setValuesNew({
      ...valuesNew,
      [e.target.name]: e.target.value,
    });
    setValidador(
      validacion({
        ...valuesNew,
        [e.target.name]: e.target.value,
      })
    );
  };

  //--------------manipuladores de mas vendido----------------
  const manipuladorCheckbox = (e) => {
    console.log("e.target.checked", e.target.checked);
    setValuesNew({
      ...valuesNew,
      [e.target.name]: e.target.checked,
    });
  };

  function handelMasVendido(e) {
    setValuesNew({
      ...valuesNew,
      bestSellers: e.target.value,
    });
  }

  function handelSelectValue(e) {
    setValuesNew({
      ...valuesNew,
      value: e.target.value,
    });
  }

  const handelSizes = (e) => {
    console.log("aca esta el nuevo producto ", valuesNew);
    const selec = valuesNew.sizes.filter(
      (elemento) => elemento !== e.target.innerHTML
    );
    if (selec.includes(e.target.value)) {
      swal({
        title: "UPSS!!!",
        text: "Ese talle ya fue seleccionado",
        icon: "error",
        className: "swal-modal",
        className: "swal-title",
      });
    } else {
      setValuesNew({
        ...valuesNew,
        sizes: [...valuesNew.sizes, e.target.value],
      });
      setValidador(
        validacion({
          ...valuesNew,
          sizes: [...valuesNew.sizes, e.target.value],
        })
      );
    }
  };

  const eliminarSelect = (e) => {
    const seleccion = valuesNew.sizes.filter(
      (elemento) => elemento !== e.target.innerHTML
    );
    setValuesNew({
      ...valuesNew,
      sizes: seleccion,
    });
    setValidador(
      validacion({
        ...valuesNew,
        sizes: [...seleccion],
      })
    );
  };

  const categorias = ["mujer", "hombre", "varios", "niños"];
  const handelCateogoties = (e) => {
    setValuesNew({
      ...valuesNew,
      categories: e.target.value,
    });
    console.log("aca esta el nuevo producto ", valuesNew);
  };

  function handelChangueValues() {
    if (valuesNew.value == "1") valuesNew.value = true;
    else valuesNew.value = false;
    if (valuesNew.bestSellers == "1") valuesNew.bestSellers = true;
    else valuesNew.bestSellers = false;

    dispatch(putProduct(valuesNew, id));
    setValuesNew({
      name: "",
      price: 0,
      stock: 0,
      description: "",
      value: true,
      type: "",
      mainImage: "",
      sizes: [],
      images: [],
      categories: [],
      bestSellers: false,
    });
    swal({
      title: "Producto editado con exito",
      text: "El producto fue editado con exito",
      icon: "success",
      className: "swal-modal",
    }).then(() => {
      setTimeout(function () {
        window.location.reload(true);
      }, 1000);
    });
  }

  if (state) {
    return (
      <div className={style.cargando}>
        <div>
          <Hearts fill="#ea047e" stroke="#ea047e" />
        </div>
        <div>
          <p>Cargando...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-white">
      <NavBar />
      <div className={style.content}>
        <div className={style.card}>
          <h5> toda la imformacion de el producro </h5>
          <img src={product[0].mainImage} alt="" />
          <p>Nombre: {product[0].name}</p>
          <p>Precio:{product[0].price}</p>
          <p>Tallas: {product[0].sizes.join(", ")}</p>
          <p>stock: {product[0].stock}</p>
          <p>Value: {product[0].value}</p>
          <p>Tipo: {product[0].type}</p>
          <p>Mas vendido: {product[0].bestSellers}</p>
          <p>
            Catrogrias:{" "}
            {product[0].categories[0] && product[0].categories[0].name}
          </p>
          <p>Id: {product[0].id}</p>
          <p>Descripcion: {product[0].description}</p>
        </div>
        <div className={style.productModifi}>
          <h5>Nuevos datos del producto</h5>
          <form action="">
            <div>
              <label htmlFor="">Nombre</label>
              <input
                type="text"
                value={valuesNew.name}
                name="name"
                onChange={(e) => handelEditProduct(e)}
              />
              {validador.name ? <p>{validador.name}</p> : <p> </p>}
            </div>
            <div>
              <label htmlFor="">Precio</label>
              <input
                type="number"
                name="price"
                value={valuesNew.price}
                onChange={(e) => handelEditProduct(e)}
              />
              {validador.price ? <p>{validador.price}</p> : <p> </p>}
            </div>
            <div>
              <label htmlFor="">Talla</label>
              <select onChange={(e) => handelSizes(e)}>
                {sizess.map((x, i) => {
                  return (
                    <option key={i} value={x}>
                      {x}
                    </option>
                  );
                })}
              </select>
              <div>
                <ul>
                  {valuesNew.sizes.map((elemento, i) => (
                    <li key={i} onClick={(e) => eliminarSelect(e)}>
                      {elemento},
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <label htmlFor="">stock</label>
              <input
                type="number"
                name="stock"
                value={valuesNew.stock}
                onChange={(e) => handelEditProduct(e)}
              />
              {validador.stock ? <p>{validador.stock}</p> : <p> </p>}
            </div>
            <div>
              <label htmlFor="">Descripcion</label>
              <input
                type="text"
                name="description"
                value={valuesNew.description}
                onChange={(e) => handelEditProduct(e)}
              />
              {validador.description ? (
                <p>{validador.description}</p>
              ) : (
                <p> </p>
              )}
            </div>
            <div>
              <label htmlFor="">Value</label>
              <input
                type="checkbox"
                name="value"
                checked={valuesNew.value}
                onChange={(e) => manipuladorCheckbox(e)}
              />
            </div>
            <div>
              <label htmlFor="">Tipo</label>
              <input
                type="text"
                name="type"
                value={valuesNew.type}
                onChange={(e) => handelEditProduct(e)}
              />
              {validador.type ? <p>{validador.type}</p> : <p> </p>}
            </div>
            <div>
              <label htmlFor="">Mas vendido:</label>
              <input
                type="checkbox"
                name="bestSellers"
                checked={valuesNew.bestSellers}
                onChange={(e) => manipuladorCheckbox(e)}
              />
            </div>
            <div>
              <label htmlFor="">Categorias:</label>
              <select
                defaultValue={"default"}
                onChange={(e) => handelCateogoties(e)}
              >
                <option value="default" disabled>
                  ELIGE UNA CATEGORIA:
                </option>
                {categorias.map((elemento, index) => {
                  return (
                    <option key={index} value={elemento}>
                      {elemento}
                    </option>
                  );
                })}
              </select>
              <div></div>
            </div>
          </form>
          <div>
            <input
              type="file"
              name="imagen1"
              onChange={(e) => handleFiles(e)}
            ></input>
            <button onClick={handleAPI}>CAMBIAR IMAGEN DEl PRODUCTO</button>
          </div>
          <button
            onClick={() => handelChangueValues()}
            className={style.butonSaveChangue}
          >
            guardar cambios
          </button>
        </div>
      </div>
    </div>
  );
}
