import React, { useContext, useEffect } from "react";
import { MainContext } from "../Context/MainContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Alert(props) {
  const { data } = useContext(MainContext);


  const displayToast = () => {
	  console.log(data.alert.message);
	  toast(data.alert.message);
  }

  useEffect(() => {
	displayToast();
  },[])

  toast(data.message);
  return (
    <>
      {data.alert.show ? (
        <div className={`alert alert-${data.alert.type}`} role="alert">
          <h4 className="alert-heading">{data.alert.title}</h4>
          <p>{data.alert.message}</p>
        </div>
      ) : null}
	  {!data.alert.show ?
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      >
	  {data.alert.message}
      </ToastContainer >
	  : null}
	   {/* <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      >
	  {data.alert.message}
      </ToastContainer > */}
	  <ToastContainer/>
    </>
  );
}

export default Alert;
