import React, {useEffect, useContext } from "react";
import jwt_decode from "jwt-decode";
import { AppContext } from "../Context/AppContext";
function Home() {
  const {token} = useContext(AppContext);
  const user = jwt_decode(token);
  useEffect(() => {
    function fetchData() {
      fetch("http://localhost:5000/user/project?token=" + token, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => data)
        .catch((error) => console.error("Error:", error))
    }
    fetchData();
  }, [token]);
  return (
    <div>
      <h1>Home</h1>
      <h2>Hello {user.firstname +' '+ user.lastname}</h2>
      <a href="/logout" className="text-base text-blue-700">
        Logout
      </a>
    </div>
  );
}

export default Home;
