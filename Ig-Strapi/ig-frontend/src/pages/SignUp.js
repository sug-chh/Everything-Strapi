import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_URL } from "../utils/api_url";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";

function SignUp({ history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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

    if (password === confirmPassword) {
      try {
        const { data } = await axios.post(
          `${API_URL}/auth/local/register`,
          {
            username: email,
            email,
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
        console.log(e.response.data.message[0].messages[0].message);
        setError(e.response.data.message[0].messages[0].message);
      }
    } else {
      setError("Passwords do not match!");
    }
  };
  return (
    <div>
      <h2>Sign Up</h2>
      <form action="" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError("");
          }}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            setError("");
          }}
        />
        <button>Sign Up</button>
      </form>
      {error && <h4>{error}</h4>}
    </div>
  );
}

export default SignUp;
