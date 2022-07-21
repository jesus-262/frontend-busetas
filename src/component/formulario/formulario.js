import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import dayjs from "dayjs";
import Crearformulario from "../formulario.crear/crearformulario";
import axios from "axios";
import { enviroments } from "../../env";
function Formulario() {
  var [formu, setformulario] = useState([]);
  var [number, setnumber] = useState(0);
  var [ultimo, setultimo] = useState(0);
  var [seconds, setSeconds] = useState(0);
  const ref = useRef();

  useEffect(() => {
    console.log("inicio de pagina");
    const token = localStorage.getItem("user");
    axios.defaults.headers.common["x-access-token"] =
      localStorage.getItem("user");
    //verificar token
    verificartoken();
    /*
    const interval= setInterval(() => {
      setSeconds(seconds = seconds + 1);
     
      localStorage.setItem("seg", JSON.stringify(seconds));
     // const segundos = JSON.parse(localStorage.getItem("seg"));
      // setformulario((setformulario = { formu: cosas }));
    }, 1000);*/

    //setInterval(funcionConRetraso, 9000);
    //setTimeout(funcionConRetraso, 3000);
    console.log("inicio revisando borrado de formulario");
    //verifica fecha del formulario
    verificarformulario();
    //muestra los formularios al comienzo
    mostrarformularios();
    //muestra el delete del formulario
    numero();
    const interval = setInterval(funcionConRetraso, 1200000);
    console.log(ref.current);
    ref.current = interval;
    return () => clearInterval(interval);
  }, []);
  //const memoizedValue = useMemo(() => funcionConRetraso(), []);

  function funcionConRetraso() {
    setSeconds((seconds = seconds + 1));
    localStorage.setItem("seg", JSON.stringify(seconds));
    // const segundos = JSON.parse(localStorage.getItem("seg"));
    //clearInterval(ref.current)
    //localStorage.removeItem("user");
    //window.location.href = "/";
  }
  useEffect(() => {
    //mostrarformularios();
    //mostrarformularios();
  }, [formu]);
  const verificartoken = async () => {
    const token = JSON.parse(localStorage.getItem("user"));
    const params = {
      token: token,
    };

    const mostrarformulario = await axios
      .post(enviroments.backendUrl + "/api/verificartoken", params, {
        withCredentials: true,
      })
      .catch((error) => {
        console.log("error pls");
        localStorage.removeItem("user");
        window.location.href = "/";
      });
  };
  const refrescar = async () => {
    console.log("refrescar");
    const token = JSON.parse(localStorage.getItem("user"));
    const params = {
      token: token,
    };

    const mostrarformulario = await axios
      .post(enviroments.backendUrl + "/api/verificarformulario", params, {
        withCredentials: true,
      })
      .catch((error) => {
        console.log("error pls");
        localStorage.removeItem("user");
        window.location.href = "/";
      });
    window.location.href = "/formulario";
  };
  const verificarformulario = async () => {
    const token = JSON.parse(localStorage.getItem("user"));
    const params = {
      token: token,
    };

    const mostrarformulario = await axios
      .post(enviroments.backendUrl + "/api/verificarformulario", params, {
        withCredentials: true,
      })
      .catch((error) => {
        console.log("error pls");
        localStorage.removeItem("user");
        window.location.href = "/";
      });
  };

  const mostrarformularios = async () => {
    const token = JSON.parse(localStorage.getItem("user"));
    const params = {
      token: token,
    };

    const mostrarformulario = await axios
      .post(enviroments.backendUrl + "/api/todoslosformularios", params, {
        withCredentials: true,
      })
      .catch((error) => {
        console.log("error pls");
        localStorage.removeItem("user");
        window.location.href = "/";
      });

    //console.log(mostrarformulario.data);

    setformulario((setformulario = { formu: mostrarformulario.data }));
    return mostrarformulario.data;
  };
  const crearnuevoformulario = async (cosas) => {
    // console.log("unidos");
    setformulario((setformulario = { formu: cosas }));
    mostrarformularios();
    numero();
  };

  const borrar = async (id) => {
    // console.log(id.id);
    id = id.id;
    const params = {
      id: id.id,
    };
    await axios
      .delete(enviroments.backendUrl + "/api/deleteformulario/" + id, {
        withCredentials: true,
      })
      .catch((error) => {
        console.log("error pls");
        localStorage.removeItem("user");
        window.location.href = "/";
      });
    numero();
    mostrarformularios();
    //window.location.href = "/formulario";
  };
  const numero = async (id) => {
    const token = JSON.parse(localStorage.getItem("user"));
    const params = {
      token: token,
    };
    const numero = await axios
      .post(enviroments.backendUrl + "/api/ultimoformulario", params, {
        withCredentials: true,
      })
      .catch((error) => {
        console.log("error pls");
        localStorage.removeItem("user");
        window.location.href = "/";
      });
    console.log("numero.data.length");
    //    console.log(numero.data);
    setnumber((setnumber = numero.data));
    window.scrollTo(0, document.body.scrollHeight * 2);
    return numero.data;
  };
  function rendereliminar(index, recorrido, id) {
    console.log(index);
    // console.log(recorrido)
    //  console.log(number)
    // setultimo((recorrido));

    if (number == recorrido) {
      console.log("entro al ultimo");
      return (
        <>
          <button
            style={{ width: "20%", height: "100%" }}
            type="button"
            className="btn btn-danger"
            onClick={() => borrar({ id })}
          >
            Eliminar
          </button>
        </>
      );
    }
  }
  function rendereobservacion(observacion) {
    if (observacion != "") {
      //console.log("hay observacion dibuje");
      return (
        <h5>
          {observacion}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            fill="currentColor"
            className="bi bi-chat-text"
            viewBox="0 0 16 16"
            style={{ marginBottom: "20px", marginLeft: "10px" }}
          >
            <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z" />
            <path d="M4 5.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8zm0 2.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5z" />
          </svg>
        </h5>
      );
    }
  }
  function rendereimagen(imagen_url) {
    if (imagen_url != "") {
      //  console.log("hay observacion dibuje");
      return (
        <img
          src={imagen_url}
          alt="img"
          className="img-thumbnail"
          style={{ width: "200px", height: "100px" }}
        ></img>
      );
    }
  }
  function renderfecha(fecha) {
    dayjs().format();
    const dia = dayjs(fecha).format("DD-MM-YYYY");
    // console.log(dia);
    return (
      <h5 className="" style={{ padding: "5px" }}>
        {" "}
        Fecha: {dia}{" "}
      </h5>
    );
  }
  function renderhora(hora) {
    dayjs().format();
    const hour = dayjs(hora).format("HH:mm:ssa");
    // console.log(dia);
    return (
      <h5 style={{ padding: "5px" }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        fill="currentColor"
        className="bi bi-watch"
        viewBox="0 0 16 16"
      >
        <path d="M8.5 5a.5.5 0 0 0-1 0v2.5H6a.5.5 0 0 0 0 1h2a.5.5 0 0 0 .5-.5V5z" />
        <path d="M5.667 16C4.747 16 4 15.254 4 14.333v-1.86A5.985 5.985 0 0 1 2 8c0-1.777.772-3.374 2-4.472V1.667C4 .747 4.746 0 5.667 0h4.666C11.253 0 12 .746 12 1.667v1.86a5.99 5.99 0 0 1 1.918 3.48.502.502 0 0 1 .582.493v1a.5.5 0 0 1-.582.493A5.99 5.99 0 0 1 12 12.473v1.86c0 .92-.746 1.667-1.667 1.667H5.667zM13 8A5 5 0 1 0 3 8a5 5 0 0 0 10 0z" />
      </svg>{" "}
      {hour}
    </h5>
    );
  }

  //deleteformulario

  return (
    <>
      <div className="float-right">
        <button
          style={{ width: "100px", height: "100%" }}
          type="button"
          className="btn btn-danger"
          onClick={() => refrescar()}
        >
          Refrescar formulario
        </button>
      </div>
      <Crearformulario
        crearnuevoformulario={crearnuevoformulario}
        titulo="mi titulo"
      ></Crearformulario>

      {Object.values(formu).map((value, index) => {
        return (
          <div key={index}>
            {value.map(
              ({
                fecha,
                hora,
                direccion,
                id_usuario,
                recorrido,
                bajan,
                placa,
                tipo,
                observacion,
                imagen_url,
                imagen_id,
                suben,
                id,
              }) => (
                <div key={id}>
                  <div
                    className="container "
                    style={{ width: "50%", height: "100%" }}
                  >
                    <div className="card text-white bg-success mb-3">
                      <div className="card-body">
                        <h5 className="card-title">
                          {" "}
                          Recorrido: {recorrido} {tipo}{" "}
                        </h5>
                      </div>
                      <div className="d-flex justify-conten-between">
                        <div>{renderfecha(fecha)}</div>

                        <div>
                        {renderhora(hora)}
                        </div>
                      </div>
                      {rendereimagen(imagen_url)}
                      {rendereobservacion(observacion)}

                      <div className="d-flex justify-content-around">
                        <p
                          className="card-text"
                          style={{ margin: "5%", height: "100%" }}
                        >
                          Direccion {direccion}
                        </p>
                        <p
                          className="card-text"
                          style={{ margin: "5%", height: "100%" }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-car-front-fill"
                            viewBox="0 0 16 16"
                          >
                            <path d="M2.52 3.515A2.5 2.5 0 0 1 4.82 2h6.362c1 0 1.904.596 2.298 1.515l.792 1.848c.075.175.21.319.38.404.5.25.855.715.965 1.262l.335 1.679c.033.161.049.325.049.49v.413c0 .814-.39 1.543-1 1.997V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.338c-1.292.048-2.745.088-4 .088s-2.708-.04-4-.088V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.892c-.61-.454-1-1.183-1-1.997v-.413a2.5 2.5 0 0 1 .049-.49l.335-1.68c.11-.546.465-1.012.964-1.261a.807.807 0 0 0 .381-.404l.792-1.848ZM3 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm10 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM6 8a1 1 0 0 0 0 2h4a1 1 0 1 0 0-2H6ZM2.906 5.189l.956-1.913A.5.5 0 0 1 4.309 3h7.382a.5.5 0 0 1 .447.276l.956 1.913a.51.51 0 0 1-.497.731c-.91-.073-3.35-.17-4.597-.17-1.247 0-3.688.097-4.597.17a.51.51 0 0 1-.497-.731Z" />
                          </svg>
                          {placa}
                        </p>
                        <p
                          className="card-text"
                          style={{ margin: "5%", height: "100%" }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-arrow-up-circle-fill"
                            viewBox="0 0 16 16"
                          >
                            <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z" />
                          </svg>{" "}
                          {suben}
                        </p>
                        <p
                          className="card-text"
                          style={{ margin: "5%", height: "100%" }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-arrow-down-circle-fill"
                            viewBox="0 0 16 16"
                          >
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z" />
                          </svg>{" "}
                          {bajan}
                        </p>
                      </div>
                      {rendereliminar(index, recorrido, id)}
                    </div>
                  </div>
                  <br></br>
                </div>
              )
            )}
          </div>
        );
      })}
    </>
  );
}

export default Formulario;
