import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Card, Alert, Badge, Spinner } from "react-bootstrap";
import Select from "../components/selec";
import Button from "../components/button";

export default function Inicio({ usuario }) {

  const nav = useNavigate();

  const [dificultad, setDificultad] = useState("easy");
  const [categoria, setCategoria] = useState("history");
  const [loading, setLoading] = useState(false);

  const iniciarJuego = () => {

    setLoading(true);

    setTimeout(() => {

      nav("/juego", {
        state: { dificultad, categoria }
      });

    }, 1000);
  };

  return (

    <div className="inicio-wrapper">

      <Card className="home-card-pro">

        <h1 className="titulo-brainquiz">
          🧠 BrainQuiz <Badge bg="info"></Badge>
        </h1>

        {usuario && (
          <h2 className="bienvenida">
            👤 Bienvenido {usuario}
          </h2>
        )}

        <Alert variant="info" className="alert-juego">
          🎮 Selecciona opciones y empieza el juego
        </Alert>

        <Select
          value={dificultad}
          onChange={(e) => setDificultad(e.target.value)}
          options={[
            { value: "easy", label: "🟢 Fácil" },
            { value: "medium", label: "🟡 Medio" },
            { value: "hard", label: "🔴 Difícil" }
          ]}
        />

        <Select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          options={[
            { value: "history", label: "📚 Historia" },
            { value: "science", label: "🔬 Ciencia" },
            { value: "sport_and_leisure", label: "⚽ Deporte" },
            { value: "arts_and_literature", label: "🎭 Arte" },
            { value: "film_and_tv", label: "🎬 Películas y TV" },
            { value: "music", label: "🎵 Música" },
            { value: "geography", label: "🌍 Geografía" },
            { value: "general_knowledge", label: "📚 Cultura General" },
            { value: "food_and_drink", label: "🍽️ Comida" },
            { value: "society_and_culture", label: "👥 Sociedad" }
          ]}
        />

        <div className="contenedor-boton">

          {loading ? (
            <Spinner animation="border" />
          ) : (
            <Button
              className="btn-start"
              texto="🚀 Iniciar Juego"
              onClick={iniciarJuego}
            />
          )}

        </div>

      </Card>

    </div>
  );
}