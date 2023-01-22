import { useState, useEffect } from "react";
import axios from "axios";
import Toast from "../toast/toast";
//import { Redirect, Route } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { enviroments } from '../../env';
import { Link } from 'react-router-dom';
function Registro(props) {
  var navigate = useNavigate();
  var [mensaje, setmensaje] = useState();
  var [succes, setsucces] = useState("");
  const onSubmit = async (e) => {
    // toasts("miremos",true,false);

    e.preventDefault();
    //setformulario((formulario = { contrasena: e.target.value }));

    console.log("enviar");

    if(registro.cedula==''){
    
      setmensaje((mensaje = { mensaje: "Dijite una cedula" }));
      setsucces((succes = { succes: false }));
    }else if(registro.nombre==''){
     
      setmensaje((mensaje = { mensaje: "Dijite un nombre" }));
      setsucces((succes = { succes: false }));
    }else if(registro.apelido==''){
      setmensaje((mensaje = { mensaje: "Dijite un apellido" }));
      setsucces((succes = { succes: false }));
    }else if(registro.telefono==''){
      setmensaje((mensaje = { mensaje: "Dijite un telefono" }));
      setsucces((succes = { succes: false }));
    }else if(registro.correo==''){
      setmensaje((mensaje = { mensaje: "Dijite un correo" }));
      setsucces((succes = { succes: false }));
    }else{

      const texto=await axios.post(enviroments.backendUrl + "/api/registro", registro, {
        withCredentials: true,
      })
      
      
      console.log(texto.data);
      setmensaje((mensaje = { mensaje: texto.data }));
      setsucces((succes = { succes: true }));
    }

    /*
    await axios.post(enviroments.backendUrl + "/api/registro", params, {
      withCredentials: true,
    })
    .catch((error) => {
      console.log("error pls");
      localStorage.removeItem("user");
      window.location.href = "/";
    });*/

  }
  const [registro,setregistro ] =useState({
    cedula:'',
    nombre:'',
    apellido:'',
    telefono:'',
    correo:'',
    eps:'',
    caja_de_compensacion:'',
    cargo:'MONITOR',
  })
  const changeform=(e)=>{
    console.log(e.target.name, e.target.value);

    //...tareas es para decirle que copie todo como esta y despues actualize solo el input que tecleamos
    setregistro({...registro,[e.target.name]:e.target.value})
    setmensaje((mensaje = { mensaje: "" }));
    setsucces((succes = { succes: "" }));
  }
  const autenticacion = () => {
    const token = JSON.parse(localStorage.getItem("user"));
    var validar;
    if (token) {
      console.log("hay token");
      validar = true;
    } else {
      console.log("no hay token");
      validar = false;
    }

    //lol =true;
    //console.log(JSON.parse(localStorage.getItem('user')).tipo)
    return validar;
  };
  const token = () => {
    const token = JSON.parse(localStorage.getItem("user"));

    return token;
  };
  const roles = async () => {
    const token = JSON.parse(localStorage.getItem("user"));
    const params = {
      token: token,
    };
    const userrol = await axios.post(
      enviroments.backendUrl + "/api/getrol",
      params,
      {
        withCredentials: true,
      }
    );

    return userrol.data;
  };


  return (
    <>
      <div className="login">
        <div className="container">
          <div className="abs-center ">
            <div className="col-md-4 mx-auto  ">
              <div className="padre ">
                <h1 className="titulo-busetap">BuseTaap</h1>
              </div>
              <div className="card text-center iluminarlogin">
                <div className="card-header">
                  <h2 className="titulo-Bienvenido">Registro</h2>
                </div>
                {/* <img src="/img/logo.png" alt="Logo" className="card-img-top mx-auto m-2 rounded-circle w-50"></img> */}

                <div className="card-body ">
                  <form className="form-horizontal" onSubmit={onSubmit}>
                    <div className="col-xs-12 ">
                      <label className="nombre_registro">Cedula *</label>
                      <div className="form-group">
                        <input
                          type="Number"
                          name='cedula'
                          onChange={changeform}
                          className="form-control input-lg"

                          maxLength="20"
                        ></input>
                      </div>
                    </div>
                    <div className="col-xs-12 ">
                      <label className="nombre_registro">Nombre *</label>
                      <div className="form-group">
                        <input
                          type="text"
                          name='nombre'
                          onChange={changeform}
                          className="form-control input-lg"

                          maxLength="20"
                        ></input>
                      </div>
                    </div>
                    <div className="col-xs-12 ">
                      <div className="form-group">
                        <label className="nombre_registro">Apellido *</label>
                        <input
                          type="text"
                          name='apellido'
                          onChange={changeform}
                          className="form-control input-lg"

                          maxLength="20"
                        ></input>
                      </div>
                    </div>

                    <div className="col-xs-12 ">
                      <label className="nombre_registro">Telefono *</label>
                      <div className="form-group">
                        <input
                          type="Number"
                          name='telefono'
                          onChange={changeform}
                          className="form-control input-lg"
                          maxLength="20"
                        ></input>
                      </div>
                    </div>
                    <div className="col-xs-12 ">
                      <label className="nombre_registro">Correo *</label>
                      <div className="form-group">
                        <input
                          type="text"
                          name='correo'
                          onChange={changeform}
                          className="form-control input-lg"
                          maxLength="30"
                        ></input>
                      </div>
                    </div>
                    <div className="col-xs-12 ">
                      <label className="nombre_registro">Eps</label>
                  
                      <select
                        className="form-select"
                        name='eps'
                        aria-label="Default select example"
                        onChange={changeform}
                      >
                        <option value="NO TENGO">NO TENGO</option>
                        <option value="NUEVA EPS">NUEVA EPS</option>
                        <option value="COOSALUD">COOSALUD</option>
                        <option value="EPS SURA">EPS SURA</option>
                        <option value="COMFENALCO VALLE">COMFENALCO VALLE</option>
                        <option value="SALUD TOTAL">SALUD TOTAL</option>
                        <option value="EMSSANAR">EMSSANAR</option>
                        <option value="COMFANDI">COMFANDI</option>
                        <option value="CENTRO MEDICO IMBANACO">CENTRO MEDICO IMBANACO</option>
                        <option value="FUNDACIÓN CLÍNICA VALLE DEL Lili">FUNDACIÓN CLÍNICA VALLE DEL Lili</option>
                        <option value="CLÍNICA DE OCCIDENTE">CLÍNICA DE OCCIDENTE</option>
                        <option value="CLÍNICA NUESTRA">CLÍNICA NUESTRA</option>
                        <option value="CLÍNICA SEBASTIÁN DE BELALCÁZAR">CLÍNICA SEBASTIÁN DE BELALCÁZAR</option>
                        <option value="COSMITET">COSMITET</option>
                        <option value="DIRECCIÓN DE SANIDAD POLICÍA NACIONAL">DIRECCIÓN DE SANIDAD POLICÍA NACIONAL</option>
                        <option value="CLÍNICA VERSALLES">CLÍNICA VERSALLES</option>
                        <option value="HOSPITAL MILITAR CENTRAL">HOSPITAL MILITAR CENTRAL</option>
                        <option value="PROFAMILIA">PROFAMILIA</option>
                        <option value="FUNDACIÓN CLÍNICA INFANTIL CLUD NOEL">FUNDACIÓN CLÍNICA INFANTIL CLUD NOEL</option>
                        <option value="HOSPITAL SAN JUAN DE DIOS">HOSPITAL SAN JUAN DE DIOS</option>
                        <option value="OTRO">OTRO</option>
                       
                        
                      </select>
                    </div>
                    <div className="col-xs-12 ">
                      <label className="nombre_registro">Caja de Compensación</label>
                   
                      
                       
                        <select
                        className="form-select"
                        name='caja_de_compensacion'
                        aria-label="Default select example"
                        onChange={changeform}
                      >
                        <option value="NO TENGO">NO TENGO</option>
                        <option value="COMFENALCO">COMFENALCO</option>
                        <option value="COMFANDI">COMFANDI</option>
                        
                      </select>
                      
                    </div>
                    <div className="col-xs-12 ">
                      <label className="nombre_registro">Cargo</label>
                      <select
                        className="form-select"
                        name='cargo'
                        aria-label="Default select example"
                        onChange={changeform}
                      >
                        <option value="MONITOR">
                          MONITOR
                        </option>
                        <option value="LIDER">LIDER</option>
                      </select>
                    </div>
                    < div className=" caja ">
                    </div>
                    <button type="submit" className="btn btn-success btn-block">
                      Registrarse
                    </button>
                    < div className=" caja ">
                    </div>

                    <Link to='/'  className="btn btn-sm btn btn-outline-success " >¿Ya tienes una cuenta?</Link>
                   


                  </form>


                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toast
       mensaje={mensaje ? mensaje.mensaje : ""}
       succes={succes ? succes.succes : ""}
      />
    </>
  );
}

export default Registro;
