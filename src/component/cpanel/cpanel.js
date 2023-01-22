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
  var [recorrido, setrecorrido] = useState([]);
  var [mostrarnombre, setmostrarnombre] = useState('2');
  var [navegacion, setnavegacion] = useState([]);
  var [dato, setdato] = useState();
  var [dia, setdia] = useState('01');
  var [mes, setmes] = useState('01');
  var [año, setaño] = useState('2022');
  
  var [cedula, setcedula] = useState();
  var [contrasena, setcontrasena] = useState();
  var [rol, setrol] = useState("ADMINISTRADOR");
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

  

  var [textoboton, settextoboton] = useState("Editar");
  var [comparar, setcomparardisabled] = useState();
  var [idd , setidd] = useState(0);
  Modal.setAppElement("body");
  useEffect(() => {
    const token = localStorage.getItem("user");
    axios.defaults.headers.common["x-access-token"] =
      localStorage.getItem("user");
    mostrausuarios();
    mostrarecorridos(0);
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
        localStorage.removeItem("user");
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
        localStorage.removeItem("user");
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
          localStorage.removeItem("user");
          window.location.href = "/";
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
  const mostrarecorridos = async (id) => {
    console.log("recorridos")
    console.log(id)
   var params={
      id
    }
    var recorrido = await axios 
    .post(enviroments.backendUrl + "/api/mostrarrecorrido",params)
    .catch((error) => {
      console.log("error pls");
      localStorage.removeItem("user");
      window.location.href = "/";
    });
    console.log("recorrido.data.recorrido")
    console.log(recorrido.data)
    setrecorrido((recorrido = recorrido.data));
  }
  const mostrausuarios = async (e) => {
    const usuarios = await axios
      .get(enviroments.backendUrl + "/api/mostrarusuarios")
      .catch((error) => {
        console.log("error pls");
        localStorage.removeItem("user");
        window.location.href = "/";
      });
      console.log("usuarios.data.usuario");
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
    if(dato==""){
      console.log("entro a dato")
      mostrausuarios();
    }
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
  const [formulario,setformulario ] =useState({
    cedula:null,
    contrasena:null,
    nombre:null,
    apellido:null,
    telefono:null,
    correo:null,
    eps:null,
    caja_de_compensacion:null,
    recorrido:null,
    validar:null
   
  })
  const [formulariorecorrido,setformulariorecorrido ] =useState({
    ruta1:null,
    ruta2:null,
    ruta3:null,
    ruta4:null,
    ruta5:null,
    institucion1:null,
    institucion2:null,
    matricula1:null,
    matricula2:null,
    matricula3:null
      
  })
  const changeform=(e)=>{
    e.preventDefault();
    console.log(e.target.name, e.target.value);

    //...tareas es para decirle que copie todo como esta y despues actualize solo el input que tecleamos
    setformulario({...formulario,[e.target.name]:e.target.value})
    setmensaje((mensaje = { mensaje: "" }));
    setsucces((succes = { succes: "" }));
  }
  const changeformrecorrido=(e)=>{
   
    console.log(e.target.name, e.target.value);

    //...tareas es para decirle que copie todo como esta y despues actualize solo el input que tecleamos
    setformulariorecorrido({...formulariorecorrido,[e.target.name]:e.target.value})
    setmensaje((mensaje = { mensaje: "" }));
    setsucces((succes = { succes: "" }));
  }
 
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
  const Vermas = async (id,nombre) => { 
      //importante pare refrescar recorridos
      mostrarecorridos(0);

    var params={
      id
    }
    await axios
      .post(enviroments.backendUrl + "/api/agregarrecorrido",params)
      .catch((error) => {
        console.log("error pls");
        localStorage.removeItem("user");
        window.location.href = "/";
      });
      mostrarecorridos(id);
    setmostrarnombre(nombre);
   
    console.log(id);
  }
  const Validar = async (id) => {
  console.log("id");
  console.log(id);
  const params={
    id
  }
  await axios.post(enviroments.backendUrl + "/api/validar", params, {
    withCredentials: true,
  })
  .catch((error) => {
    console.log("error pls");
    localStorage.removeItem("user");
    window.location.href = "/";
  });
  mostrausuarios();
  }
  const Guardar= async (id, ruta1,ruta2,ruta3,ruta4,ruta5,institucion1,institucion2,matricula1,matricula2,matricula3)=>{
    console.log("enviar")
    
    const params={
      ruta1:formulariorecorrido.ruta1==null?ruta1:formulariorecorrido.ruta1,
      ruta2:formulariorecorrido.ruta2==null?ruta2:formulariorecorrido.ruta2,
      ruta3:formulariorecorrido.ruta3==null?ruta3:formulariorecorrido.ruta3,
      ruta4:formulariorecorrido.ruta4==null?ruta4:formulariorecorrido.ruta4,
      ruta5:formulariorecorrido.ruta5==null?ruta5:formulariorecorrido.ruta5,
      institucion1:formulariorecorrido.institucion1==null?institucion1:formulariorecorrido.institucion1,
      institucion2:formulariorecorrido.institucion2==null?institucion2:formulariorecorrido.institucion2,
      matricula1:formulariorecorrido.matricula1==null?matricula1:formulariorecorrido.matricula1,
      matricula2:formulariorecorrido.matricula2==null?matricula2:formulariorecorrido.matricula2,
      matricula3:formulariorecorrido.matricula3==null?matricula3:formulariorecorrido.matricula3,
   
     
      id
    }
    console.log(id)
    
        await axios.post(enviroments.backendUrl + "/api/updaterecorrido", params, {
         withCredentials: true,
       })
       .catch((error) => {
         console.log("error pls");
         localStorage.removeItem("user");
         window.location.href = "/";
       });
  }
  const Editar = async (id,cedu,contrasena, nombre, apellido,telefono,correo,eps,caja_de_compensacion,cargo) => {
 console.log("Editar")
  if(textoboton=="Editar"){
    //aqui preparar todo para despues guardar
    settextoboton((textoboton="Guardar"));
    setcomparardisabled((comparar=cedu));
    setidd((idd=id));
    
    ///Editarusuario
    //reiniciar
    /*
    setcedulalabel((cedulalabel=null));
    setnombrelabel((nombrelabel=null));
    setapellidolabel((apellidolabel=null));
    setcontrasenalabel((contrasenalabel=null));*/
    setformulario({...formulario,[cedula]:null})
    setformulario({...formulario,[contrasena]:null})
    setformulario({...formulario,[nombre]:null})
    setformulario({...formulario,[apellido]:null})
    setformulario({...formulario,[telefono]:null})
    setformulario({...formulario,[correo]:null})
    setformulario({...formulario,[eps]:null})
    setformulario({...formulario,[caja_de_compensacion]:null})
    setformulario({...formulario,[cargo]:null})

 
  }else{
    setformulario({...formulario,[cedula]:cedu})
    setformulario({...formulario,[contrasena]:contrasena})
    setformulario({...formulario,[nombre]:nombre})
    setformulario({...formulario,[apellido]:apellido})
    setformulario({...formulario,[telefono]:telefono})
    setformulario({...formulario,[correo]:correo})
    setformulario({...formulario,[eps]:eps})
    setformulario({...formulario,[caja_de_compensacion]:caja_de_compensacion})
    setformulario({...formulario,[cargo]:cargo})

    /*
    if(cedulalabel==null){
      setcedulalabel((cedulalabel=cedu));
    }*/
   
    if(formulario.cedula==null){
        formulario.cedula=cedu;
    }
    if(formulario.contrasena==null){
      formulario.contrasena=contrasena;
    }
   if(formulario.nombre==null){
    formulario.nombre=nombre;
   }
   if(formulario.apellido==null){
    formulario.apellido=apellido;
   }
   if(formulario.telefono==null){
    formulario.telefono=telefono;
   }
   if(formulario.correo==null){
    formulario.correo=correo;
   }
   if(formulario.eps==null){
    formulario.eps=eps;
   }
   if(formulario.caja_de_compensacion==null){
    formulario.caja_de_compensacion=caja_de_compensacion;
   }
   if(formulario.cargo==null){
    formulario.cargo=cargo;
   }
  
    //aqui axios para base de datos
    settextoboton((textoboton="Editar"));
    setcomparardisabled((comparar=""));
    setidd((idd=0));
    const params={
      cedulalabel:formulario.cedula,
      contrasenalabel:formulario.contrasena,
      nombrelabel:formulario.nombre,
      apellidolabel:formulario.apellido,

      telefono:formulario.telefono,
      correo:formulario.correo,
      eps:formulario.eps,
      caja_de_compensacion:formulario.caja_de_compensacion,
      cargo:formulario.cargo,
   
   
     
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
  function renderEditar(id, cedula, contrasena, nombre, apellido,telefono,correo,eps,caja_de_compensacion,cargo,validar) {
    return (
      <>
        <button
          style={{ width: "100%", height: "100%" }}
          type="button"
          className="btn btn-warning"
          onClick={() => Editar(id,cedula, contrasena,nombre, apellido,telefono,correo,eps,caja_de_compensacion,cargo,validar)}
          disabled= {id==idd ||idd==0? false: true}
          
        >
          {cedula==comparar ? "Guardar": "Editar"}
       
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
    function rendervermas() {
  console.log("recorrido en ver mas")
  console.log(recorrido)
  
   
      return (
        <>
      <table class="table">
  <thead>
    <tr>
      <th scope="col">Nombre</th>
      <th scope="col">Matricula #1</th>
      <th scope="col">Matricula #2</th>
      <th scope="col">Matricula #3</th>
      <th scope="col">Institucion Educativa #1</th>
      <th scope="col">Institucion Educativa #2</th>     
      <th scope="col">Recorrido #1</th>
      <th scope="col">Recorrido #2</th>
      <th scope="col">Recorrido #3</th>
      <th scope="col">Recorrido #4</th>
      <th scope="col">Recorrido #5</th>
      <th scope="col">Guardar</th>
    </tr>
  </thead>

  <tbody>
            {recorrido.map((recorrido) => (
              <tr key={"1"} >
                
                <td>{mostrarnombre} </td>
                <td><input 
                      type="text"
                      className="form-control"
                      aria-describedby="basic-addon1"
                      onChange={changeformrecorrido}
                      checked={recorrido.matricula1}
                      name="matricula1"
                      maxLength="100"
                       Value={recorrido.matricula1} 
                    
                    
                    ></input> </td>
                    <td><input 
                      type="text"
                      className="form-control"
                      aria-describedby="basic-addon1"
                      onChange={changeformrecorrido}
                      
                      name="matricula2"
                      maxLength="100"
                     Value={recorrido.matricula2} 
                   
                    ></input></td>
                    <td><input 
                      type="text"
                      className="form-control"
                      aria-describedby="basic-addon1"
                      onChange={changeformrecorrido}
                      name="matricula3"
                      maxLength="100"
                    Value={recorrido.matricula3} 
                   
                    ></input></td>
                       <td><input 
                      type="text"
                      className="form-control"
                      aria-describedby="basic-addon1"
                      onChange={changeformrecorrido}
                      name="institucion1"
                      maxLength="100"
                     Value={recorrido.institucion1} 
                   
                    ></input></td>
                       <td><input 
                      type="text"
                      className="form-control"
                      aria-describedby="basic-addon1"
                      onChange={changeformrecorrido}
                      name="institucion2"
                      maxLength="100"
                    Value={recorrido.institucion2} 
                   
                    ></input></td>
                        <td><input 
                      type="text"
                      className="form-control"
                      aria-describedby="basic-addon1"
                      onChange={changeformrecorrido}
                      name="ruta1"
                      maxLength="100"
                    Value={recorrido.ruta1} 
                   
                    ></input></td>
                        <td><input 
                      type="text"
                      className="form-control"
                      aria-describedby="basic-addon1"
                      onChange={changeformrecorrido}
                      name="ruta2"
                      maxLength="100"
                    Value={recorrido.ruta2} 
                   
                    ></input></td>
                        <td><input 
                      type="text"
                      className="form-control"
                      aria-describedby="basic-addon1"
                      onChange={changeformrecorrido}
                      name="ruta3"
                      maxLength="100"
                   Value={recorrido.ruta3} 
                   
                    ></input></td>
                        <td><input 
                      type="text"
                      className="form-control"
                      aria-describedby="basic-addon1"
                      onChange={changeformrecorrido}
                      name="ruta4"
                      maxLength="100"
                     Value={recorrido.ruta4} 
                   
                    ></input></td>
                        <td><input 
                      type="text"
                      className="form-control"
                      aria-describedby="basic-addon1"
                      onChange={changeformrecorrido}
                      name="ruta5"
                      maxLength="100"
                     Value={recorrido.ruta5} 
                   
                    ></input></td>
                    <td>
                    <button
          style={{ width: "100%", height: "100%" }}
          type="button"
          className="btn btn-primary"
          onClick={() => Guardar(recorrido.id_usuario, recorrido.ruta1,recorrido.ruta2,recorrido.ruta3,recorrido.ruta4,recorrido.ruta5,recorrido.institucion1,recorrido.institucion2,recorrido.matricula1,recorrido.matricula2,recorrido.matricula3)}
     
          
        >Guardar
   
       
        </button>
        </td>
               
               
         
               
                
                </tr>))
              
                }
  
  </tbody>
</table>
       
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
     
      <div className="overflow-auto">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Cedula</th>
              <th scope="col">Contraseña</th>
              <th scope="col">Tipo</th>
              <th scope="col">Nombre</th>
              <th scope="col">Apellido</th>
              <th scope="col">Telefono</th>
              <th scope="col">Correo</th>
              <th scope="col">Eps</th>
              <th scope="col">Caja de Compensacion</th>
              <th scope="col">Cargo</th>
              <th scope="col">Recorrido</th>
              <th scope="col">Validar</th>
              <th scope="col">Editar</th>
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
                      onChange={changeform}
                      name="cedula"
                      maxLength="20"
                     defaultValue={usuario.cedula}
                     disabled={usuario.cedula==comparar ? false: true}
                    ></input></td>
                <td><input 
                      type="text"
                      className="form-control"
                      aria-describedby="basic-addon1"
                      onChange={changeform}
                      name="contrasena"
                      maxLength="100"
                     defaultValue={""}
                     disabled={usuario.cedula==comparar ? false: true}
                    ></input></td>
                <td>{usuario.rol}</td>
                <td><input 
                      type="text"
                      className="form-control"
                      aria-describedby="basic-addon1"
                      onChange={changeform}
                      name="nombre"
                      maxLength="100"
                     defaultValue={usuario.nombre}
                     disabled={usuario.cedula==comparar ? false: true}
                    ></input></td>
                <td><input 
                      type="text"
                      className="form-control"
                      aria-describedby="basic-addon1"
                      onChange={changeform}
                      name="apellido"
                      maxLength="100"
                     defaultValue={usuario.apellido}
                     disabled={usuario.cedula==comparar ? false: true}
                    ></input></td>
                     {/*desde aqui empieza mi dolor de cabeza */}
                       <td><input 
                      type="text"
                      className="form-control"
                      aria-describedby="basic-addon1"
                      onChange={changeform}
                      name="telefono"
                      maxLength="100"
                     defaultValue={usuario.telefono}
                     disabled={usuario.cedula==comparar ? false: true}
                    ></input>
                    </td>
                       <td><input 
                      type="text"
                      className="form-control"
                      aria-describedby="basic-addon1"
                      onChange={changeform}
                      maxLength="100"
                      name="correo"
                     defaultValue={usuario.correo}
                     disabled={usuario.cedula==comparar ? false: true}
                    ></input></td>
                      <td><input 
                      type="text"
                      className="form-control"
                      aria-describedby="basic-addon1"
                      onChange={changeform}
                      name="eps"
                      maxLength="100"
                     defaultValue={usuario.eps}
                     disabled={usuario.cedula==comparar ? false: true}
                    ></input></td>
                      <td><input 
                      type="text"
                      className="form-control"
                      aria-describedby="basic-addon1"
                      onChange={changeform}
                      name="caja_de_compensacion"
                      maxLength="100"
                     defaultValue={usuario.caja_de_compensacion}
                     disabled={usuario.cedula==comparar ? false: true}
                    ></input></td>
                      <td><input 
                      type="text"
                      className="form-control"
                      aria-describedby="basic-addon1"
                      onChange={changeform}
                      maxLength="100"
                      name="cargo"
                     defaultValue={usuario.cargo}
                     disabled={usuario.cedula==comparar ? false: true}
                    ></input></td>
                   
                    
                     <td>   <button
          style={{ width: "100%", height: "36px" }}
          type="button"
         
          className= {usuario.validacion==0 ? "btn btn-danger": "btn btn-success"}
          onClick={() => Vermas(usuario.id,usuario.nombre)}
        
          
        >{"Ver mas"}
          
       
        </button></td>
                    <td>
                    <button
          style={{ width: "100%", height: "36px" }}
          type="button"
         
          className= {usuario.validacion==0 ? "btn btn-danger": "btn btn-success"}
          onClick={() => Validar(usuario.id)}
        
          
        >{usuario.validacion==0 ? "No": "Si"}
          
       
        </button>
                    </td>
                    
                 <td>
                 
               
                  {renderEditar(
                    usuario.id,
                    usuario.cedula,
                    usuario.contrasena,
                    usuario.nombre,
                    usuario.apellido,
                    usuario.telefono,
                    usuario.correo,
                    usuario.eps,
                    usuario.caja_de_compensacion,
                    usuario.cargo,
                    usuario.placa,
                    usuario.institucion_educativa,
                    usuario.recorrido,
                    usuario.validar
                  )}
                </td>
                <td>
                  {rendereliminar(
                    usuario.rol,
                    usuario.cedula,
                    usuario.nombre,
                    usuario.apellido,
                    usuario.telefono,
                    usuario.correo,
                    usuario.eps,
                    usuario.caja_de_compensacion,
                    usuario.cargo,
                    usuario.placa,
                    usuario.institucion_educativa,
                    usuario.recorrido,
                    usuario.validar
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        {rendernavegacion()}
        <br></br>
     
     <br></br> 
        {rendervermas()}
     
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
                      <div className="col-sm-50">
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
                      <div className="col-sm-50">
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
