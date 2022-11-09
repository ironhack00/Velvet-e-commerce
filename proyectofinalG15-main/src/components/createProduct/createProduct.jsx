import React, { useState } from "react";
import { useDispatch } from "react-redux";
import style from "../createProduct/createProduct.module.css"
import { postProducts } from "../../redux/action";
import MainImage from "./mainImage";
import Imagenes from "./Imagenes"
import axios from "axios";

export default function CreateProduct() {


    const dispatch = useDispatch();
    const [input, setInput] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
        type: '',
        size: [],
        category: '',
        mainImage: '',
        image: []

    });
    const [mainImage, setMainImage] = useState('');

    const [images, setImages] = useState([])
    input.image = images

    console.log(images);

    input.mainImage = mainImage;

    // console.log(mainImage, 'este es mi estado');
    console.log(input, 'este es el body');

    const handleFiles = (e) => {
        setMainImage(e.target.files[0])

    }

    const handleAPI = async () => {
        const url = 'http://localhost:3001/product/image';
        let formData = new FormData();
        formData.append('imagen1', mainImage)
        const jjj = await axios.post(url, formData)
        // console.log(jjj)
        // console.log(jjj.data)
        setMainImage(jjj.data)

    }

    const handleImagenes = async () => {
        let formData = new FormData();
        // formData.append()
        Array.from(images).forEach(item => {
            formData.append('imagen', item)
        })

        const kkk = await axios.post(`http://localhost:3001/product/images`, formData)
        console.log(kkk,'este es images')
        console.log(kkk.data)
        setImages(kkk.data)

    }



    // console.log(jjj);


    // console.log(input);

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e) {
        e.preventDefault()

        dispatch(postProducts(input))

        console.log(input, 'SE CREO LA RECETA!!!');

    }




    return (
        <div>
            <div className={style.contenedor}>
                <div>
                    <h2 className={style.title}>Cargar Producto</h2>
                </div>
                <form className={style.contenedorForm} onSubmit={e => handleSubmit(e)}>
                    <div className={style.form}>
                        <label>
                            NOMBRE:
                            <input
                                id="nombreInput"
                                type="text"
                                name="name"
                                value={input.name}
                                onChange={e => handleChange(e)}
                                placeholder="ESCRIBE EL NOMBRE DEL PRODUCTO AQUÍ"

                            />
                        </label>

                    </div>
                    <div className={style.form}>
                        <label>
                            DESCRIPCION:
                            <textarea
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={e => handleChange(e)}
                                placeholder="ESCRIBA UNA DESCRIPCION DEL PRODUCTO"

                            />
                        </label>

                    </div>

                    <div className={style.form}>
                        <label>
                            PRECIO:
                            <input
                                type="number"
                                name="price"
                                value={input.price}
                                onChange={e => handleChange(e)}
                                placeholder="COLOQUE EL PRECIO"

                            />
                        </label>

                    </div>
                    <div className={style.form}>
                        <label>
                            STOCK
                            <input
                                type="number"
                                name="stock"
                                value={input.stock}
                                onChange={e => handleChange(e)}

                                placeholder="COLOQUE EL STOCK"

                            />
                        </label>

                    </div>

                    <div className={style.form}>
                        <label>
                            Tipos
                            <input
                                type="text"
                                name="type"
                                value={input.type}
                                onChange={e => handleChange(e)}
                                placeholder="COLOQUE EL TIPO DE PRODUCTO"
                            />
                        </label>

                    </div>

                    {/* <div className={style.form}>
                        <label>
                            SELECCIONA UN TALLE:
                            <select
                                defaultValue={"default"}
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
                    </div> */}
                    <div>
                        <ul>

                        </ul>
                    </div>

                    <div>
                        <label> categoria </label>
                        <input
                            type="text"
                            name="category"
                            value={input.category}
                            onChange={e => handleChange(e)}

                            placeholder="COLOQUE LA CATEGORIA EJ: CAMISA"
                        />
                    </div>
                    <div>



                        {/* <Imagenes></Imagenes> */}
                    </div>

                    <div className={style.contentBtn}>
                        <button className={style.boton} type="submit" >CREAR PRODUCTO</button>
                    </div>
                </form>

                <div>

                    main image
                    <input name="imagen1" type="file"
                        onChange={handleFiles}
                    /> <br />
                    <button onClick={handleAPI} >subir main</button>
                    {/* <input type="text" name="mainImage"></input> */}
                </div>
                <div>
                    <h1></h1>
                </div>

                <div>

                    <input name="imagen" type="file" multiple onChange={(e) => {
                        setImages(e.target.files)
                    }}></input>
                    <button onClick={handleImagenes}>subir</button>


                </div>

            </div>
        </div>
    );
}