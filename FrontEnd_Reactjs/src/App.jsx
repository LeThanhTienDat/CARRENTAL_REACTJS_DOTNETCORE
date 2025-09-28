import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CarList from "./pages/admin/Cars/CarList";
import CategoryList from "./pages/admin/Categories/CategoryList";
import AdminHome from "./pages/admin/Home/AdminHome";
import UserList from "./pages/admin/Users/UserList";
import Home from "./pages/user/Home/Home";
import CarDetail from "./pages/user/car/CarDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<AdminHome />}>         
          <Route path="car" element={<CarList />}></Route>
          <Route path="category" element={<CategoryList />}></Route>
          <Route path="user" element={<UserList />}></Route>
        </Route>


        <Route path="/" element={<Home />}></Route>
        <Route path="/car/slug/:slug/:id" element={<CarDetail />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
