import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddProductpg from "./Pages/Products/AddProductpg";
import DisplayProductsDetailspg from "./Pages/Products/DisplayProductsDetailspg";
import DisplayProductpg from "./Pages/Products/DisplayProductpg";
import Loginpg from "./Pages/Users/Loginpg";
import Registerpg from "./Pages/Users/Registerpg";
import Accountpg from "./Pages/Users/Accountpg";
import Logoutpg from "./Pages/Users/Logoutpg";
import Cartpg from "./Pages/Users/Cartpg";
import OrderPlacepg from "./Pages/Users/OrderPlacepg";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<AddProductpg />}></Route>
      <Route path='/register' element={<Registerpg></Registerpg>}></Route>
      <Route path='/login' element={<Loginpg></Loginpg>}></Route>
      <Route path='/account' element={<Accountpg></Accountpg>}></Route>
      <Route path='/logout' element={<Logoutpg></Logoutpg>}></Route>
      <Route path='/product' element={<DisplayProductpg />}></Route>
      <Route path='/productdetails' element={<DisplayProductsDetailspg />}></Route>
      <Route path='/cart' element={<Cartpg></Cartpg>}></Route>
      <Route path='/orderplace' element={<OrderPlacepg></OrderPlacepg>}></Route>
    </Routes>
  </BrowserRouter>
);
