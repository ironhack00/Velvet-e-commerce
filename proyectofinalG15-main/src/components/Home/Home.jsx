import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterByCategorys,
  getProducts,
  OrderPrice,
  filterSize,
  filterType,
} from "../../redux/action";
import Card from "../Card/Card";
import style from "./Home.module.css";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import Paginado from "../Paginado/Paginado";
import { Hearts } from "react-loading-icons";

export default function Home() {
  const dispatch = useDispatch();
  const productsAll = useSelector((state) => state.productsAll);
  const productsFilters = productsAll.filter(
    (element) => element.value === true
  );
  const [range, setRange] = useState(0);
  const [Order, setOrder] = useState("");

  //CORTE PARA EL PAGINADO:
  const [paginaEnEsteMomento, setPaginaEnEsteMomento] = useState(1);
  const cantidadPorPagina = 12;
  const indiceUno = paginaEnEsteMomento * cantidadPorPagina;
  const ultimoIndice = indiceUno - cantidadPorPagina;
  const productsList = productsFilters.slice(ultimoIndice, indiceUno);
  //  <<<¡POR FAVOR NO BORRAR ESTO!>>>
  //ACA SE HACE EL FILTRO POR CATEGORIA:
  // const auxiliar = [];
  // const data = productsAll
  //   ?.map((elemento) => elemento.categories.map((e) => e.name))
  //   .flat();

  // data.forEach((elemento) => {
  //   if (!auxiliar.includes(elemento)) {
  //     auxiliar.push(elemento);
  //   }
  // });

  // //ACA ESTA ARREGLO DE TALLAS:
  const auxiliarSize = [];
  const dataSize = productsAll
    ?.map((elemento) => elemento.sizes?.map((elem) => elem))
    .flat();
  dataSize.forEach((elemento) => {
    if (!auxiliarSize.includes(elemento)) {
      auxiliarSize.push(elemento);
    }
  });

  // //ACA ESTA EL ARREGLO DE TIPOS:
  const auxiliarType = [];
  const dataType = productsAll?.map((elemento) => elemento.type);
  dataType.forEach((elemento) => {
    if (!auxiliarType.includes(elemento)) {
      auxiliarType.push(elemento);
    }
  });
  const [state, setState] = useState(true);
  useEffect(() => {
    dispatch(getProducts()).then(() => setState(false));
  }, [dispatch]);

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
  const handleFilterCategory = (e) => {
    e.preventDefault();
    dispatch(filterByCategorys(e.target.value));
    setPaginaEnEsteMomento(1);
  };

  const handleSelectPrice = (e) => {
    e.preventDefault();
    setRange(e.target.value);
    dispatch(OrderPrice(range));
    setPaginaEnEsteMomento(1);
  };

  function handelFilterSize(e) {
    e.preventDefault();
    dispatch(filterSize(e.target.value));
    setPaginaEnEsteMomento(1);
  }

  function handelFilterType(e) {
    e.preventDefault();
    dispatch(filterType(e.target.value));
    setPaginaEnEsteMomento(1);
  }
  const arrayCategories = ["mujer", "hombre", "varios", "niños"];

  return (
    <div className="bg-white">
      <NavBar home={false} products={true} />
      <div className={style.content}>
        <div className={style.filters}>
          <h2>Filtros:</h2>
          <div className={style.contentFilterCategory}>
            <h3 className={style.titleFilters}>Productos</h3>
            <select onChange={(e) => handleFilterCategory(e)}>
              <option value="all">Todos los productos</option>

              {arrayCategories?.map((e, index) => {
                return (
                  <option key={index} value={e}>
                    {e}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <div className={style.contentFilterPrice}>
              <h3 className={style.titleFilters}>Rango de precios:</h3>
              <input
                type="range"
                onChange={(e) => handleSelectPrice(e)}
                min="0"
                max="500"
                className={style.range}
              />

              <h4>El rango de precios es de</h4>
              <div className={style.rangePrecie}>
                <p className={style.rangeText}>$0</p>
                <p>a</p>
                <p className={style.rangeText}>{range}</p>
              </div>
            </div>
          </div>

          <div className={style.fiterSize}>
            <h3 className={style.titleFilters}>Talla</h3>
            <select name="" id="" onChange={(e) => handelFilterSize(e)}>
              <option value="all">Todos</option>
              {auxiliarSize?.map((e) => {
                return <option value={e}>{e}</option>;
              })}
            </select>
          </div>

          <div className={style.filterType}>
            <h3 className={style.titleFilters}>Tipo</h3>
            <select onChange={(e) => handelFilterType(e)}>
              <option value="all">Todos</option>
              {auxiliarType?.map((e) => {
                return <option value={e}>{e}</option>;
              })}
            </select>
          </div>
        </div>
        <div className={style.cards}>
          {productsList &&
            productsList.map((element) => {
              return (
                <Card
                  name={element.name}
                  image={element.mainImage}
                  price={element.price}
                  id={element.id}
                  sizes={element.sizes}
                  categories={element.categories}
                  key={element.id}
                />
              );
            })}
        </div>
      </div>

      <Paginado
        setPaginaEnEsteMomento={setPaginaEnEsteMomento}
        cantidadPorPagina={cantidadPorPagina}
        paginaEnEsteMomento={paginaEnEsteMomento}
      />
      <Footer />
    </div>
  );
}
