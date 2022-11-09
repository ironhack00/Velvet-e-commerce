import React from "react";
import { GoogleLogin } from "@leecheuk/react-google-login";
import { creatAcount, login } from "../../redux/action";
import { useDispatch } from "react-redux";

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const CreateAccountAndLoginWithGoogle = ({ text }) => {
  const dispatch = useDispatch();
  const onSuccess = (res) => {
    console.log("Login Success: currentUser:", res.profileObj);
    // Obtenemos el email, el name y el id de google
    const { email, givenName, familyName, googleId, imageUrl } = res.profileObj;
    // Creamos un objeto con los datos que necesitamos
    const data = {
      userName: givenName + " " + familyName,
      email,
      password: googleId,
      googleId: true,
      role: "active",
      //   password: googleId, // Esto no es bueno. Pero es lo que hay
    };
    // Llamamos a la action que nos permite crear un usuario si el text es "Crear cuenta"
    if (text === "Crear con Google") {
      dispatch(creatAcount(data));
    } else {
      dispatch(login(data));
    }
  };

  const onFailure = (res) => {
    console.log("Login failed: res:", res);
    // Esto es cuando falla Google
  };

  return (
    <GoogleLogin
      clientId={clientId}
      buttonText={text}
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy={"single_host_origin"}
      //   isSignedIn={true}
    />
  );
};

export default CreateAccountAndLoginWithGoogle;
