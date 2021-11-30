import React, { useContext, useState } from "react";
import Hero from "./Hero";
import Body from "./Body";
import Footer from "./Footer";
import Nav from "../../Components/Navs/Nav";
import UserNav from "../../Components/Navs/UserNav";
import { MainContext } from "../../Context/MainContext";
import Fetch from "../../Utilities/Fetch";

function Home() {
  const { data } = useContext(MainContext);
  const [search, setSearch] = useState("");
  const [loading,setLoading] = useState(false);
  const [errorMessage,setErrorMessage] = useState("");
  const [properties,setProperties] = useState([]);

  const triggerSearch = async () => {
	let url = `Property/list?search=${search}`
    setLoading(true);
    var data = await Fetch(url);
    // console.log(data);
    if (!data.status) {
      setLoading(false);
      setErrorMessage(data.message);
      return;
    }
    
    setProperties(data.data.value);
    return;
  };

  const clear = () => {
    setSearch("");
    setProperties([])
  };

  return (
    <div>
      {data.user ? <UserNav /> : <Nav />}
      <Hero search={search} setSearch={setSearch} trigger={triggerSearch} properties={properties} clear={clear}/>
      <Body properties={properties}/>
      <Footer />
    </div>
  );
}

export default Home;
