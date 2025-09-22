import { useState } from "react";
import "./App.css";
import Sidebar from "./assets/Components/SideBar";
import Header from "./assets/Components/Header";
import { BrowserRouter, Routes, Route } from "react-router";
import CarList from "./Cars/CarList";
import CategoryList from "./Categories/CategoryList";
import Home from "./Home/Home";
import UserList from "./Users/UserList"


function App() {
  const [open, setOpen] = useState(true);

  return (
    <BrowserRouter>
      <div className="flex">
        <Sidebar open={open} setOpen={setOpen} />
        <div className="flex-1">
          <Header open={open} />
          <main className="mt-2 p-4">
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/car" element={<CarList />}></Route>
              <Route path="/category" element={<CategoryList />}></Route>
              <Route path="/user" element={<UserList />}></Route>
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
