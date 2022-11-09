import axios from "axios";
import React, { useState } from "react";


export default function Imagenes() {

    const [image, setImage] = useState([]);
    console.log(image);

    const handleSubmit = () => {
        let formData = new FormData();
        // formData.append()
        Array.from(image).forEach(item => {
            formData.append('imagen', item)
        })

        axios.post(`http://localhost:3001/product/images`, formData)

    }

    return (
        <div>

            <input name="imagen" type="file" multiple onChange={(e) => {
                setImage(e.target.files)
            }}></input>
            <button onClick={handleSubmit}>subir</button>


        </div>
    )
}