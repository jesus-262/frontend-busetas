import "./App.css";
//session
import Login from "./component/session/session";
import Cpanel from "./component/cpanel/cpanel";
import Formulario from "./component/formulario/formulario";
import Header from "./component/header/header";
import axios from "axios";
import { enviroments } from './env';
import { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
function App() {
  var [rol, setrol] = useState();
  useEffect(() => {
    console.log("inicia pagina");
    console.log(autenticacion());
    roles();
  }, []);
  useEffect(() => {
    //console.log("cambio roles");
    console.log("miremos");
    console.log(rol);
  }, [rol]);
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
    setrol((rol = userrol.data));
    return userrol.data;
  };
  return (
    <div className="App">
      {autenticacion() ? (
          <Header/>
        ):(console.log("no header"))}
      <BrowserRouter>
        <Routes>


        
          















          {autenticacion() ? (
            //logeado
            rol == "ADMINISTRADOR" ? (
              <>
              
              <Route path="/admin" element={<Cpanel></Cpanel>}></Route>
              <Route path="/formulario" element={<Navigate to="/admin"></Navigate>}></Route>
              </>
            ) : (
              <Route path="/" element={<Navigate to="/admin"></Navigate>}>
             
                {" "}
              </Route>
            )
          ) : (
            //no logeao
            <>
              <Route
                path="/admin"
                element={<Navigate to="/"></Navigate>}
              ></Route>
              <Route path="/" element={<Login></Login>}></Route>
            </>
          )}
            {autenticacion() ? (
            //logeado
            rol == "PERSONA NATURAL" ? (
              <>
           
              <Route path="/formulario" element={<Formulario></Formulario>}></Route>
              <Route path="/admin" element={<Navigate to="/formulario"></Navigate>}></Route>
              </>
              
            ) : (
              <Route path="/" element={<Navigate to="/formulario"></Navigate>}>
             
                {" "}
              </Route>
            )
          ) : (
            //no logeao
            <>
              <Route
                path="/formulario"
                element={<Navigate to="/"></Navigate>}
              ></Route>
              <Route path="/" element={<Login></Login>}></Route>
            </>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
