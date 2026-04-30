import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ProgressBar from "../components/progressbar";
import Button from "../components/button";
import CardCustom from "../components/card";
import SpinnerCustom from "../components/spinner";

const getQuestions = async (
  diff = "easy",
  cat = "history"
) => {
  try {
    const res = await fetch(
      `https://the-trivia-api.com/api/questions?limit=10&difficulty=${diff}&categories=${cat}`
    );

    if (!res.ok) throw new Error("Error API");

    const data = await res.json();

    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error(
      "Error cargando preguntas:",
      error
    );
    return [];
  }
};

const traducirTexto = async (texto) => {
  try {
    const res = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
        texto
      )}&langpair=en|es`
    );

    const data = await res.json();

    return (
      data?.responseData
        ?.translatedText || texto
    );
  } catch {
    return texto;
  }
};

const getQuestionsTraducidas =
  async (diff, cat) => {
    const preguntas =
      await getQuestions(
        diff,
        cat
      );

    if (!preguntas.length)
      return [];

    return await Promise.all(
      preguntas.map(async (p) => {
        const pregunta =
          typeof p.question ===
          "object"
            ? p.question.text
            : p.question;

        return {
          ...p,
          question:
            await traducirTexto(
              pregunta
            ),
          correctAnswer:
            await traducirTexto(
              p.correctAnswer
            ),
          incorrectAnswers:
            await Promise.all(
              p.incorrectAnswers.map(
                (r) =>
                  traducirTexto(r)
              )
            )
        };
      })
    );
  };

export default function Juego({
  usuario
}) {
  const { state } =
    useLocation();

  const nav = useNavigate();

  const dificultad =
    state?.dificultad ||
    "easy";

  const categoria =
    state?.categoria ||
    "history";

  const getTiempo = () => {
    if (
      dificultad === "easy"
    )
      return 30;

    if (
      dificultad ===
      "medium"
    )
      return 20;

    return 15;
  };

  const [preguntas, setPreguntas] =
    useState([]);

  const [indice, setIndice] =
    useState(0);

  const [tiempo, setTiempo] =
    useState(getTiempo());

  const [puntaje, setPuntaje] =
    useState(0);

  const [
    mostrarRespuesta,
    setMostrarRespuesta
  ] = useState(false);

  const [
    respuestaSeleccionada,
    setRespuestaSeleccionada
  ] = useState(null);

  const [aciertos, setAciertos] =
    useState(0);

  const [
    respondidas,
    setRespondidas
  ] = useState(0);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(false);

  const mezclar = (arr) => {
    const copia = [...arr];

    for (
      let i =
        copia.length - 1;
      i > 0;
      i--
    ) {
      const j =
        Math.floor(
          Math.random() *
            (i + 1)
        );

      [
        copia[i],
        copia[j]
      ] = [
        copia[j],
        copia[i]
      ];
    }

    return copia;
  };

  const cargarPreguntas =
    async () => {
      setLoading(true);
      setError(false);

      const data =
        await getQuestionsTraducidas(
          dificultad,
          categoria
        );

      if (!data.length) {
        setError(true);
        setLoading(false);
        return;
      }

      const lista = data
        .slice(0, 10)
        .map((q) => ({
          ...q,
          opciones:
            mezclar([
              ...(q.incorrectAnswers ||
                []),
              q.correctAnswer
            ])
        }));

      setPreguntas(lista);
      setIndice(0);
      setTiempo(
        getTiempo()
      );
      setPuntaje(0);
      setAciertos(0);
      setRespondidas(0);
      setLoading(false);
    };

  useEffect(() => {
    cargarPreguntas();
  }, []);

  useEffect(() => {
    if (
      !preguntas[indice] ||
      mostrarRespuesta
    )
      return;

    if (tiempo === 0) {
      manejarRespuesta(null);
      return;
    }

    const timer =
      setTimeout(() => {
        setTiempo(
          (prev) =>
            prev - 1
        );
      }, 1500);

    return () =>
      clearTimeout(timer);
  }, [
    tiempo,
    mostrarRespuesta,
    preguntas,
    indice
  ]);

  const manejarRespuesta = (
    opcion
  ) => {
    if (
      mostrarRespuesta ||
      !preguntas[indice]
    )
      return;

    const actual =
      preguntas[indice];

    const correcta =
      opcion ===
      actual.correctAnswer;

    const nuevoPuntaje =
      correcta
        ? puntaje + 100
        : puntaje;

    setRespondidas(
      (prev) =>
        prev + 1
    );

    if (correcta) {
      setPuntaje(
        nuevoPuntaje
      );

      setAciertos(
        (prev) =>
          prev + 1
      );
    }

    setRespuestaSeleccionada(
      opcion
    );

    setMostrarRespuesta(
      true
    );

    setTimeout(() => {
      if (
        indice + 1 >=
        preguntas.length
      ) {
        nav(
          "/resultados",
          {
            state: {
              puntaje:
                nuevoPuntaje,
              total:
                preguntas.length,
              aciertos:
                correcta
                  ? aciertos +
                    1
                  : aciertos,
              respondidas:
                respondidas +
                1
            }
          }
        );
      } else {
        setIndice(
          (prev) =>
            prev + 1
        );

        setTiempo(
          getTiempo()
        );

        setMostrarRespuesta(
          false
        );

        setRespuestaSeleccionada(
          null
        );
      }
    }, 1500);
  };

  if (loading)
    return (
      <SpinnerCustom />
    );

  if (
    error ||
    !preguntas.length
  ) {
    return (
      <div className="text-center mt-5">
        <h3>
          No se pudieron
          cargar las
          preguntas 😢
        </h3>

        <Button
          texto="Reintentar"
          onClick={
            cargarPreguntas
          }
        />
      </div>
    );
  }

  const actual =
    preguntas[indice];

  if (!actual) return null;

  const porcentaje =
    respondidas === 0
      ? 0
      : (aciertos /
          respondidas) *
        100;

  const colores = [
    "red",
    "blue",
    "yellow",
    "green"
  ];

  const letras = [
    "A.",
    "B.",
    "C.",
    "D."
  ];

  const jugador =
    usuario ||
    localStorage.getItem(
      "jugador"
    ) ||
    "Jugador";

  return (
    <div className="game-container">
      <CardCustom className="game-card">
          <div
            style={{
              display:
                "flex",
              justifyContent:
                "space-between",
              alignItems:
                "center"
            }}
          >
            <h6>
              👤 {jugador}
            </h6>

            <h5>
              Pregunta{" "}
              {indice + 1} /{" "}
              {
                preguntas.length
              }
            </h5>

            <h5>
              {puntaje}
            </h5>
          </div>

          <div
            className="stats-bar"
            style={{
              marginBottom:
                "10px"
            }}
          >
            <small>
              Respondidas:{" "}
              {
                respondidas
              }{" "}
              | Aciertos:{" "}
              {aciertos} |{" "}
              {porcentaje.toFixed(
                0
              )}
              %
            </small>
          </div>

          <div className="question-box">
            {
              actual.question
            }
          </div>

          <ProgressBar
            tiempo={
              tiempo
            }
            total={getTiempo()}
          />

          <div className="answers">
            {actual.opciones.map(
              (
                op,
                i
              ) => {
                let claseFinal =
                  `kahoot-btn ${colores[i]}`;

                if (
                  mostrarRespuesta
                ) {
                  if (
                    op ===
                    actual.correctAnswer
                  ) {
                    claseFinal =
                      "kahoot-btn correct";
                  } else if (
                    op ===
                    respuestaSeleccionada
                  ) {
                    claseFinal =
                      "kahoot-btn incorrect";
                  } else {
                    claseFinal =
                      "kahoot-btn disabled";
                  }
                }

                return (
                  <Button
                    key={
                      i
                    }
                    texto={`${letras[i]} ${op}`}
                    onClick={() =>
                      manejarRespuesta(
                        op
                      )
                    }
                    disabled={
                      mostrarRespuesta
                    }
                    clase={
                      claseFinal
                    }
                  />
                );
              }
            )}
          </div>

          {mostrarRespuesta && (
            <h5 className="mt-3">
              {respuestaSeleccionada ===
              actual.correctAnswer
                ? "✅Correcto"
                : `❎Incorrecto. Era: ${actual.correctAnswer}`}
            </h5>
          )}
      </CardCustom>
    </div>
  );
}