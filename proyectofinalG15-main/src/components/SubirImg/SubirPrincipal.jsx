import React, { useState } from "react";

const SubirPrincipal = (id) => {
  const [imagen, setImagen] = useState("");
  const [loading, setLoading] = useState(false);

  const subirImgen = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "velvet");
    setLoading(true);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/velvetpf/image/upload`,
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();

    setImagen(file.secure_url);
    console.log("ACA ESTA ", file.secure_url);
    setLoading(false);
  };
  return (
    <div>
      <label>
        Subir Imagen Principal
        <input
          type="file"
          name="imagen"
          placeholder="Suba un imagen"
          onChange={subirImgen}
        />
      </label>
    </div>
  );
};

export default SubirPrincipal;
