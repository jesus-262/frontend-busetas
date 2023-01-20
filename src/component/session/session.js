import { useState, useEffect } from "react";
import axios from "axios";
import Toast from "../toast/toast";
//import { Redirect, Route } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { enviroments } from '../../env';
import { Link } from 'react-router-dom';
function Session(props) {
  var navigate = useNavigate();

  var [contrasena, setcontrasena] = useState();
  var [cedula, setcedula] = useState();
  var [mensaje, setmensaje] = useState();
  var [succes, setsucces] = useState("");

  /*
  useEffect(() => {
    console.log("cambio cedula");
  }, [cedula]);
  */
  const cedulaChange = async (e) => {
    setcedula((cedula = { cedula: e.target.value }));
    console.log(cedula);
    setmensaje((mensaje = { mensaje: "" }));
    setsucces((succes = { succes: "" }));
  };
  const contrasenaChange = async (e) => {
    setcontrasena((contrasena = { contrasena: e.target.value }));
    console.log(contrasena);
    setmensaje((mensaje = { mensaje: "" }));
    setsucces((succes = { succes: "" }));
  };
  //component: () => <Navigate to="/404" />

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
  const onSubmit = async (e) => {
    // toasts("miremos",true,false);

    e.preventDefault();
    //setformulario((formulario = { contrasena: e.target.value }));

    console.log("enviar");
    const params = {
      cedula: cedula.cedula,
      contrasena: contrasena.contrasena,
    };
    const config = {
      headers:{
        "x-access-token": 'value1',
       
      }
    };
    const user = await axios.post(
      enviroments.backendUrl + "/api/iniciarsession",
      params,
      {
        withCredentials: true,
      }
    );

    if (user.data.messaje) {
      setmensaje((mensaje = { mensaje: user.data.messaje }));
      setsucces((succes = { succes: false }));
    }
    if (user.data.token) {
      setmensaje((mensaje = { mensaje: "Inicio session con exito" }));
      setsucces((succes = { succes: true }));

      localStorage.setItem("user", JSON.stringify(user.data.token));
      autenticacion();
      roles();
      console.log(autenticacion());
      console.log(await roles());
     // axios.defaults.headers.post['Authorization'] = `Bearer ${localStorage.getItem('user')}`;
      if ((await roles()) == "ADMINISTRADOR") {
        console.log("entro a roles: ADMINISTRADOR");
        navigate("/admin");
        window.location.href = "/admin";
      }
      if ((await roles()) == "PERSONA NATURAL") {
        console.log("entro a roles: PERSONA NATURAL");
        navigate("/formulario");
        window.location.href = "/formulario";
      }

      // navigate('/admin');
    }
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
                  <h1 className="titulo-Bienvenido">Bienvenido</h1>
                </div>
                {/* <img src="/img/logo.png" alt="Logo" className="card-img-top mx-auto m-2 rounded-circle w-50"></img> */}

                <div className="card-body ">
                  <form className="form-horizontal" onSubmit={onSubmit}>
                    <div className="col-xs-12 caja">
                      <div className="form-group">
                        <input
                          type="Number"
                          onChange={cedulaChange}
                          className="form-control input-lg"
                          placeholder="Cedula"
                          maxLength="20"
                        ></input>
                      </div>
                    </div>
                    <div className="col-xs-12 caja">
                      <div className="form-group">
                        <input
                          type="password"
                          onChange={contrasenaChange}
                          className="form-control input-lg"
                          placeholder="contrasena"
                          maxLength="20"
                        ></input>
                      </div>
                     
                    </div>
                   
                    <button type="submit" className="btn btn-success btn-block">
                      Iniciar
                    </button>
                    <div className="col-xs-12 caja"></div>
                    <div className="col-xs-12 caja">
                    <Link to='/registro'  className="btn btn-sm btn btn-outline-success " >Crear una cuenta</Link>
              
             
              </div>
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

export default Session;
