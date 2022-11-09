import axios from "axios";
import React, { useState } from "react";


export default function MainImage() {

    // async function addMainImage(e) {
    //     e.preventDefault()
    //     await axios.post(`http://localhost:3001/product/images`)
    // }

    const [image, setImage] = useState([]);

    const handleChange = (e) => {
        setImage(e.target.files[0])

    }

    const handleAPI = async () => {
        const url = 'http://localhost:3001/product/image';
        let formData = new FormData();
        formData.append('imagen1', image)
        const jjj = await axios.post(url, formData)
        console.log(jjj);

    }

    return (
        <div>
            main image
            <input name="imagen1" type="file" onChange={handleChange} /> <br />
            <button onClick={handleAPI} >subir main</button>
        </div>
    )
}