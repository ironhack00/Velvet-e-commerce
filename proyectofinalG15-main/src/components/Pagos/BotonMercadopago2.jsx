import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
const FORM_ID = 'payment-form';

export default function Product() {
    const cartState = useSelector((state) => state.cart);
    const [a, setPreferenceId] = useState(null);
   
    const orderData = {
        title: cartState[0].name,
        stock: cartState[0].stock,
        price: cartState[0].price
      };
      console.log(orderData)
    useEffect(() => {
      // luego de montarse el componente, le pedimos al backend el preferenceId
      axios.post('http://localhost:3001/payment', {price:orderData.price,stock:orderData.stock,name:orderData.title}).then((order) => {
        setPreferenceId(order.preferenceId);
      });
    }, [orderData.id]);

useEffect(() => {
    if (a) {
    // con el preferenceId en mano, inyectamos el script de mercadoPago
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src ='https://sdk.mercadopago.com/js/v2';
    
    script.setAttribute('data-preference-id', a);
    const form = document.getElementById(FORM_ID);
    form.appendChild(script);
    console.log(script)
    }
}, [a]);

return (
    <form id={FORM_ID} method="GET" />
);
}