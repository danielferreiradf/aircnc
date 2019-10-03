import React, { useState } from "react";
import axios from "axios";

export default function Login({ history }) {
  const [email, setEmail] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    if (email) {
      const response = await axios.post("/sessions", {
        email
      });

      const { _id } = response.data;

      localStorage.setItem("user", _id);

      history.push("/dashboard");
    } else {
      alert("Informe um E-mail válido!");
    }
  }
  return (
    <>
      <p>
        Ofereça <strong>spots</strong> para programadores e encontre
        <strong>talentos</strong>
        para sua empresa.
      </p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">E-MAIL *</label>
        <input
          type="email"
          id="email"
          placeholder="Seu Email"
          value={email}
          onChange={event => setEmail(event.target.value)}
        />
        <button type="submit" className="btn">
          Entrar
        </button>
      </form>
    </>
  );
}
