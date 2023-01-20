import { useState, useEffect } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const Toast=(props)=> {

    //LOGRE DARLE USO Y ENTENDERLO WIII
    useEffect(() => {
        
       if(props.mensaje!=""){
        if(props.succes==true){
            toast.success(props.mensaje, {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
             
        }
        if(props.succes==false){
         
                toast.error(props.mensaje, {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
               
        }
        
            
            }
      }, [props]);
    const toasts = async (text,succes,error) => {
     
        if(succes){
            toast.success("🦄 Wow so easy!", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
        }
        if(error){
            toast.error("🦄 Wow so easy!", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
        }
       
      };
  return (

    <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

  );
}

export default Toast;