import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../components/button";
import CardCustom from "../components/card";
import Spinner from "../components/spinner";
import StatsTable from "../components/StatsTable";

export default function Resultados({ usuario }) {
  const { state } = useLocation();
  const nav = useNavigate();

  const [loadingInicio, setLoadingInicio] = useState(false);
  const [loadingJugar, setLoadingJugar] = useState(false);

  if (!state) return <h3>No hay datos</h3>;

  const correctas = state.puntaje / 100;
  const porcentaje = (correctas / state.total) * 100;

  const url = window.location.origin;

  const jugador =
    usuario || localStorage.getItem("jugador") || "Jugador";

  const mensaje = `🎯 ¡Resultados BrainQuiz!

👤 Jugador: ${jugador}
⭐ Puntaje: ${state.puntaje}
✔ Correctas: ${correctas} / ${state.total}
📊 Precisión: ${porcentaje.toFixed(0)}%
🤔 ¿Puedes superarme?
👉 Juega aquí: ${url}`;

  const volverInicio = () => {
    setLoadingInicio(true);

    setTimeout(() => {
      nav("/");
    }, 1200);
  };

  const volverJugar = () => {
    setLoadingJugar(true);

    setTimeout(() => {
      nav("/inicio");
    }, 1200);
  };

  return (
    <div className="container text-center mt-5">
      <CardCustom className="result-card">

        <h1>Resultados 🧠BrainQuiz</h1>

        <h4 className="mb-3">👤 {jugador}</h4>

        <StatsTable
          puntaje={state.puntaje}
          correctas={correctas}
          total={state.total}
          porcentaje={porcentaje}
        />

        <h5 className="mt-3">
          Compartir resultados
        </h5>

        <div className="d-grid gap-2 mb-4">

          <a
            className="btn btn-success d-flex align-items-center justify-content-center gap-2"
            target="_blank"
            rel="noreferrer"
            href={`https://web.whatsapp.com/send?text=${encodeURIComponent(mensaje)}`}
          >
            <i className="bi bi-whatsapp"></i>
            Compartir WhatsApp
          </a>

          <a
            className="btn btn-primary d-flex align-items-center justify-content-center gap-2"
            target="_blank"
            rel="noreferrer"
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
          >
            <i className="bi bi-facebook"></i>
            Compartir en Facebook
          </a>

        </div>

        <hr />

        <div className="d-grid gap-2">

          {loadingJugar ? (
            <Spinner />
          ) : (
            <Button
              texto="🔄 Volver a jugar"
              onClick={volverJugar}
            />
          )}

          {loadingInicio ? (
            <Spinner />
          ) : (
            <Button
              texto="🔃 Volver a inicio de sesión"
              onClick={volverInicio}
            />
          )}
        </div>
      </CardCustom>
    </div>
  );
}