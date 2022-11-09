import { Navbar } from "flowbite-react";
import React, { useState } from "react";
import style from "./Order.module.css";
import NavBar from "../NavBar/NavBar";
import { useSelector } from "react-redux";
import axios from "axios";



export default function Order() {
    const productCarro = useSelector((state) => state.cart);
    console.log(productCarro, 'CART');

    const preciototal = useSelector((state) => state.cartTotal);
    console.log(preciototal, 'CART T');

    const totalitems = useSelector((state) => state.cartTotalItems);
    console.log(totalitems, 'TODOS LO DEL CARRO');

    const dataUser = useSelector((state) => state.user);
    console.log(dataUser);


    //recibe el link de mp 
    const [pago, setPago] = useState('');

    //maneja el btn de mercadopago
    const [cambiar, setCambiar] = useState(false)

    //guarda info de los inputs
    const [input, setInput] = useState({
        firstName: '',
        lastName: '',
        email: dataUser.email,
        phoneNumber: '',
        direction: '',
        numAddress: '',
        department: '',
        floor: '',
        postalCode: '',
    })

    let array = productCarro.map(e => {
        return e.name
    }).join(' ')
    // console.log(array );
    // console.log(typeof array,"BBBBBBBBBBBB");

    const orderData = {
        title: array,
        price: preciototal,
        quantity: 1

    }
    console.log(orderData);
    async function handlePay(e) {
        const mp = await axios.post(`https://velvet.up.railway.app/payment`, orderData)
        console.log(mp);
        console.log(mp.data);
        setPago(mp.data)
        setCambiar(true)

    }


    function Redirecionar() {
        window.location.href = pago;
    }

    function handleChange(e) {
        e.preventDefault()
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })


    }

    console.log(input);
    const user_id = dataUser.id;

    async function handleUpdate(e) {

        // let a = "217b2537-b8aa-4dea-89b1-a7f095c0e700";

        e.preventDefault()
        const crearorder = await axios.post(`http://localhost:3001/users/cart/${user_id}`, {
            firstName: input.firstName,
            lastName: input.lastName,
            email: input.email,   //cambiar aca por el que tiene el user en localstorage
            phoneNumber: input.phoneNumber,
            direction: input.direction,
            department: input.department,
            precioFinal: preciototal,
            products: productCarro,
            postalCode: input.postalCode,
            price: preciototal,
            quantity: totalitems
        })

        console.log(crearorder, 'esta es la orden')


        const mandaremail = await axios.post(`https://velvet.up.railway.app/order/sendingEmail`, {
            firstName: input.firstName,
            lastName: input.lastName,
            email: input.email,   //cambiar aca por el que tiene el user en localstorage
            phoneNumber: input.phoneNumber,
            direction: input.direction,
            department: input.department,
            precioFinal: preciototal,
            products: "",
            postalCode: input.postalCode
        })

        console.log(mandaremail, "okey se mando");

        // const mandarstatus = axios.post(`http://localhost:3001/order/`)



    }
    return (
        <div>
            <NavBar />
            <div className={style.content}>
                {/* <h1>Velvet, PAGOS!</h1> */}
                <div>
                    <p>Completa tus datos para el envio de la compra</p>
                </div>
                <div>
                    <h1></h1>
                </div>

                <form className={style.tagFrom} onSubmit={handleUpdate}>

                    <label>first name:</label>
                    <input type="text" name="firstName" autoComplete="on" value={input.firstName} onChange={e => handleChange(e)} />

                    <label>last name:</label>
                    <input type="text" name="lastName" autoComplete="on" value={input.lastName} onChange={e => handleChange(e)} />

                    <label>e-mail:</label>
                    <input type="text" name="email" autoComplete="off" value={input.email} onChange={e => handleChange(e)} />

                    <label>phone number:</label>
                    <input type="text" name="phoneNumber" autoComplete="off" value={input.phoneNumber} onChange={e => handleChange(e)} />

                    <label>direction:</label> {/* calles?? */}
                    <input type="text" name="direction" autoComplete="off" value={input.direction} onChange={e => handleChange(e)} />

                    <label>num address:</label>{/* numero de calle?? */}
                    <input type="text" name="numAddress" placeholder="" value={input.numAddress} onChange={e => handleChange(e)} />

                    <label>floor/department:</label>
                    <input type="text" name="department" placeholder="" value={input.department} onChange={e => handleChange(e)} />



                    <label>postal code:</label>
                    <input type="text" name="postalCode" placeholder="" value={input.postalCode} onChange={e => handleChange(e)} />



                    <div>
                        <button type="submit" onClick={e => handlePay(e)} className={style.butonPago} >Metodo de Pago</button>
                        
                        {
                            cambiar ?
                                <button className={style.botonMP} type="button" onClick={e => Redirecionar(e)}>PAGAR</button> :
                                null
                        }

                    </div>

                </form>



            </div>
        </div >
    );
};