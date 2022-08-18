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
  var [navegacion, setnavegacion] = useState([]);
  var [dato, setdato] = useState();
  var [dia, setdia] = useState('01');
  var [mes, setmes] = useState('01');
  var [año, setaño] = useState('2022');
  
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
  var [modalIsOpen2, setIsOpen2] = useState(false);
  var [modalnombre, setmodalnombre] = useState();
  var [modalcedula, setmodalcedula] = useState();
  var [modalapellido, setmodalapellido] = useState();

  //label
  var [cedulalabel, setcedulalabel] = useState(null);
  var [contrasenalabel, setcontrasenalabel] = useState(null);
  var [nombrelabel, setnombrelabel] = useState(null);
  var [apellidolabel, setapellidolabel] = useState(null);

  var [textoboton, settextoboton] = useState("Edictar");
  var [comparar, setcomparardisabled] = useState();
  var [idd , setidd] = useState(0);
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
  function openModal2() {
    setIsOpen2(true);
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
  const closeModal2= async () => {
    console.log("cerromodal")
    await axios
      .get(enviroments.backendUrl + "/api/borrarbasededatos" , {
        withCredentials: true,
      })
      .catch((error) => {
        console.log("error pls");

        window.location.href = "/";
      });
   
    setIsOpen2(false);
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
    console.log("crear");
    if (cedula && contrasena && rol && nombre && apellido) {
     
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
         // localStorage.removeItem("user");
          //window.location.href = "/";
        });
        if(usuarionuevo.data=="La cedula ya existe"){
          setmensaje((mensaje = { mensaje: "La cedula ya existe" }));
          setsucces((succes = { succes: false }));
        }else{
          setmensaje((mensaje = { mensaje: "Usuario creado" }));
          setsucces((succes = { succes: true }));
       
          window.location.href = "/";
        
 
    
        }
        console.log(usuarionuevo.data);
       // window.location.href = "/";
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
    console.log(usuarios.data.usuario);
    setusuario((usuario = usuarios.data.usuario));
    setnavegacion((navegacion = usuarios.data.navegacion));
    setmensaje((mensaje = { mensaje: "" }));
    setsucces((succes = { succes: "" }));
  };
  
  const datoChange = async (e) => {
    e.preventDefault();
    setdato((dato = e.target.value));
    console.log(e.target.value)
    var params={
      dato:e.target.value
    }
    const usuarios = await axios
      .post(enviroments.backendUrl + "/api/mostrarunusuario",params)
      .catch((error) => {
        console.log("error pls");
        localStorage.removeItem("user");
       window.location.href = "/";
      });
    //console.log(usuarios);
    setusuario((usuario = usuarios.data));
    //setnavegacion((navegacion = usuarios.data.navegacion));

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

  const cedulaChangelabel= async (e) => {
    e.preventDefault();
    setcedulalabel((cedulalabel = e.target.value));
    console.log("cedula : " + e.target.value);
    setmensaje((mensaje = { mensaje: "" }));
    setsucces((succes = { succes: "" }));
  };
  const contrasenaChangelabel= async (e) => {
    e.preventDefault();
    setcontrasenalabel((contrasenalabel = e.target.value));
    console.log("contrasena : " + e.target.value);
    setmensaje((mensaje = { mensaje: "" }));
    setsucces((succes = { succes: "" }));
  };
  const nombreChangelabel= async (e) => {
    e.preventDefault();
    setnombrelabel((nombrelabel = e.target.value));
    console.log("nombre : " + e.target.value);
    setmensaje((mensaje = { mensaje: "" }));
    setsucces((succes = { succes: "" }));
  };
  const apellidoChangelabel= async (e) => {
    e.preventDefault();
    setapellidolabel((apellidolabel = e.target.value));
    console.log("apellido : " + e.target.value);
    setmensaje((mensaje = { mensaje: "" }));
    setsucces((succes = { succes: "" }));
  };
  const diaChange= async (e) => {
    e.preventDefault();
    setdia((dia = e.target.value));
    console.log("dia : " + e.target.value);
    setmensaje((mensaje = { mensaje: "" }));
    setsucces((succes = { succes: "" }));
  };
  const mesChange= async (e) => {
    e.preventDefault();
    setmes((mes = e.target.value));
    console.log("mes : " + e.target.value);
    setmensaje((mensaje = { mensaje: "" }));
    setsucces((succes = { succes: "" }));
  };
  const añoChange= async (e) => {
    e.preventDefault();
    setaño((año = e.target.value));
    console.log("año : " + e.target.value);
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
  const fechasexcel = async (e) => {
    var params={
      dia,
      mes,
      año
    }
    const mostrarexcel = await axios
      .post(enviroments.backendUrl + "/api/mostrarexcelporfecha",params)
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
      console.log(mostrarexcel);
    console.log("funciona boton")
  }
  const borrarexcel = async (e) => {
    openModal2();
    console.log("funciona borrar")
  }
  
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
  
  const edictar = async (id,cedu,contrasena, nombre, apellido) => {
 console.log("edictar")
  if(textoboton=="Edictar"){
    //aqui preparar todo para despues guardar
    settextoboton((textoboton="Guardar"));
    setcomparardisabled((comparar=cedu));
    setidd((idd=id));
    
    ///edictarusuario
    //reiniciar
    setcedulalabel((cedulalabel=null));
    setnombrelabel((nombrelabel=null));
    setapellidolabel((apellidolabel=null));
    setcontrasenalabel((contrasenalabel=null));
 
  }else{
    if(cedulalabel==null){
      setcedulalabel((cedulalabel=cedu));
    }
    if(nombrelabel==null){
      setnombrelabel((nombrelabel=nombre));
    }
    if(apellidolabel==null){
      setapellidolabel((apellidolabel=apellido));
    }
    if(contrasenalabel==null){
      setcontrasenalabel((contrasenalabel=contrasena));
    }
    //aqui axios para base de datos
    settextoboton((textoboton="Edictar"));
    setcomparardisabled((comparar=""));
    setidd((idd=0));
    const params={
      cedulalabel,
      nombrelabel,
      apellidolabel,
      contrasenalabel,
      id
    }
    console.log(id)
    
        await axios.post(enviroments.backendUrl + "/api/edictarusuario", params, {
         withCredentials: true,
       })
       .catch((error) => {
         console.log("error pls");
         localStorage.removeItem("user");
         window.location.href = "/";
       });
   
  }
 
 

  };
  function renderedictar(id, cedula, contrasena, nombre, apellido) {
    return (
      <>
        <button
          style={{ width: "100%", height: "100%" }}
          type="button"
          className="btn btn-warning"
          onClick={() => edictar(id,cedula, contrasena,nombre, apellido)}
          disabled= {id==idd ||idd==0? false: true}
          
        >
          {cedula==comparar ? "Guardar": "Edictar"}
       
        </button>
      </>
    );
   }

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
              color="white"
            >
              <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
            </svg>
          </button>
        </>
      );
    }
  }
  const navegacionChange= async (e) => {  
    
    console.log("pagina ="+e)
    console.log("navegacion.pages ="+navegacion.pages)
    /*
    if(navegacion.page==navegacion.pages){
      navegacion.page=navegacion.page-1;
     }*/
     if(e>navegacion.pages){
      console.log("entro")
      e=e-1;
     }
      var params = {  
        page: e, 
      }
    
      const usuarios = await axios
      .post(enviroments.backendUrl + "/api/mostrarusuarios",params)
      .catch((error) => {
        console.log("error pls");
        localStorage.removeItem("user");
       window.location.href = "/";
      });
    //console.log(usuarios.data.usuario);
    setusuario((usuario = usuarios.data.usuario));
    setnavegacion((navegacion = usuarios.data.navegacion));
       
       
        
     
  }
  function rendernavegacion() {
  
   
   
    return (
      <>
      <button className="btn btn-secondary glyphicon glyphicon glyphicon-chevron-left" type="onSubmit" name="page" key= {110}  onClick={()=>navegacionChange(navegacion.page-1)}> {"Atras"} </button>
      <button className="btn btn-secondary glyphicon glyphicon-chevron-right" type="onSubmit" name="page" key= {111} onClick={()=>navegacionChange(navegacion.page+1)}>{"Siguente"} </button>
     
      </> );
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
      <div className="form-group ">
                     
                      <div className="col-sm-10" >
                        <input
                         
                          type="text"
                          className="form-control"
                          placeholder="Buscar por Nombre Completo o Cedula"
                          aria-label="Nombre"
                          aria-describedby="basic-addon1"
                          onChange={datoChange}
                          maxLength="20"
                        ></input>
                      </div>
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
              <th scope="col">Edictar</th>
              <th scope="col">Borrar</th>
            </tr>
          </thead>
          <tbody>
            {usuario.map((usuario) => (
              <tr key={usuario.id}  className={usuario.cedula==comparar ? "table-warning": ""}>
                <td><input 
                      type="text"
                      className="form-control"
                      aria-describedby="basic-addon1"
                      onChange={cedulaChangelabel}
                      maxLength="20"
                     defaultValue={usuario.cedula}
                     disabled={usuario.cedula==comparar ? false: true}
                    ></input></td>
                <td><input 
                      type="text"
                      className="form-control"
                      aria-describedby="basic-addon1"
                      onChange={contrasenaChangelabel}
                      maxLength="100"
                     defaultValue={""}
                     disabled={usuario.cedula==comparar ? false: true}
                    ></input></td>
                <td>{usuario.rol}</td>
                <td><input 
                      type="text"
                      className="form-control"
                      aria-describedby="basic-addon1"
                      onChange={nombreChangelabel}
                      maxLength="100"
                     defaultValue={usuario.nombre}
                     disabled={usuario.cedula==comparar ? false: true}
                    ></input></td>
                <td><input 
                      type="text"
                      className="form-control"
                      aria-describedby="basic-addon1"
                      onChange={apellidoChangelabel}
                      maxLength="100"
                     defaultValue={usuario.apellido}
                     disabled={usuario.cedula==comparar ? false: true}
                    ></input></td>
                <td>
               
                  {renderedictar(
                    usuario.id,
                    usuario.cedula,
                    usuario.contrasena,
                    usuario.nombre,
                    usuario.apellido
                  )}
                </td>
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
        {rendernavegacion()}
      </div>
     
      <br></br>
     
      <br></br>
      <div className="card " style={{ width: "50%", height: "100%" }}>
      <div className="d-flex align-content-start flex-wrap">
      <div >
                      <label
                        htmlFor="inputPassword"
                        className="col-sm-10 col-form-label"
                      >
                        Día
                      </label>
                      <div className="col-sm-10">
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          onChange={diaChange}
                        >
                       <option value="01">1</option>
                        <option value="02">2</option>
                        <option value="03">3</option>
                        <option value="04">4</option>
                        <option value="05">5</option>
                        <option value="06">6</option>
                        <option value="07">7</option>
                        <option value="08">8</option>
                        <option value="09">9</option>
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
                        <option value="31">31</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="inputPassword"
                        className="col-sm-10 col-form-label"
                      >
                       Mes
                      </label>
                      <div className="col-sm-10">
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          onChange={mesChange}
                        >
                         <option value="01">1</option>
                        <option value="02">2</option>
                        <option value="03">3</option>
                        <option value="04">4</option>
                        <option value="05">5</option>
                        <option value="06">6</option>
                        <option value="07">7</option>
                        <option value="08">8</option>
                        <option value="09">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                       
                         
                        </select>
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="inputPassword"
                        className="col-sm-10 col-form-label"
                      >
                        Año
                      </label>
                      <div className="col-sm-50">
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          onChange={diaChange}
                        >
                          <option value="2022">2022</option>
                          <option value="2023">2023</option>
                          <option value="2024">2024</option>
                          <option value="2025">2025</option>
                          <option value="2026">2026</option>
                          <option value="2027">2027</option>
                          <option value="2028">2028</option>
                          <option value="2029">2029</option>
                          <option value="2030">2030</option>
                          
                         
                        </select>
                      </div>
                    </div>
      <div className="col-5">
                      <button
                        className="btn btn-outline-success  "
                        onClick={fechasexcel}
                      >
                        Descargar excel por fecha
                      </button>
      </div>
      </div>
      </div>
      <br></br>
      <div className="col-5">
                      <button
                        className="btn btn-outline-success  "
                        onClick={borrarexcel}
                      >
                        Borrar base de datos
                      </button>
      </div>
    
     
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
      <Modal
        isOpen={modalIsOpen2}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        shouldCloseOnOverlayClick={false}
      >
        <h1>¿Seguro que quieres borrar la base de datos?</h1>
       
        <p>Se borrara permanentemente la base de datos y excel</p>

        <button
          className="btn btn-outline-success my-2 my-sm-0 "
          onClick={() => closeModal2()}
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
