export default function CardCustom({ title, children, className = "" }) {
  return (
    <div className={`card shadow-lg border-0 rounded-4 p-3 ${className}`}>
      {title && <h3 className="text-center mb-3">{title}</h3>}
      <div>{children}</div>
    </div>
  );
}