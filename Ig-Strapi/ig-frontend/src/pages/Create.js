import React, { useState, useContext } from "react";
import axios from "axios";
import { API_URL } from "../utils/api_url";
import { UserContext } from "../context/UserContext";

function Create({ history }) {
  const [description, setDescription] = useState("");
  const { user } = useContext(UserContext);
  console.log(user.jwt);

  if (!user) {
    console.log("Please login first!");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data } = await axios.post(
      `${API_URL}/posts`,
      {
        description,
      },
      {
        headers: {
          Authorization: `Bearer ${user.jwt}`,
        },
      }
    );
    console.log(data);
    history.push("/");
  };

  return (
    <div className="Create">
      <h2>Create</h2>
      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button>Submit</button>
      </form>
    </div>
  );
}

export default Create;
