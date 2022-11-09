import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  formularioDeCreacion,
  getProducts,
  agreadoNuevoEstado,
} from "../../redux/action";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import style from "./Formulario.module.css";
import swal from "sweetalert";
import "../../App.css";
import axios from "axios";
import { MdOutlineShoppingCart } from "react-icons/md";
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";

const Formulario = () => {
  const dispatch = useDispatch();

  const [creacion, setCreacion] = useState("inicial");

  const productsAll = useSelector((state) => state.productsAll);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    if (creacion === "creada") {
      swal({
        title: "BRAVO!!!",
        text: "El nuevo producto se creo exitosamente",
        icon: "success",
        className: "swal-modal",
        className: "swal-title",
      });
    }
    if (creacion === "noCreada") {
      swal({
        title: "UPSS!!!",
        text: "Algo salio mal, no se pudo crear el producto",
        icon: "error",
        className: "swal-modal",
        className: "swal-title",
      });
    }
  }, [creacion]);

  const [nuevoProduct, setNuevoProduct] = useState({
    id: "123",
    name: "",
    price: 0,
    stock: 0,
    description: "",
    value: true,
    type: "",
    size: [],
    mainImage: "",
    image: [],
    category: "",
    bestSellers: false,
  });

  const manipuladorInput = (e) => {
    setNuevoProduct({
      ...nuevoProduct,
      [e.target.name]: e.target.value,
    });
    setValidador(
      validacion({
        ...nuevoProduct,
        [e.target.name]: e.target.value,
      })
    );
  };
  //manipulador de checkbox

  const manipuladorCheckbox = (e) => {
    console.log("e.target.checked", e.target.checked);
    setNuevoProduct({
      ...nuevoProduct,
      [e.target.name]: e.target.checked,
    });
  };

  // manipular category
  const categorias = ["mujer", "hombre", "varios", "niños"];
  const manipuladorCategory = (e) => {
    console.log("aca esta el nuevo producto ", nuevoProduct);
    setNuevoProduct({
      ...nuevoProduct,
      category: e.target.value,
    });
  };
  //Manipulo el array de talle
  const talles = [
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
  const manipuladorSelectSize = (e) => {
    const selec = nuevoProduct.size.filter(
      (elemento) => elemento !== e.target.innerHTML
    );
    console.log("ACA ESTA EL NUEVO PRODUCTO ", selec);
    if (selec.includes(e.target.value)) {
      swal({
        title: "UPSS!!!",
        text: "Ese talle ya fue seleccionado",
        icon: "error",
        className: "swal-modal",
        className: "swal-title",
      });
    } else {
      setNuevoProduct({
        ...nuevoProduct,
        size: [...nuevoProduct.size, e.target.value],
      });
      setValidador(
        validacion({
          ...nuevoProduct,
          size: [...nuevoProduct.size, e.target.value],
        })
      );
    }
    console.log("aca esta el nuevo producto ", nuevoProduct.size);
  };

  //manipulo la eliminacion de talles
  const eliminarSelect = (e) => {
    const seleccion = nuevoProduct.size.filter(
      (elemento) => elemento !== e.target.innerHTML
    );

    setNuevoProduct({
      ...nuevoProduct,
      size: seleccion,
    });

    setValidador(
      validacion({
        ...nuevoProduct,
        size: [...seleccion],
      })
    );
  };

  //manipulador de imagen principal

  const [mainImage, setMainImage] = useState("");
  const [loading, setLoading] = useState(false);

  const [images, setImages] = useState([]);
  nuevoProduct.image = images;

  nuevoProduct.mainImage = mainImage;

  console.log(nuevoProduct, "este es el body");

  const handleFiles = (e) => {
    setMainImage(e.target.files[0]);
  };

  const handleAPI = async () => {
    const url = "https://velvet.up.railway.app/product/image";
    let formData = new FormData();
    formData.append("imagen1", mainImage);
    setLoading(true);
    const pedidoCloudUno = await axios.post(url, formData);
    setMainImage(pedidoCloudUno.data);
    setLoading(false);
  };

  const handleImagenes = async () => {
    let formData = new FormData();
    Array.from(images).forEach((item) => {
      formData.append("imagen", item);
    });

    const pedidoClud = await axios.post(
      `https://velvet.up.railway.app/product/images`,
      formData
    );
    setImages(pedidoClud.data);
  };

  const manipuladorDeCreacion = (e) => {
    e.preventDefault();
    if (Object.keys(validador).length) {
      swal({
        title: "UPS!!!",
        text: "Algun campo le quedo sin rellenar",
        icon: "error",
        className: "swal-modal",
        className: "swal-title",
      });
    } else {
      if (Object.keys(validacion(nuevoProduct)).length) {
        swal({
          title: "OH, OH!!!",
          text: "Creo que se olvido de cargar los datos, los campos no deben estar vacios",
          icon: "error",
          className: "swal-modal",
          className: "swal-title",
        });
      } else {
        formularioDeCreacion(nuevoProduct)
          .then(() => {
            setCreacion("creada");
            setNuevoProduct({
              name: "",
              price: 0,
              stock: 0,
              description: "",
              value: true,
              type: "",
              size: [],
              mainImage: "",
              image: [],
              category: "",
              bestSellers: false,
            });
          })
          .catch(() => {
            setCreacion("noCreada");
          });
      }
    }
  };

  //VALIDACIONES:
  const [validador, setValidador] = useState({});

  const validacion = (nuevoProduct) => {
    let validar = {};
    let noContieneNumero = /[1-9]/;
    let sinEspacios = /[\s]/;

    if (nuevoProduct.name.length > 50)
      validar.name = "NO PUEDE TENER MAS DE 50 CARACTERES";
    if (nuevoProduct.name.length < 5) validar.name = "MINIMO DE 5 CARACTERES";
    if (sinEspacios.test(nuevoProduct.name[0]))
      validar.name = "TIENE QUE PONER TEXTO VALIDO";
    if (noContieneNumero.test(nuevoProduct.name))
      validar.name = "NO PUEDE CONTENER NUMEROS";
    if (productsAll.find((elemento) => elemento.name === nuevoProduct.name)) {
      const productoExistente = productsAll.find(
        (elemento) => elemento.name === nuevoProduct.name
      );
      validar.name = (
        <Link to={`/product/${productoExistente.id}`}>
          YA TENEMOS ESTE PRODUCTO EN NUESTRA BASE DE DATOS{" "}
          {productoExistente.name}
        </Link>
      );
    }

    if (nuevoProduct.description.length > 100)
      validar.description = "NO PUEDE TENER MAS DE 100 CARACTERES";
    if (nuevoProduct.description.length < 20)
      validar.description = "NECESITA TENER UN MINIMO DE 20 CARACTERES";
    if (sinEspacios.test(nuevoProduct.description[0]))
      validar.description = "NO PUEDE SER ESPACIOS EN BLANCO";

    if (Number(nuevoProduct.price) < 1)
      validar.price = "REQUIERE PRECIO MAYOR A A $USD1 ";
    if (Number(nuevoProduct.price) > 90000)
      validar.price = "NO PUEDE SER MAYOR A $USD 500";

    if (Number(nuevoProduct.stock) < 1) validar.stock = "VALOR MAYOR A 0 ";
    if (Number(nuevoProduct.stock) > 10000000)
      validar.stock = "NO ES RECIONAL LA CANTIDAD QUE INTENTA PONER";

    return validar;
  };

  return (
    <div className="bg-white">
      <NavBar />
      <h2 className={style.title}>Cargar Producto</h2>

      <div className={style.contenedor}>
        <div>
          <p className=" text-center">PRIMER PASO: cargar imagenes</p>
          <div className={style.cargaImg}>
            <div className={style.contentInputsImg}>
              <h6>IMAGEN PRINCIPAL</h6>
              <div className={style.inputsImg}>
                <p>selecionar img</p>
                <input name="imagen1" type="file" onChange={handleFiles} />
              </div>
              {loading ? (
                <h3>Cargando...</h3>
              ) : (
                <img src={images} style={{ width: "50px" }} />
              )}
              <button className={style.btnImg} onClick={handleAPI}>
                SUBIR IMAGEN PRINCIPAL
              </button>
            </div>

            <div className={style.contentInputsImg}>
              <h6>IMAGEN SECUNDARIA</h6>

              <div className={style.inputsImg}>
                <p>selecionar img</p>
                <input
                  name="imagen"
                  type="file"
                  multiple
                  onChange={(e) => {
                    setImages(e.target.files);
                  }}
                ></input>
              </div>
              <button className={style.btnImg} onClick={handleImagenes}>
                SUBIR IMAGENES SECUNDARIAS
              </button>
            </div>
          </div>
        </div>

        <div className={style.cargaDatos}>
          <p className="w-full ">SEGUNDO PASO: cargar datos</p>
          <form
            className={style.contenedorForm}
            onSubmit={manipuladorDeCreacion}
          >
            <div className={style.form}>
              <label>
                NOMBRE:
                <input
                  id="nombreInput"
                  type="text"
                  name="name"
                  value={nuevoProduct.name}
                  placeholder="ESCRIBE EL NOMBRE DEL PRODUCTO AQUÍ"
                  onChange={(e) => manipuladorInput(e)}
                />
              </label>
              {validador.name ? (
                <p className={style.validacion}>{validador.name}</p>
              ) : (
                <p className={style.validacion}> </p>
              )}
            </div>

            <div className={style.form}>
              <label>
                PRECIO $USD:
                <input
                  type="number"
                  name="price"
                  value={nuevoProduct.price}
                  placeholder="COLOQUE EL PRECIO"
                  onChange={(e) => manipuladorInput(e)}
                />
              </label>
              {validador.price ? (
                <p className={style.validacion}>{validador.price}</p>
              ) : (
                <p className={style.validacion}> </p>
              )}
            </div>
            <div className={style.form}>
              <label>
                STOCK
                <input
                  type="number"
                  name="stock"
                  value={nuevoProduct.stock}
                  placeholder="COLOQUE EL STOCK"
                  onChange={(e) => manipuladorInput(e)}
                />
              </label>
              {validador.stock ? (
                <p className={style.validacion}>{validador.stock}</p>
              ) : (
                <p className={style.validacion}> </p>
              )}
            </div>

            <div className={style.form}>
              <label>
                Tipos
                <input
                  type="text"
                  name="type"
                  value={nuevoProduct.type}
                  placeholder="COLOQUE EL TIPO DE PRODUCTO"
                  onChange={(e) => manipuladorInput(e)}
                />
              </label>
              {validador.stock ? (
                <p className={style.validacion}>{validador.stock}</p>
              ) : (
                <p className={style.validacion}> </p>
              )}
            </div>

            <div className={style.form}>
              <label>
                TALLE:
                <select
                  defaultValue={"default"}
                  onChange={(e) => manipuladorSelectSize(e)}
                >
                  <option value="default" disabled>
                    ELEGIR TALLA:
                  </option>
                  {talles &&
                    talles.map((elemento, index) => {
                      return (
                        <option key={index} value={elemento}>
                          {elemento}
                        </option>
                      );
                    })}
                </select>
              </label>
            </div>
            <div>
              <ul>
                {nuevoProduct.size.map((elemento) => (
                  <li key={elemento} onClick={(e) => eliminarSelect(e)}>
                    {elemento}
                  </li>
                ))}
              </ul>
            </div>

            <div className={style.form}>
              {/* CATEGORIA:
                <select
                  defaultValue={"default"}
                  onChange={(e) => manipuladorSelectCategory(e)}
                >
                  <option value="default" disabled>
                    ELIGE UNA CATEGORIA:
                  </option>
                  {arrayCategories &&
                    arrayCategories.map((elemento, index) => {
                      return (
                        <option key={index} value={elemento}>
                          {elemento}
                        </option>
                      );
                    })}

                </select> */}
              <select
                defaultValue={"default"}
                onChange={(e) => manipuladorCategory(e)}
              >
                <option value="default" disabled>
                  ELIGE UNA CATEGORIA:
                </option>
                {categorias &&
                  categorias.map((elemento, index) => {
                    return (
                      <option key={index} value={elemento}>
                        {elemento}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className={style.form}>
              <label>
                DESCRIPCION:
                <textarea
                  type="text"
                  name="description"
                  value={nuevoProduct.description}
                  placeholder="Descrpcion de el producto"
                  onChange={(e) => manipuladorInput(e)}
                />
              </label>
              {validador.description ? (
                <p className={style.validacion}>{validador.description}</p>
              ) : (
                <p className={style.validacion}> </p>
              )}
            </div>

            {/* <div>
              <ul>
                {nuevoProduct.category.map((elemento) => (
                  <li key={elemento} onClick={(e) => eliminarSelectCategory(e)}>
                    {elemento}
                  </li>
                ))}
              </ul>
            </div> */}
            <div className={style.contentCheckboxs}>
              <div className={style.contentCheckbox}>
                <label>
                  MAS VENDIDOS:
                  <input
                    type="checkbox"
                    name="bestSeller"
                    checked={nuevoProduct.bestSellers}
                    onChange={(e) => manipuladorCheckbox(e)}
                  />
                </label>
              </div>
            </div>

            <div className={style.contentBtn}>
              <button
                className={style.btnCrear}
                onClick={(e) => {
                  manipuladorDeCreacion(e);
                }}
              >
                CREAR PRODUCTO
              </button>
            </div>
          </form>
        </div>
      </div>
      <div>
        <div className={style.previsualizaciones}>
          <div className={style.content}>
            <MdOutlineShoppingCart className={style.carrito} size="40px" />
            <img src={nuevoProduct.mainImage} alt="" className={style.fondo} />

            <div className={style.contentInfo}>
              <div className={style.fondoRotado}></div>
              <div className={style.contnetMeGusta}>
                <AiFillHeart className={style.meGusta} size="30px" />
              </div>

              <h5>{nuevoProduct.name}</h5>
              <div className={style.talasPrecio}>
                <div className={style.tallas}>
                  <p>{nuevoProduct.size}</p>
                </div>
                <h6>${nuevoProduct.price}</h6>
              </div>
            </div>
          </div>

          <div className={style.contenedorDetalle}>
            <div className={style.contentDetail}>
              <div className={style.contentImages}>
                <div className={style.images}>
                  <button>
                    <img src={nuevoProduct.image[0]} alt="img no fount" />
                  </button>
                  <button>
                    <img src={nuevoProduct.image[1]} alt="img no fount" />
                  </button>
                  <button>
                    <img src={nuevoProduct.image[2]} alt="img no fount" />
                  </button>
                  <button>
                    <img src={nuevoProduct.image[3]} alt="img no fount" />
                  </button>
                </div>
                <img
                  src={nuevoProduct.mainImage}
                  alt="img no fount"
                  className={style.imageP}
                />
              </div>

              <div className={style.textContent}>
                <div className={style.contentLike}>
                  <AiOutlineHeart className={style.like} size="30px" />
                </div>
                <h2 className={style.title}> {nuevoProduct.name}</h2>
                <span className={style.price}> ${nuevoProduct.price}</span>
                <h3 className={style.stock}>Stock: {nuevoProduct.stock}</h3>
                <h3 className={style.description}>
                  {nuevoProduct.description}
                </h3>
                <div className={style.buyCarrito}>
                  <button className={style.buy}>Comparar ya</button>
                  <MdOutlineShoppingCart
                    className={style.carrito}
                    size="30px"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Formulario;
