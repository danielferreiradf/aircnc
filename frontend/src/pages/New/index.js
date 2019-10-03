import React, { useState, useMemo } from "react";
import axios from "axios";

import camera from "../../assets/camera.svg";

import "./styles.css";

export default function New({ history }) {
  const [thumbnail, setThumbnail] = useState(null);
  const [company, setCompany] = useState("");
  const [techs, setTechs] = useState("");
  const [price, setPrice] = useState("");

  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null;
  }, [thumbnail]);

  async function handleSubmit(event) {
    event.preventDefault();

    const data = new FormData();
    const user_id = localStorage.getItem("user");

    data.append("thumbnail", thumbnail);
    data.append("company", company);
    data.append("techs", techs);
    data.append("price", price);

    await axios.post("/spots", data, {
      headers: { user_id }
    });

    history.push("/dashboard");
  }

  return (
    <form onSubmit={handleSubmit}>
      <label
        id="thumbnail"
        style={{
          backgroundImage: `url(${preview})`
          // backgroundSize: "cover"
        }}
        className={thumbnail ? "has-thumbnail" : ""}
      >
        <input
          type="file"
          onChange={event => setThumbnail(event.target.files[0])}
        />
        <img src={camera} alt="Select Img" />
      </label>

      <label htmlFor="company">EMPRESA *</label>
      <input
        type="text"
        placeholder="Sua empresa"
        id="company"
        value={company}
        onChange={event => setCompany(event.target.value)}
      />

      <label htmlFor="techs">
        TECNOLOGIAS * <span>(separadas por vírgula)</span>
      </label>
      <input
        type="text"
        placeholder="Quais tecnologias usam?"
        id="techs"
        value={techs}
        onChange={event => setTechs(event.target.value)}
      />

      <label htmlFor="techs">
        VALOR DA DIÁRIA * <span>(em branco para GRATUITO)</span>
      </label>
      <input
        type="text"
        placeholder="Qual o preço da diária?"
        id="price"
        value={price}
        onChange={event => setPrice(event.target.value)}
      />
      <button type="submit" class="btn">
        Cadastrar
      </button>
    </form>
  );
}
