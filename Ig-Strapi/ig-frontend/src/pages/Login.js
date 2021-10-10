import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_URL } from "../utils/api_url";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";

function Login({ history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { user, setUser } = useContext(UserContext);
  console.log(user);

  useEffect(() => {
    if (user) {
      history.push("/");
    }
  }, [user, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${API_URL}/auth/local`,
        {
          identifier: email,
          password,
        },
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      setUser(data);
    } catch (e) {
      setError(e.response.data.message[0].messages[0].message);
    }
  };
  return (
    <div>
      <h2>Login</h2>
      <form action="" onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError("");
          }}
        />
        <button>Login In</button>
      </form>
      {error && <h4>{error}</h4>}
    </div>
  );
}

export default Login;
