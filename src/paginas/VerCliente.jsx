import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";

const VerCliente = () => {
  const [cargando, setCargando] = useState(true);
  const [cliente, setCliente] = useState({});
  const { id } = useParams();
  useEffect(() => {
    const obtenerClienteAPI = async () => {
      try {
        const url = `{import.meta.env.VITE_API_URL}/${id}`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        setCliente(resultado);
      } catch (error) {}
      setCargando(!cargando);
    };
    obtenerClienteAPI();
  }, []);

  return cargando ? (
    <Spinner />
  ) : Object.keys(cliente).length === 0 ? (
    <p>No hay resultados</p>
  ) : (
    <div>
      <p className="text-4xl text-gray-600">
        <span className=" uppercase font-bold "> Cliente : </span>
        {cliente.nombre}
      </p>
      {cliente.empresa && (
        <p className="text-2xl text-gray-600  ">
          <span className=" uppercase font-bold ">Empresa : </span>
          {cliente.empresa}
        </p>
      )}
      {cliente.telefono && (
        <p className="text-2xl text-gray-600">
          <span className=" uppercase font-bold ">Telefono : </span>
          {cliente.telefono}
        </p>
      )}
      <p className="text-2xl text-gray-600">
        <span className=" uppercase font-bold ">Email : </span>
        {cliente.email}
      </p>
      {cliente.notas && (
        <p className="text-2xl text-gray-600">
          <span className=" uppercase font-bold ">Notas :</span> {cliente.notas}
        </p>
      )}
    </div>
  );
};

export default VerCliente;
