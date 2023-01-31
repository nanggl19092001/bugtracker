import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { SERVER_DOMAIN } from '../utils/Constaint'
function Home() {
  const token = localStorage.getItem("token");
  const user = jwt_decode(token)
  useEffect(() => {
    function fetchData() {
      fetch(`${SERVER_DOMAIN}/user/project?token=` + token, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => console.log(data))
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
