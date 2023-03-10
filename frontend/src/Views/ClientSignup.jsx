import axios from "axios";
import React, { useState } from "react";

const ClientSignup = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const changeName = (e) => {
    setName(e.target.value);
  };
  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const headers = {
      "content-type": "application/x-www-form-urlencoded",
    };

    console.log(name, password);
    const url = "http://localhost:8080/client/sign-up";
    await axios
      .post(url, { name: name, password: password }, { headers })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div>
      hi
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">User Name</label>
        <input
          key="1"
          className="border-2 border-black rounded-md px-1"
          type="text"
          name="name"
          onChange={changeName}
        />

        <label htmlFor="password">Password</label>
        <input
          key="2"
          className="border-2 border-black rounded-md px-1"
          type="password"
          name="password"
          onChange={changePassword}
        />

        <input type="submit" value="Submit" />
      </form>
      <div>
        <p>{name}</p>
        <p>{password}</p>
      </div>
    </div>
  );
};

export default ClientSignup;
