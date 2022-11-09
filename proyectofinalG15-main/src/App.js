import "./App.css";
import ProductDetail from "./components/Detail/DetailProduct";
import Home from "./components/Home/Home";
import { Route, Routes } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import Formulario from "./components/Formulario/Formulario";
import CartView from "./components/CartView/CartView";
import Pagos from "../src/components/Pagos/Pagos";
import PutUser from "./components/Usuario/PutUser";
import Review from "./components/Review/Review";
import Reviews from "./components/Review/Reviews";
import CreateProduct from "./components/createProduct/createProduct";
import Verifico from "./Verification/Verification";
import Sidebar from "./components/Sidebar/Sidebar";
import EditProducts from "./components/EditProducts/EditProducts";
import Order from "./components/Orders/Order";
import ControlOrders from "./components/Orders/ControlOrders";

// import Error401 from "./components/Error401/Error401";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route exact path="/formulario" element={<Formulario />} />
        <Route path="/carrito" element={<CartView />} />

        <Route exact path="/verification/:id" element={<Verifico />} />
        <Route path="/review" element={<Review></Review>} />
        <Route path="/reviews" element={<Reviews></Reviews>} />
        <Route
          path="/createProduct"
          element={<CreateProduct></CreateProduct>}
        />
        <Route path="/user/:id" element={<PutUser />} />
        {/* <Route path="/error" element={<Error401 />} /> */}
        <Route path="/admin" element={<Sidebar />} />
        <Route path="/editProduct/:id" element={<EditProducts />} />

        <Route path="/pagos" element={<Pagos></Pagos>} />

        <Route path="/Order" element={<Order></Order>} />
        <Route
          path="/ControlOrders"
          element={<ControlOrders></ControlOrders>}
        />
      </Routes>
    </div>
  );
}

export default App;
