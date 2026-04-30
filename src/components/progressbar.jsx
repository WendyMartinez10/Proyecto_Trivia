export default function BarraTiempo({ tiempo, total }) {
  return (
    <div className="progress mt-3 mb-3">
      <div
        className={`progress-bar ${
          tiempo > 10
            ? "bg-success"
            : tiempo > 5
            ? "bg-warning"
            : "bg-danger"
        }`}
        style={{ width: `${(tiempo / total) * 100}%` }}
      >
        {tiempo}
      </div>
    </div>
  );
}