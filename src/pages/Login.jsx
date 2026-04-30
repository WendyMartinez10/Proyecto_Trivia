import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {
  auth,
  provider,
  githubProvider
} from "../firebase";

export default function Login({ setUsuario }) {
  const nav = useNavigate();

  const entrarGoogle = async () => {
    try {
      const result = await signInWithPopup(
        auth,
        provider
      );

      const nombre =
        result.user.displayName;

      setUsuario(nombre);

      localStorage.setItem(
        "jugador",
        nombre
      );

      nav("/inicio");
    } catch (error) {
      console.log(error);
      alert(
        "Error al iniciar sesión con Google"
      );
    }
  };

  const entrarGithub = async () => {
    try {
      const result = await signInWithPopup(
        auth,
        githubProvider
      );

      const nombre =
        result.user.displayName ||
        result.user.providerData[0]
          ?.displayName ||
        result.user.providerData[0]
          ?.uid ||
        "Jugador";

      setUsuario(nombre);

      localStorage.setItem(
        "jugador",
        nombre
      );

      nav("/inicio");
    } catch (error) {
      console.log(error);
      alert(
        "Error al iniciar sesión con GitHub"
      );
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">

        <h1 className="login-title">
          🧠BrainQuiz
        </h1>

        <h3 className="login-subtitle">
          ▶Iniciar Sesión
        </h3>

        <p className="login-text">
          Elige una cuenta para continuar
        </p>

        <button
          className="login-btn google-btn"
          onClick={entrarGoogle}
        >
          <i className="bi bi-google"></i>
          Continuar con Google
        </button>

        <button
          className="login-btn github-btn"
          onClick={entrarGithub}
        >
          <i className="bi bi-github"></i>
          Continuar con GitHub
        </button>

        <p className="login-footer">
          🚀 Juega y supera tus récords
        </p>

      </div>
    </div>
  );
}