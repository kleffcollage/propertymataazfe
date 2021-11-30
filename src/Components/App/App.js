import { useEffect, useState } from "react";
import ROUTES, { RenderRoutes } from "../../Routes";
import { MainContext } from "../../Context/MainContext";
import Template from "../Generics/Template";
import Fetch from "../../Utilities/Fetch";
import DateAdapter from '@mui/lab/AdapterMoment';
import "./App.css";
import { ToastContainer } from "react-toastify";
import LocalizationProvider from '@mui/lab/LocalizationProvider';

function App() {
  const sampledata = {
    user: {},
    alert: {},
    applicationTypes: [],
  };
  const [data, setContextData] = useState(sampledata);

  const setUser = (user) => {
    setContextData({ ...data, user: user });
  };

  const setApplication = (types) => {
    setContextData({ ...data, applicationTypes: types });
  };

  const getApplicationTypes = async () => {
    try {
      let { data } = await Fetch("Application/types");
      //   data = await data.json();
      setApplication(data);
    } catch (error) {
      console.error(error);
    }
  };

  const showAlert = (type, message, title) => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    let alert = {
      type: type,
      message: message,
      title: title,
      show: true,
    };

    setContextData({ ...data, alert: alert });
    setTimeout(() => {
      setContextData({ ...data, alert: {} });
    }, 5000);
  };

  useEffect(() => {
    // const fetchData = async () => {
    //   await getApplicationTypes();
    // };
    // fetchData();
    let user = localStorage.getItem("user");
    setUser(JSON.parse(user));
    // console.log(JSON.parse(user));
  }, []);

  return (
    <>
    <LocalizationProvider dateAdapter={DateAdapter}>
      <MainContext.Provider
        value={{ data, setUser, setApplication, showAlert }}
      >
        <ToastContainer />
        <Template>
          <RenderRoutes routes={ROUTES} />
        </Template>
      </MainContext.Provider>
      </LocalizationProvider>
    </>
  );
}

export default App;
