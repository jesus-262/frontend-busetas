import { useState, useEffect } from "react";
function Header() {
  function Salir(e) {
    e.preventDefault();
    localStorage.removeItem("user");
    window.location.href = "/";
  }
  return (
    <div className="App">
      <nav className="navbar navbar-light bg-light justify-content-between">
        <a className="navbar-brand">BuseTaap</a>
        <form className="form-inline">
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            onClick={Salir}
          >
            Salir
          </button>
        </form>
      </nav>
    </div>
  );
}

export default Header;
