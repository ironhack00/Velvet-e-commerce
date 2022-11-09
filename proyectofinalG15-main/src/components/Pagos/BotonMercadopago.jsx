    import React, { useEffect, useState } from 'react';
    import { useParams } from "react-router-dom";
    import { useDispatch, useSelector } from "react-redux";
    import axios from 'axios';
// https://codeforgeek.com/render-html-file-expressjs/
    const FORM_ID = 'payment-form';

   
    export default function Product(preferenceId) {
    const a = preferenceId.preferenceId
    console.log(FORM_ID)

    useEffect(() => {
        if (a) {
        // con el preferenceId en mano, inyectamos el script de mercadoPago
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src ='https://sdk.mercadopago.com/js/v2';
        
        script.setAttribute('data-preference-id', a);
        const form = document.getElementById(FORM_ID);
        //form.appendChild(script);
        //console.log(form)

        }
    //   return()=>{<form id={FORM_ID} method="GET" />}
    }, [a]);
    
    return (
        <div>
        <form id={FORM_ID} method="GET" ></form>
        <div class="cho-container"></div>
        
        </div>
    );
    }