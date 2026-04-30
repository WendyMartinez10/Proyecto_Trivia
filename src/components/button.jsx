export default function BotonCustom({
  texto,
  onClick,
  clase = "btn btn-primary",
  disabled = false,
  type = "button"
}) {
  return (
    <button
      type={type}
      className={clase}
      onClick={onClick}
      disabled={disabled}
    >
      {texto}
    </button>
  );
}