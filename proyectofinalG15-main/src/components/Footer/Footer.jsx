import React from "react";
import style from "./Footer.module.css";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPhone,
  FaWhatsapp,
} from "react-icons/fa";
import Logo from "../../img/logoVelvet.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <div className={style.container}>
        <div className={style.conteinerIcons}>
          <h2 className={style.title}>Comunicate con Nosotros:</h2>
          <ul className={style.ul}>
            <li className={style.li}>
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
              >
                <FaFacebook size="30" color="#ea047e" />
              </a>
            </li>
            <li className={style.li}>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
              >
                <FaInstagram size="30" color="#ea047e" />
              </a>
            </li>
            <li className={style.li}>
              <a
                href="https://www.linkedin.com/home"
                target="_blank"
                rel="noreferrer"
              >
                <FaLinkedin size="30" color="#ea047e" />
              </a>
            </li>
            <li className={style.li}>
              <a
                href="https://api.whatsapp.com/send?phone=00000&text=Hola!%20Quiero%20saber%20mas%20sobre%20los%20productos%20de%20Velvet%20Store"
                target="_blank"
                rel="noreferrer"
              >
                <FaWhatsapp size="30" color="#ea047e" />
              </a>
            </li>
            <li className={style.li}>
              <FaPhone size="30" color="#ea047e" />
            </li>
          </ul>
        </div>
        <div>
          <img src={Logo} alt="Logo" width="250" height="250" />
        </div>

        <div className={style.about}>
          <h2 className={style.title}>Quienes somos: </h2>
          <p>
            Fundada en 2022, Velvet es una marca de ascendencia Argentina famosa
            por su originalidad y calidad. La marca tiene una corta trayectoria,
            pero una gran innovación y continúa creciendo.
          </p>
        </div>
      </div>
      <div className={style.span}>
        <span>Proyecto Final g15-©Todos los derechos reservados </span>
      </div>
    </div>
  );
};

export default Footer;
