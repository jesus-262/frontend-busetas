import { useState, useEffect } from "react";

import React from "react";
import XLSX from "xlsx";
import axios from "axios";
import Toast from "../toast/toast";
import Modal from "react-modal";
import { enviroments } from "../../env";
function Cpanel() {
  var [datos, setexcel] = useState([]);
  var [usuario, setusuario] = useState([]);
  var [cedula, setcedula] = useState();
  var [contrasena, setcontrasena] = useState();
  var [rol, setrol] = useState("PERSONA NATURAL");
  var [nombre, setnombre] = useState();
  var [apellido, setapellido] = useState();
  //toast
  var [mensaje, setmensaje] = useState();
  var [succes, setsucces] = useState("");
  //borrar
  var [modalIsOpen, setIsOpen] = useState(false);

  var [modalnombre, setmodalnombre] = useState();
  var [modalcedula, setmodalcedula] = useState();
  var [modalapellido, setmodalapellido] = useState();
  Modal.setAppElement("body");
  useEffect(() => {
    const token = localStorage.getItem("user");
    axios.defaults.headers.common["x-access-token"] =
      localStorage.getItem("user");
    mostrausuarios();
  }, []);
  function openModal() {
    setIsOpen(true);
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }

  const closeModal = async () => {
    /*
      await axios.delete(enviroments.backendUrl + "/api/deleteformulario/" + id, {
        withCredentials: true,
      });*/
    await axios
      .delete(enviroments.backendUrl + "/api/deleteusuario/" + modalcedula, {
        withCredentials: true,
      })
      .catch((error) => {
        console.log("error pls");

        window.location.href = "/";
      });
    setIsOpen(false);
    setmensaje((mensaje = { mensaje: "" }));
    setsucces((succes = { succes: "" }));
    mostrausuarios();
  };
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",

      transform: "translate(-50%, -50%)",
    },
  };
  const crear = async (e) => {
    e.preventDefault();
    console.log("crear");
    if (cedula && contrasena && rol && nombre && apellido) {
      setmensaje((mensaje = { mensaje: "Usuario creado" }));
      setsucces((succes = { succes: true }));

      const token = JSON.parse(localStorage.getItem("user"));

      const params = {
        token: token,
        cedula,
        contrasena,
        rol,
        nombre,
        apellido,
      };

      const usuarionuevo = await axios
        .post(enviroments.backendUrl + "/api/crearusuario", params, {
          withCredentials: true,
        })
        .catch((error) => {
          console.log("error pls");
          localStorage.removeItem("user");
          window.location.href = "/";
        });
      mostrausuarios();
    } else {
      setmensaje((mensaje = { mensaje: "Llene todos los campos" }));
      setsucces((succes = { succes: false }));
    }
  };
  /*{
    headers: {
      
      'x-access-token': token 
    }}*/
  const token = localStorage.getItem("user");
  const mostrausuarios = async (e) => {
    const usuarios = await axios
      .get(enviroments.backendUrl + "/api/mostrarusuarios")
      .catch((error) => {
        console.log("error pls");
        localStorage.removeItem("user");
        window.location.href = "/";
      });
    console.log(usuarios.data);
    setusuario((usuario = usuarios.data));
    setmensaje((mensaje = { mensaje: "" }));
    setsucces((succes = { succes: "" }));
  };
  const cedulaChange = async (e) => {
    e.preventDefault();
    setcedula((cedula = e.target.value));
    console.log("cedula" + cedula);
    setmensaje((mensaje = { mensaje: "" }));
    setsucces((succes = { succes: "" }));
  };
  const contrasenaChange = async (e) => {
    e.preventDefault();
    setcontrasena((contrasena = e.target.value));
    console.log("contrasena" + contrasena);
    setmensaje((mensaje = { mensaje: "" }));
    setsucces((succes = { succes: "" }));
  };
  const rolChange = async (e) => {
    e.preventDefault();
    setrol((rol = e.target.value));
    console.log("rol" + rol);
    setmensaje((mensaje = { mensaje: "" }));
    setsucces((succes = { succes: "" }));
  };
  const nombreChange = async (e) => {
    e.preventDefault();
    setnombre((nombre = e.target.value));
    console.log("nombre" + nombre);
    setmensaje((mensaje = { mensaje: "" }));
    setsucces((succes = { succes: "" }));
  };
  const apellidoChange = async (e) => {
    e.preventDefault();
    setapellido((apellido = e.target.value));
    console.log("apellido" + apellido);
    setmensaje((mensaje = { mensaje: "" }));
    setsucces((succes = { succes: "" }));
  };
  const excel = async (e) => {
    e.preventDefault();

    const mostrarexcel = await axios
      .get(enviroments.backendUrl + "/api/mostrarexcel")
      .catch((error) => {
        console.log("error pls");
        localStorage.removeItem("user");
        window.location.href = "/";
      });
    const XLSX = require("xlsx");
    console.log(mostrarexcel.data);
    var wb = XLSX.utils.book_new();
    var ws = XLSX.utils.json_to_sheet(mostrarexcel.data);
    XLSX.utils.book_append_sheet(wb, ws, "base de datos");
    XLSX.writeFile(wb, "BaseDeDatos.xlsx");
    console.log("excel");
  };
  const borrar = async (cedula, nombre, apellido) => {
    setmodalcedula((modalcedula = cedula));
    setmodalnombre((modalnombre = nombre));
    setmodalapellido((modalapellido = apellido));
    openModal();

    /*
    await axios.delete(enviroments.backendUrl + "/api/deleteusuario/" + cedula, {
      withCredentials: true,
    });*/
  };
  function rendereliminar(rol, cedula, nombre, apellido) {
    if (rol == "PERSONA NATURAL") {
      return (
        <>
          <button
            style={{ width: "100%", height: "100%" }}
            type="button"
            className="btn btn-danger"
            onClick={() => borrar(cedula, nombre, apellido)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-trash-fill"
              viewBox="0 0 16 16"
            >
              <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
            </svg>
          </button>
        </>
      );
    }
  }
  return (
    <>
      <div className="App">
        <h1>Cpanel</h1>
        <div className="container">
          <div className="card">
            <div className="card-header"></div>
            <div className="card-body">
              <h5 className="card-title">Bienvenido Administrador</h5>
              <p className="card-text"></p>
              <div className="align-content-md-end">
                <div className="d-grid gap-2 d-md-block">
                  <div className="container">
                    <div className="form-group row">
                      <label
                        htmlFor="staticEmail"
                        className="col-sm-10 col-form-label"
                      >
                        Cedula
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Cedula"
                          aria-label="# Placa"
                          aria-describedby="basic-addon1"
                          onChange={cedulaChange}
                          maxLength="20"
                        ></input>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor="inputPassword"
                        className="col-sm-10 col-form-label"
                      >
                        Contraseña
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Contraseña"
                          aria-label="# Placa"
                          aria-describedby="basic-addon1"
                          onChange={contrasenaChange}
                          maxLength="20"
                        ></input>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor="inputPassword"
                        className="col-sm-10 col-form-label"
                      >
                        Tipo de cuenta
                      </label>
                      <div className="col-sm-10">
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          onChange={rolChange}
                        >
                          <option value="PERSONA NATURAL">
                            PERSONA NATURAL
                          </option>
                          <option value="ADMINISTRADOR">ADMINISTRADOR</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor="inputPassword"
                        className="col-sm-10 col-form-label"
                      >
                        Nombre
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Nombre"
                          aria-label="Nombre"
                          aria-describedby="basic-addon1"
                          onChange={nombreChange}
                          maxLength="20"
                        ></input>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor="inputPassword"
                        className="col-sm-10 col-form-label"
                      >
                        Apellido
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Apellido"
                          aria-label="Apellido"
                          aria-describedby="basic-addon1"
                          onChange={apellidoChange}
                          maxLength="20"
                        ></input>
                      </div>
                    </div>

                    <br></br>
                  </div>

                  <br></br>
                  <div className="row">
                    <div className="col-5">
                      <button
                        className="btn btn-outline-success my-2 my-sm-0 "
                        onClick={crear}
                      >
                        Crear nueva cuenta
                      </button>
                    </div>
                    <div className="col-5">
                      <button
                        className="btn btn-outline-success my-2 my-sm-0 "
                        onClick={excel}
                      >
                        Descargar excel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br></br>
      <div className="container">
        <h1>Usuarios</h1>
      </div>
      <br></br>
      <div className="container">
      <div className="overflow-auto">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Cedula</th>
              <th scope="col">Contraseña</th>
              <th scope="col">Tipo</th>
              <th scope="col">Nombre</th>
              <th scope="col">Apellido</th>
              <th scope="col">Borrar</th>
            </tr>
          </thead>
          <tbody>
            {usuario.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.cedula}</td>
                <td>{usuario.contrasena}</td>
                <td>{usuario.rol}</td>
                <td>{usuario.nombre}</td>
                <td>{usuario.apellido}</td>
                <td>
                  {rendereliminar(
                    usuario.rol,
                    usuario.cedula,
                    usuario.nombre,
                    usuario.apellido
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
      <br></br>
      <br></br>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        shouldCloseOnOverlayClick={false}
      >
        <h1>¿Seguro que quieres borrar este usuario?</h1>
        <p>
          Usuario {modalnombre} {modalapellido} con cedula: {modalcedula}
        </p>
        <p>Se borrara permanentemente de la base de datos y excel</p>

        <button
          className="btn btn-outline-success my-2 my-sm-0 "
          onClick={() => closeModal()}
        >
          Borrar
        </button>
      </Modal>
      <Toast
        mensaje={mensaje ? mensaje.mensaje : ""}
        succes={succes ? succes.succes : ""}
      />
    </>
  );
}

export default Cpanel;
