import { BrowserRouter, Routes, Route } from "react-router-dom";
import Inicio from "./pages/Inicio";
import Juego from "./pages/Juego";
import Resultados from "./pages/Resultados";
import Login from "./pages/Login";
import "./App.css";
import Header from "./components/header";
import { useState } from "react";

export default function App() {
  const [usuario, setUsuario] = useState("");

  return (
    <BrowserRouter>
      <Header usuario={usuario}/>
      <Routes>
    <Route path="/" element={<Login setUsuario={setUsuario} />}/>
    <Route path="/inicio" element={<Inicio usuario={usuario} setUsuario={setUsuario}/>}/>
    <Route path="/juego" element={<Juego usuario={usuario} />}/>
    <Route path="/resultados" element={<Resultados usuario={usuario} />}/>
      </Routes>
    </BrowserRouter>
  );
}