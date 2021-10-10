import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { API_URL } from "../utils/api_url";

export const LikesContext = createContext(null);

const LikesContextProvider = ({ children }) => {
  const { user } = useContext(UserContext);
  const [likesGiven, setLikesGiven] = useState([]);
  const [likesReceived, setLikesReceived] = useState([]);

  const reloader = () => {
    if (user) {
      const loadGivenLikes = async () => {
        const { data } = await axios.get(
          `${API_URL}/likes/given?user=${user.user.id}`,
          {
            headers: {
              Authorization: `Bearer ${user.jwt}`,
            },
          }
        );
        setLikesGiven(data);
      };
      loadGivenLikes();

      const loadReceivedLikes = async () => {
        const { data } = await axios.get(
          `${API_URL}/likes/received?post.author=${user.user.id}`,
          {
            headers: {
              Authorization: `Bearer ${user.jwt}`,
            },
          }
        );
        setLikesReceived(data);
      };
      loadReceivedLikes();
    }
  };

  useEffect(() => {
      reloader()
      // eslint-disable-next-line
  }, [user]);

  console.log("likesgiven", likesGiven);
  console.log("likesreceived", likesReceived);

  return (
    <LikesContext.Provider value={{ likesGiven, likesReceived, reloader }}>
      {children}
    </LikesContext.Provider>
  );
};

export default LikesContextProvider;
