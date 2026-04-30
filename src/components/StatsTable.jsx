import { Table, Badge } from "react-bootstrap";

export default function StatsTable({ puntaje, correctas, total, porcentaje }) {
  return (
    <Table striped bordered hover responsive className="mt-4 shadow">
      <thead className="table-dark">
        <tr>
          <th>Datos</th>
          <th>Valores</th>
        </tr>
      </thead>

      <tbody>
       
        <tr>
          <td>⭐ Puntaje</td>
          <td>
            <Badge bg="success">{puntaje}</Badge>
          </td>
        </tr>

        <tr>
          <td>✔ Correctas</td>
          <td>{correctas} / {total}</td>
        </tr>

        <tr>
          <td>📊 Precisión</td>
          <td>
            <Badge bg="warning" text="dark">
              {porcentaje.toFixed(2)}%
            </Badge>
          </td>
        </tr>
      </tbody>
    </Table>
  );
}