import { useState } from "react";
import Header from "../../../Components/user/template/header/Header";
import MainPanel from "../../../Components/user/template/panel/MainPanel";
import LoginForm from "../../../Components/user/Form/LoginForm";
import CarList from "../../../Components/user/car/CarList";

export default function Home() {
  const [openLogin, setOpenLogin] = useState(false);

  const Login = () =>{
    console.log(1);
  }
  const onClose = () => {
    setOpenLogin(prev => !prev)
  }
  return (
    <>
      <Header 
        Login = {()=>setOpenLogin(prev => !prev)}

      />
      <MainPanel />
      <CarList />
      {openLogin && (
        <LoginForm 
          onClose = {onClose}

        />
      )}
    </>
  );
}
