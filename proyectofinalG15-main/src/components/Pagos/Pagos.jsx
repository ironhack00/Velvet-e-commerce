import { Navbar } from "flowbite-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import style from "./Pagos.module.css";
import NavBar from "../NavBar/NavBar";
import { useSelector } from "react-redux";
import axios from "axios";

const Pagos = () => {
  const productCarro = useSelector((state) => state.cart);
  console.log(productCarro, "TODOS LO DEL CARRO");

  const [pago, setPago] = useState("");
  const [pago2, setPago2] = useState(false);

  const orderData = {
    title: productCarro[0].name,
    price: productCarro[0].price,
    quantity: productCarro[0].stock,
  };
  async function handlePay(e) {
    const mp = await axios.post(`http://localhost:3001/payment`, orderData);
    console.log(mp);
    console.log(mp.data);
    setPago(mp.data);
    setPago2(true);
  }

  console.log(typeof pago, "este es pago");

  function Redirecionar() {
    window.location.href = pago;
  }
  // document.getElementById('enlace').setAttribute('href', `${pago}`);

  return (
    <div>
      <NavBar />
      <div className={style.content}>
        <h1>Velvet, PAGOS!</h1>

        <form className={style.tagFrom}>
          <label>Nombre:</label>
          <input type="text" name="nombre" autoComplete="off" value="" />
          <label>Apellido:</label>
          <input type="text" name="nombre" autoComplete="off" value="" />
          <label>E-mail:</label>
          <input type="text" name="email" autoComplete="off" value="" />
          <label>Tarjeta:</label>
          <input
            type="text"
            name="tajeta"
            placeholder="Coloque el tipo de tarjeta"
            value=""
          />
          <label>Codigo:</label>
          <input
            type="text"
            name="tajeta"
            placeholder="Coloque el codigos"
            value=""
          />

          <div></div>
        </form>

        <button onClick={(e) => handlePay(e)} className={style.butonPago}>
          solicitar pago
        </button>
        {pago2 ? (
          <button type="button" onClick={(e) => Redirecionar(e)}>
            MP
          </button>
        ) : null}

        {/* <h1 onclick="location.href=''">MP</h1> */}
      </div>
    </div>
  );
};

export default Pagos;
