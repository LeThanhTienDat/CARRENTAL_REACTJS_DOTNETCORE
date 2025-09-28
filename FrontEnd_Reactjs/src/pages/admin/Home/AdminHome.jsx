import { useState } from "react";
import { Outlet } from "react-router";
import Sidebar from "../../../Components/admin/SideBar";
import Header from "../../../Components/admin/Header";
import "../../../App.css";
export default function AdminHome() {
  const [open, setOpen] = useState(true);
  return (
    <>
      <div className="flex">
        <Sidebar open={open} setOpen={setOpen} />
        <div className="flex-1">
          <Header open={open} />
          <main className="mt-2 p-4">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}
