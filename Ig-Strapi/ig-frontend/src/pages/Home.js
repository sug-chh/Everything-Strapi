import React from "react";
import { useEffect, useState } from "react";
import { Post } from "../components/Post";
import axios from "axios";
import { API_URL } from "../utils/api_url";
import { Link } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const getPosts = async () => {
      const { data } = await axios.get(`${API_URL}/posts`);
      setPosts(data);
    };
    getPosts();
  }, []);
  return (
    <div className="App">
      {posts.map((post) => (
        <Link key={post.id} to={`/${post.id}`}>
          <Post post={post} />
        </Link>
      ))}
    </div>
  );
}

export default Home;
