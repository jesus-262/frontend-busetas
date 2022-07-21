import { useState, useEffect } from "react";
import axios from "axios";
import Toast from "../toast/toast";
import React from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import { enviroments } from "../../env";
function Crearformulario(props) {
  //console.log(props);
  var [tipo, settipo] = useState("INICIO");
  var [placa, setplaca] = useState("");
  var [direccion, setdireccion] = useState("");
  var [file, setimagen] = useState([]);

  var [suben, setsuben] = useState(0);
  var [bajan, setbajan] = useState(0);
  var [observacion, setobservacion] = useState("");
  Modal.setAppElement("body");
  var [formu, setformulario] = useState([]);
  //toast
  var [mensaje, setmensaje] = useState();
  var [succes, setsucces] = useState("");
  let subtitle;
  var [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }
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

    const formdata = new FormData();
    const token = JSON.parse(localStorage.getItem("user"));

    const params = {
      token: token,
      direccion,
      suben,
      bajan,
      direccion,
      placa,
      file,
      observacion,
      tipo,
    };

    formdata.append("img", file);
    openModal();
    const img = await axios
      .post(enviroments.backendUrl + "/api/mandarformulario", formdata, {
        params: {
          token: token,
          direccion,
          suben,
          bajan,
          direccion,
          placa,

          observacion,
          tipo,
        },
      })
      .catch((error) => {
        console.log("error pls");
        localStorage.removeItem("user");
        window.location.href = "/";
      });
    console.log("img");
    console.log(img);

    //setmensaje((mensaje = { mensaje: "Recorrido Creado" }));
    // setsucces((succes = { succes: true }));
    console.log("crear");

    if (img) {
      mostrarformularios();

      closeModal();
      console.log("puede seguir");
    }
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
    setmensaje((mensaje = { mensaje: "" }));
    setsucces((succes = { succes: "" }));
    console.log(mostrarformulario.data);
    setformulario((setformulario = { formu: mostrarformulario.data }));
    props.crearnuevoformulario(mostrarformulario.data);
  };

  const imagenChange = async (e) => {
    setimagen((file = null));

    var extencion1 = "image/png";
    var extencion2 = "image/jpeg";
    var extencion3 = "image/jpg";
    console.log("foto");
    console.log(e.target.files[0]);
    console.log(e.target.value);
    if (e.target.files[0]) {
      if (e.target.files[0].size > 5242880) {
        console.log("Solo imagenes menores a 5mb");
        setmensaje((mensaje = { mensaje: "Solo imagenes menores a 5mb" }));
        setsucces((succes = { succes: false }));

        e.target.value = null;
      } else if (e.target.files[0].type == extencion1) {
        console.log("son iguales " + e.target.files[0].type);
        setmensaje((mensaje = { mensaje: "Imagen Subida" }));
        setsucces((succes = { succes: true }));
        setimagen((file = e.target.files[0]));
      } else if (e.target.files[0].type == extencion2) {
        console.log("son iguales " + e.target.files[0].type);
        setmensaje((mensaje = { mensaje: "Imagen Subida" }));
        setsucces((succes = { succes: true }));
        setimagen((file = e.target.files[0]));
      } else if (e.target.files[0].type == extencion3) {
        console.log("son iguales " + e.target.files[0].type);
        setmensaje((mensaje = { mensaje: "Imagen Subida" }));
        setsucces((succes = { succes: true }));
        setimagen((file = e.target.files[0]));
      } else {
        console.log("no son iguales");
        setmensaje(
          (mensaje = {
            mensaje: "Solo imagenes con la extencion png jpg y jpeg",
          })
        );
        setsucces((succes = { succes: false }));
        e.target.value = null;
      }
    }
    console.log(file);
  };
  const tipoChange = async (e) => {
    settipo((tipo = e.target.value));
    console.log(tipo);
    setimagen((file = null));
    setmensaje((mensaje = { mensaje: "" }));
    setsucces((succes = { succes: "" }));
    //renderimagen();
  };
  const placaChange = async (e) => {
    setplaca((placa = e.target.value));
    console.log(placa);
    setmensaje((mensaje = { mensaje: "" }));
    setsucces((succes = { succes: "" }));
  };
  const observacionChange = async (e) => {
    setobservacion((observacion = e.target.value));
    console.log(observacion);
    setmensaje((mensaje = { mensaje: "" }));
    setsucces((succes = { succes: "" }));
  };

  const direccionChange = async (e) => {
    setdireccion((direccion = e.target.value));
    console.log(direccion);
    setmensaje((mensaje = { mensaje: "" }));
    setsucces((succes = { succes: "" }));
  };
  const subenChange = async (e) => {
    setsuben((suben = e.target.value));
    console.log(suben);
    setmensaje((mensaje = { mensaje: "" }));
    setsucces((succes = { succes: "" }));
  };
  const bajanChange = async (e) => {
    setbajan((bajan = e.target.value));
    console.log(bajan);
    setmensaje((mensaje = { mensaje: "" }));
    setsucces((succes = { succes: "" }));
  };
  function renderimagen() {
    console.log("entro a render");

    if (tipo == "INICIO" || tipo == "FINAL") {
      // console.log("entro");
      // console.log("entro al if")
      return (
        <div className="col-xs-12">
          <div className="form-group">
            <input
              type="file"
              name="image"
              onChange={imagenChange}
              className="form-control input-lg"
              maxLength="20"
            ></input>
          </div>
        </div>
      );
    }
  }

  return (
    <>
      <br></br>
      <br></br>
      <br></br>
      <div className="container">
        <div className="App">
          <div className="card border-success mb-4">
            <div className="card-header bg-transparent border-success lineaverde">
              Recorrido
            </div>
            <div className="d-flex justify-content-center">
              <div className="">
                <div className="card-body text-success">
                  <h5 className="card-title">Ingresa tu recorrido</h5>
                  <div className="card-text">
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">
                          Recorrido
                        </span>
                      </div>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        onChange={tipoChange}
                      >
                        <option value="INICIO">Inicio</option>
                        <option value="INTERMEDIO">Intermedio</option>
                        <option value="FINAL">Final</option>
                      </select>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="# Placa"
                      aria-label="# Placa"
                      aria-describedby="basic-addon1"
                      onChange={placaChange}
                      maxLength="20"
                    ></input>
                    <br></br>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Direccion"
                      aria-label="Direccion"
                      aria-describedby="basic-addon1"
                      onChange={direccionChange}
                      maxLength="20"
                    ></input>
                    <br></br>
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">
                          Personas que suben al Bus
                        </span>
                      </div>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        onChange={subenChange}
                      >
                        <option defaultValue="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        <option value="13">13</option>
                        <option value="14">14</option>
                        <option value="15">15</option>
                        <option value="16">16</option>
                        <option value="17">17</option>
                        <option value="18">18</option>
                        <option value="19">19</option>
                        <option value="20">20</option>
                        <option value="21">21</option>
                        <option value="22">22</option>
                        <option value="23">23</option>
                        <option value="24">24</option>
                        <option value="25">25</option>
                        <option value="26">26</option>
                        <option value="27">27</option>
                        <option value="28">28</option>
                        <option value="29">29</option>
                        <option value="30">30</option>
                      </select>
                    </div>
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">
                          Personas que bajan del Bus
                        </span>
                      </div>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        onChange={bajanChange}
                      >
                        <option defaultValue="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        <option value="13">13</option>
                        <option value="14">14</option>
                        <option value="15">15</option>
                        <option value="16">16</option>
                        <option value="17">17</option>
                        <option value="18">18</option>
                        <option value="19">19</option>
                        <option value="20">20</option>
                        <option value="21">21</option>
                        <option value="22">22</option>
                        <option value="23">23</option>
                        <option value="24">24</option>
                        <option value="25">25</option>
                        <option value="26">26</option>
                        <option value="27">27</option>
                        <option value="28">28</option>
                        <option value="29">29</option>
                        <option value="30">30</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="">
                <div className="card-body text-success">
                  <h5 className="card-title">Observaciones</h5>
                  <div className="card-text">
                    <div className="form-group">
                      <textarea
                        className="form-control"
                        id="exampleFormControlTextarea1"
                        rows="3"
                        onChange={observacionChange}
                      ></textarea>
                    </div>
                  </div>
                </div>

                {renderimagen()}
              </div>
            </div>
            <div className="card-footer bg-transparent border-success lineaverde">
              <button
                className="btn btn-outline-success my-2 my-sm-0 "
                onClick={crear}
              >
                Crear recorrido
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          shouldCloseOnOverlayClick={false}
        >
          <h2>Subiendo Imagen</h2>

          <div>Espere unos segundos mientras subimos la imagen</div>
        </Modal>
      </div>
      <Toast
        mensaje={mensaje ? mensaje.mensaje : ""}
        succes={succes ? succes.succes : ""}
      />
    </>
  );
}

export default Crearformulario;
