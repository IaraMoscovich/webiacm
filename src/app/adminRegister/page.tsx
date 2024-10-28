"use client";

import React, { useEffect, useState, CSSProperties } from "react";
import { createClient } from "../../components/supabaseClient"; // Asegúrate de que esta ruta sea correcta

const supabase = createClient();

interface Solicitud {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  hospital: string;
  status: string;
}

const AdminPage: React.FC = () => {
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSolicitudes();
  }, []);

  const fetchSolicitudes = async () => {
    try {
      // Filtra para obtener solo solicitudes con estado "Pendiente"
      const { data, error } = await supabase
        .from("solicitudes")
        .select("*")
        .eq("status", "Pendiente");

      if (error) {
        throw new Error("Error al cargar solicitudes: " + error.message);
      }
      setSolicitudes(data);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleDecision = async (id: number, status: string) => {
    try {
      const { error } = await supabase
        .from("solicitudes")
        .update({ status })
        .eq("id", id);

      if (error) {
        throw new Error("Error al actualizar el estado: " + error.message);
      }

      // Actualiza la lista de solicitudes
      fetchSolicitudes();
      alert(`Solicitud ${status.toLowerCase()}.`);
    } catch (error) {
      setError((error as Error).message);
    }
  };

  if (loading) {
    return <p>Cargando solicitudes...</p>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Solicitudes de Registro Pendientes</h2>
      {error && <p style={styles.errorMessage}>Error: {error}</p>}
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Hospital</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {solicitudes.map((solicitud) => (
              <tr key={solicitud.id}>
                <td>{solicitud.full_name}</td>
                <td>{solicitud.email}</td>
                <td>{solicitud.phone}</td>
                <td>{solicitud.hospital}</td>
                <td style={{ fontWeight: "bold", color: getStatusColor(solicitud.status) }}>
                  {solicitud.status}
                </td>
                <td>
                  <button
                    onClick={() => handleDecision(solicitud.id, "Aceptado")}
                    style={styles.button}
                  >
                    Aceptar
                  </button>
                  <button
                    onClick={() => handleDecision(solicitud.id, "Denegado")}
                    style={{ ...styles.button, backgroundColor: "#dc3545" }} // Color diferente para el botón de denegar
                  >
                    Denegar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Función para obtener el color del estado
const getStatusColor = (status: string) => {
  switch (status) {
    case "Aceptado":
      return "green";
    case "Denegado":
      return "red";
    default:
      return "orange"; // Para el estado "Pendiente"
  }
};

// Estilos básicos para el componente
const styles: { [key: string]: CSSProperties } = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
  },
  errorMessage: {
    color: "#dc3545",
    textAlign: "center",
    marginTop: "20px",
  },
  tableContainer: {
    maxHeight: "400px", // Altura máxima para la tabla
    overflowY: "auto", // Asegura que el valor es aceptado
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "10px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  button: {
    margin: "0 5px",
    padding: "10px 15px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default AdminPage;
