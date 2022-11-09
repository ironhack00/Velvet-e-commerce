import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Verify } from "../redux/action";
import style from "./Verification.module.css";

export default function Verifico() {
  const [numero, setNumero] = useState("");
  let params = useParams();
  let id = params.id;
  const dispatch = useDispatch();

  function handleBoton() {
    const a = { random: numero };

    return dispatch(Verify(id, a));
  }
  function Cambio(e) {
    return setNumero(e);
  }

  return (
    <div className={style.content}>
      <div className={style.contentVerifi}>
        <div className={style.imagen}></div>
        <h1 className={style.title}>Verifica tu correo electronico</h1>
        <p>
          Hola, verifica tu cuenta para acceder a todas las funcionalidades de
          la plataforma
        </p>
        <input
          type="text"
          name="texto"
          value={numero}
          placeholder="Codigo de verificacion"
          onChange={(e) => Cambio(e.target.value)}
        ></input>
        <label></label>

        <button onClick={() => handleBoton()}> Confirmar correo</button>
      </div>
    </div>
  );
}
